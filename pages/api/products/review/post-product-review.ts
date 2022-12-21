import type { NextApiRequest, NextApiResponse } from 'next';
import { cert } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import serviceAccount  from '../../../../firebase-serviceAccount.json'; // 秘密鍵を取得
import admin, { firestore } from 'firebase-admin';
import { PRODUCT_INFO_COLLECTION, REVIEW_COLLLECTION  } from "@firebase/const"
import type { PostReviewInput } from '@shopify/types/review';


export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error('this api is only POST method...')

    try{
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: cert(serviceAccount as any),
            });
        }

        const reviewInfo = await JSON.parse(req.body) as PostReviewInput
        const db = getFirestore();
        const productInfoCollection = db.collection(PRODUCT_INFO_COLLECTION);
        const reviewCollection = db.collection(REVIEW_COLLLECTION)
        const productInfoRef = await db.collection(PRODUCT_INFO_COLLECTION).doc(reviewInfo.productId).get()



        ///商品のレビュードキュメントが存在するか
        if(productInfoRef.exists){

            // 空文字列の場合は、非会員のレビュー
            if(reviewInfo.reviewerCustomerId !== "") {
                //顧客がすでに商品のレビューを書いていた場合
                const reviewerCustomerIdsRef = await productInfoCollection.select("reviewerCustomerIds").get()
                const reviewerCustomerIds = reviewerCustomerIdsRef.docs[0].data().reviewerCustomerIds as string[]
                if(reviewInfo.reviewerCustomerId !== "" && reviewerCustomerIds.includes(reviewInfo.reviewerCustomerId)){
                    // throw Error()で例外を投げれない
                    return;
                }
            }

            //すでに商品のレビューがある場合
            const totalStarField = await productInfoCollection.where("productId", "==", reviewInfo.productId).select('totalStar').get()
            const numberOfTotalReviewField = await productInfoCollection.where('productId', "==", reviewInfo.productId).select('numberOfTotalReview').get()

            productInfoCollection.doc(reviewInfo.productId).update({
                productId: reviewInfo.productId,
                reviewerCustomerIds: FieldValue.arrayUnion(reviewInfo.reviewerCustomerId),
                totalStar: FieldValue.increment(reviewInfo.review.star),
                score: ((totalStarField.docs[0].data().totalStar + reviewInfo.review.star) / (numberOfTotalReviewField.docs[0].data().numberOfTotalReview + 1)).toFixed(2),
                numberOfTotalReview: FieldValue.increment(1),
            });
            reviewCollection.doc().set({...reviewInfo.review, postDate: firestore.FieldValue.serverTimestamp()})

        }else{
            //商品の初めてのレビュー
            productInfoCollection.doc(reviewInfo.productId).set({
                productId: reviewInfo.productId,
                reviewerCustomerIds: [reviewInfo.reviewerCustomerId],
                totalStar: reviewInfo.review.star,
                numberOfTotalReview: 1,
                score: reviewInfo.review.star
            })

            reviewCollection.doc().set({...reviewInfo.review, postDate: firestore.FieldValue.serverTimestamp()})
        }

        res.statusCode = 200

    }catch(e: any){
        throw Error(e.message)
    }
}
