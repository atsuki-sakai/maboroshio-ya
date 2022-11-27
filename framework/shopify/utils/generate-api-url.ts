
import { HOSTING_URL } from "@shopify/const"

export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT" | "GET_CHECKOUT" | "UPDATE_CHECKOUT"
    | "CHECKOUT_LINE_ITEMS_ADD" | "CHECKOUT_LINE_ITEMS_UPDATE" | "CHECKOUT_LINE_ITEMS_REMOVE"
    | "CUSTOMER_ACCESS_TOKEN_CREATE" | "GET_CUSTOMER" | "CHECKOUT_CUSTOMER_ASSOCIATE"
    | "CHECKOUT_CUSTOMER_DISASSOCIATE";
}


export const generateApiUrl = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${HOSTING_URL}/api/auth/create-customer`
        }
        case "CREATE_CHECKOUT": {
            return `${HOSTING_URL}/api/cart/create-checkout`
        }
        case "GET_CHECKOUT": {
            return `${HOSTING_URL}/api/cart/get-checkout`
        }
        case "CHECKOUT_LINE_ITEMS_ADD": {
            return `${HOSTING_URL}/api/cart/checkout-line-items-add`
        }
        case "CHECKOUT_LINE_ITEMS_UPDATE" : {
            return `${HOSTING_URL}/api/cart/checkout-line-items-update`;
        }
        case "CHECKOUT_LINE_ITEMS_REMOVE" : {
            return `${HOSTING_URL}/api/cart/checkout-line-items-remove`;
        }
        case "CUSTOMER_ACCESS_TOKEN_CREATE" : {
            return `${HOSTING_URL}/api/auth/customer-access-token-create`;
        }
        case "GET_CUSTOMER" : {
            return `${HOSTING_URL}/api/auth/get-customer`
        }
        case "CHECKOUT_CUSTOMER_ASSOCIATE" : {
            return `${HOSTING_URL}/api/auth/checkout-customer-associate`
        }
        case "CHECKOUT_CUSTOMER_DISASSOCIATE" : {
            return `${HOSTING_URL}/api/auth/checkout-customer-disassociate`
        }
        default : {
            throw Error('It is an APITYPE that does not exist...')
        }
    }
}