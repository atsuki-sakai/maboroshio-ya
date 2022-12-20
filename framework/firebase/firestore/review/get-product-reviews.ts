
import { firebaseApiUrl } from "@firebase/firesbase-api-url"
import { Review } from "@shopify/types/review"

const getProductReviews = async(productId: string, limit: number): Promise<Array<Review>> => {

    const getProuctReviewsApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEWS"})
    const response = await fetch(getProuctReviewsApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            productId: productId,
            limit: limit
        })
    })

    const { data } = await response.json()
    return data as Array<Review>
}

export default getProductReviews