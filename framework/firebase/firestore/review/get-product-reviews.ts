
import { firebaseApiUrl } from "@firebase/firesbase-api-url"
import type { Review } from "@shopify/types/review"

const getProductReviews = async(productId: string, limit?: number): Promise<Review[]> => {

    const getProuctReviewsApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEWS"})
    const response = await fetch(getProuctReviewsApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            productId: productId,
            limit: limit
        })
    })

    const data = await response.json()
    return data.reviews as Review[]
}

export default getProductReviews