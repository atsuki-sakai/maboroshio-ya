import type { NextApiRequest, NextApiResponse } from 'next';
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../../../../firebase-serviceAccount.json'); // 秘密鍵を取得
const admin = require('firebase-admin');

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    const COLLECTION_NAME = 'review';

    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: cert(serviceAccount),
        });
    }

    const db = getFirestore();
    const targetDoc = '343ujzfL7XxWBH3FeUXz'; //書き換える

    if (req.method === 'POST') {

        const docRef = db.collection(COLLECTION_NAME).doc();
        const insertData = {
            writer: 'sumoto shinya',
        };
        docRef.set(insertData);
    } else if (req.method === 'PATCH') {

        const docRef = db.collection(COLLECTION_NAME).doc(targetDoc);
        const updateData = {
            writer: "fujimoto kyouhei"
        };

        docRef.set(updateData);
    }

    res.status(200);
}
