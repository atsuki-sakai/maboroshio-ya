import type { NextApiRequest, NextApiResponse } from 'next';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount  from '../../../../firebase-serviceAccount.json'; // 秘密鍵を取得
import admin from 'firebase-admin';
import { PRODUCT_INFO_COLLECTION, REVIEW_COLLLECTION  } from "@firebase/const"


export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error('this api is only POST method...')

    try{
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: cert(serviceAccount as any),
            });
        }

        const body = JSON.parse(req.body) as { productId: string, limit: number }

        const db = getFirestore();

        // #TODO - 最新のレビューから昇順で取得したい
        const productReviewsMatchQuery = await db.collection(PRODUCT_INFO_COLLECTION).doc(body.productId).collection(REVIEW_COLLLECTION).where('productId', "==", body.productId).limit(body.limit).get()

        let reviews : Array<any>= []
        if(productReviewsMatchQuery.docs[0]?.exists)[
            productReviewsMatchQuery.docs.map((doc) => {
                reviews.push(doc.data())
            })
        ]

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ data: { reviews:  reviews }}))

    }catch(e: any){

        throw Error(e.message)
    }
}
