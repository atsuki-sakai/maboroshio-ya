
import { HOSTING_URL } from "@shopify/const"

export type ApiPath = {
    type: "POST_PRODUCT_REVIEW" | "GET_PRODUCT_REVIEWS";
}


export const firebaseApiUrl = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "POST_PRODUCT_REVIEW": {
            return `${HOSTING_URL}/api/products/review/post-product-review`
        }
        case "GET_PRODUCT_REVIEWS": {
            return `${HOSTING_URL}/api/products/review/get-product-reviews`
        }
        default : {
            throw Error('It is an APITYPE that does not exist...')
        }
    }
}