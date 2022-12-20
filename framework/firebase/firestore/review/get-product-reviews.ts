
import { firebaseApiUrl } from "@firebase/firesbase-api-url"
import { Review } from "@shopify/types/review"

const getProductReviews = async(productId: string, limit: number): Promise<Review[]> => {

    const getProuctReviewsApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEWS"})
    const response = await fetch(getProuctReviewsApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            productId: productId,
            limit: limit
        })
    })

    const { data, error }  = await response.json()

    if(error){
        throw Error(error.message)
    }
    return data
}

export default getProductReviews