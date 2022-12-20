import type { NextApiRequest, NextApiResponse } from 'next';
import { cert } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import serviceAccount  from '../../../../firebase-serviceAccount.json'; // 秘密鍵を取得
import admin from 'firebase-admin';
import { REVIEW_COLLLECTION  } from "@firebase/const"
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
        const docRef = db.collection(REVIEW_COLLLECTION).doc(reviewInfo.productId);
        const reviewCollection = db.collection(REVIEW_COLLLECTION)

        const productReviewDoc = await docRef.get()
        ///商品のレビュードキュメントが存在するか
        if(productReviewDoc.exists){
            // 顧客がすでに商品のレビューを書いていた場合
            const reviewerCustomerIdsDoc = await reviewCollection.select("reviewerCustomerIds").get()
            const reviewerCustomerIds = reviewerCustomerIdsDoc.docs[0].data().reviewerCustomerIds as [string]
            if(reviewerCustomerIds.includes(reviewInfo.review.customerId)){
                // throw Error()で例外を投げれない
                return;
            }
            //すでに商品のレビューがある場合
            const totalStartSnapshot = await reviewCollection.where("productId", "==", reviewInfo.productId).select('totalStar').get()
            const numberOfTotalReviewSnapshot = await reviewCollection.where('productId', "==", reviewInfo.productId).select('numberOfTotalReview').get()
            await docRef.update({
                productId: reviewInfo.productId,
                totalStar: FieldValue.increment(reviewInfo.review.star),
                reviewerCustomerIds: FieldValue.arrayUnion(reviewInfo.reviewerCustomerId),
                score: (totalStartSnapshot.docs[0].data().totalStar + reviewInfo.review.star) / (numberOfTotalReviewSnapshot.docs[0].data().numberOfTotalReview + 1),
                numberOfTotalReview: FieldValue.increment(1),
                reviews: FieldValue.arrayUnion(reviewInfo.review)
            });
        }else{
            //商品の初めてのレビュー
            await docRef.set({
                productId: reviewInfo.productId,
                totalStar: reviewInfo.review.star,
                reviewerCustomerIds: [reviewInfo.reviewerCustomerId],
                score: reviewInfo.review.star,
                numberOfTotalReview: 1,
                reviews: [reviewInfo.review],
                isPublic: false
            });
        }

        res.statusCode = 200

    }catch(e: any){
        throw Error(e.message)
    }
}
