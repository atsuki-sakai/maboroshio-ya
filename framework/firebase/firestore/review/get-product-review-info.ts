
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount  from '../../../../firebase-serviceAccount.json'; // 秘密鍵を取得
import admin from 'firebase-admin';
import { PRODUCT_INFO_COLLECTION } from "@firebase/const"

const getProductReviewInfo = async(productId: string) => {
    try{
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: cert(serviceAccount as any),
            });
        }
        const db = getFirestore();
        const productInfoMatchQuery = await db.collection(PRODUCT_INFO_COLLECTION).where('productId', "==", productId).get()

        if(!productInfoMatchQuery.docs[0]?.exists) return {}
        return {...productInfoMatchQuery.docs[0].data()}

    }catch(error: any){
        throw Error(error.message)
    }
}

export default getProductReviewInfo