
import { HOSTING_URL } from "@shopify/const"

export type ApiPath = {
    type: "POST_PRODUCT_REVIEW" | "GET_PRODUCT_REVIEWS" | "GET_PRODUCT_REVIEW_INFO";
}

const firebaseApiUrl = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "POST_PRODUCT_REVIEW": {
            return `${HOSTING_URL}/api/products/review/post-product-review`
        }
        case "GET_PRODUCT_REVIEWS": {
            return `${HOSTING_URL}/api/products/review/get-product-reviews`
        }
        case "GET_PRODUCT_REVIEW_INFO": {
            return `${HOSTING_URL}/api/products/review/get-product-review-info`
        }
        default : {
            throw Error('It is an APITYPE that does not exist...')
        }
    }
}

export default firebaseApiUrl