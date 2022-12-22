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
        const reviewCollection = reviewInfo.reviewerCustomerId !== "" ? productInfoCollection.doc(reviewInfo.productId).collection(REVIEW_COLLLECTION).doc(reviewInfo.reviewerCustomerId)
                                                                        : productInfoCollection.doc(reviewInfo.productId).collection(REVIEW_COLLLECTION).doc()
        const productInfoRef = await db.collection(PRODUCT_INFO_COLLECTION).doc(reviewInfo.productId).get()



        //商品のレビュードキュメントが存在するか
        if(productInfoRef.exists){

            //すでに商品のレビューがある場合
            const totalStarField = await productInfoCollection.where("productId", "==", reviewInfo.productId).select('totalStar').get()
            const numberOfTotalReviewField = await productInfoCollection.where('productId', "==", reviewInfo.productId).select('numberOfTotalReview').get()

            productInfoCollection.doc(reviewInfo.productId).update({
                productId: reviewInfo.productId,
                productName: reviewInfo.productName,
                totalStar: FieldValue.increment(reviewInfo.review.star),
                score: ((totalStarField.docs[0].data().totalStar + reviewInfo.review.star) / (numberOfTotalReviewField.docs[0].data().numberOfTotalReview + 1)).toFixed(1),
                numberOfTotalReview: FieldValue.increment(1),
            });
            reviewCollection.set({...reviewInfo.review, postDate: firestore.FieldValue.serverTimestamp()})

        }else{
            //商品の初めてのレビュー
            productInfoCollection.doc(reviewInfo.productId).set({
                productId: reviewInfo.productId,
                productName: reviewInfo.productName,
                totalStar: reviewInfo.review.star,
                numberOfTotalReview: 1,
                score: reviewInfo.review.star
            })

            reviewCollection.set({...reviewInfo.review, postDate: firestore.FieldValue.serverTimestamp()})
        }

        res.statusCode = 200

    }catch(e: any){
        throw Error(e.message)
    }
}
