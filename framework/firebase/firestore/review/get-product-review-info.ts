

import { firebaseApiUrl } from '@firebase/utils';
import { ProductReviewInfo } from '@firebase/types/review';

const getProductReviewInfo = async(productId: string): Promise<ProductReviewInfo | null> => {
    const getProuctReviewInfoApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEW_INFO"})
    const response = await fetch(getProuctReviewInfoApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            productId: productId
        })
    })


    const data = await response.json()
    return data.productReviewInfo
}

export default getProductReviewInfo