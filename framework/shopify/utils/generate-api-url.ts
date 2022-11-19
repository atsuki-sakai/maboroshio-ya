
import { HOSTING_URL } from "@shopify/const"

export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT" | "GET_CHECKOUT" | "UPDATE_CHECKOUT" 
    | "CHECKOUT_LINE_ITEMS_ADD" | "CHECKOUT_LINE_ITEMS_UPDATE" | "CHECKOUT_LINE_ITEMS_REMOVE";
}


export const generateApiUrl = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${HOSTING_URL}/api/create-customer`
        }
        case "CREATE_CHECKOUT": {
            return `${HOSTING_URL}/api/create-checkout`
        }
        case "GET_CHECKOUT": {
            return `${HOSTING_URL}/api/get-checkout`
        }
        case "CHECKOUT_LINE_ITEMS_ADD": {
            return `${HOSTING_URL}/api/checkout-line-items-add`
        }
        case "CHECKOUT_LINE_ITEMS_UPDATE" : {
            return `${HOSTING_URL}/api/checkout-line-items-update`;
        }
        case "CHECKOUT_LINE_ITEMS_REMOVE" : {
            return `${HOSTING_URL}/api/checkout-line-items-remove`;
        }
    }
}