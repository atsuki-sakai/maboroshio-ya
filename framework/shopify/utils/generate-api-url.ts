
import { HOSTING_URL } from "@shopify/const"

export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT" | "GET_CHECKOUT" | "UPDATE_CHECKOUT"
    | "CHECKOUT_LINE_ITEMS_ADD" | "CHECKOUT_LINE_ITEMS_UPDATE" | "CHECKOUT_LINE_ITEMS_REMOVE"
    | "CUSTOMER_ACCESS_TOKEN_CREATE" | "GET_CUSTOMER" | "CHECKOUT_CUSTOMER_ASSOCIATE"
    | "CHECKOUT_CUSTOMER_DISASSOCIATE" | "CUSTOMER_ADDRESS_CREATE" | "CUSTOMER_DEFAULT_ADDRESS_UPDATE"
    | "CUSTOMER_ADDRESS_UPDATE" | "CUSTOMER_ADDRESS_DELETE" | "CHECKOUT_SHIPPING_ADDRESS_UPDATE" | "CHECKOUT_ATTRIBUTES_UPDATE"
    | "CUSTOMER_RECOVER" | "CUSTOMER_RESET_PASSWORD" | "CUSTOMER_RESET_BY_URL";
}


export const generateApiUrl = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${HOSTING_URL}/api/customer/create-customer`
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
            return `${HOSTING_URL}/api/customer/customer-access-token-create`;
        }
        case "GET_CUSTOMER" : {
            return `${HOSTING_URL}/api/customer/get-customer`
        }
        case "CHECKOUT_CUSTOMER_ASSOCIATE" : {
            return `${HOSTING_URL}/api/customer/checkout-customer-associate`
        }
        case "CHECKOUT_CUSTOMER_DISASSOCIATE" : {
            return `${HOSTING_URL}/api/customer/checkout-customer-disassociate`
        }
        case "CUSTOMER_ADDRESS_CREATE" : {
            return `${HOSTING_URL}/api/customer/customer-address-create`
        }
        case "CUSTOMER_DEFAULT_ADDRESS_UPDATE" : {
            return `${HOSTING_URL}/api/customer/customer-default-address-update`
        }
        case "CUSTOMER_ADDRESS_UPDATE" : {
            return `${HOSTING_URL}/api/customer/customer-address-update`
        }
        case "CUSTOMER_ADDRESS_DELETE" : {
            return `${HOSTING_URL}/api/customer/customer-address-delete`
        }
        case "CHECKOUT_SHIPPING_ADDRESS_UPDATE" : {
            return `${HOSTING_URL}/api/cart/checkout-shipping-address-update`
        }
        case "CHECKOUT_ATTRIBUTES_UPDATE" : {
            return `${HOSTING_URL}/api/cart/checkout-attributes-update`
        }
        case "CUSTOMER_RECOVER" : {
            return `${HOSTING_URL}/api/customer/customer-recover`
        }
        case "CUSTOMER_RESET_PASSWORD" : {
            return `${HOSTING_URL}/api/customer/customer-reset-password`
        }
        case "CUSTOMER_RESET_BY_URL" : {
            return `${HOSTING_URL}/api/customer/customer-reset-by-url`
        }
        default : {
            throw Error('It is an APITYPE that does not exist...')
        }
    }
}