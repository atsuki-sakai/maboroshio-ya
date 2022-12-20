import type { NextApiRequest, NextApiResponse } from 'next';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount  from '../../../../firebase-serviceAccount.json'; // 秘密鍵を取得
import admin from 'firebase-admin';
import { REVIEW_COLLLECTION  } from "@firebase/const"
import { Review } from '@shopify/types/review';


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
        const docRef = db.collection(REVIEW_COLLLECTION).doc(body.productId);
        const productDoc = await docRef.get()
        let reviews: Review[] = []
        if(productDoc.exists){
            const reviewsSnapShot =  await db.collection(REVIEW_COLLLECTION).where('productId', "==", body.productId).limit(body.limit).get();
            reviews = reviewsSnapShot.docs[0].data().reviews
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({reviews}))

    }catch(e: any){

        throw Error(e.message)
    }
}
