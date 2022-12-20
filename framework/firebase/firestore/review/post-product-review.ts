
import { firebaseApiUrl } from "@firebase/firesbase-api-url"
import type { PostReviewInput } from "@shopify/types/review"

const postProductReview = async(reviewInput: PostReviewInput) => {

    if(reviewInput.review.star < 1 || reviewInput.review.star > 5 ){
        throw Error("review start is 1 ~ 5.")
    }

    try{
        const postProuctReviewApiUrl = firebaseApiUrl({type:"POST_PRODUCT_REVIEW"})
        await fetch(postProuctReviewApiUrl, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                ...reviewInput
            })
        })

    }catch(e: any){
        throw Error(e.message)
    }
}

export default postProductReview