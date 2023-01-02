
import { HOSTING_URL } from "@shopify/const"

type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT" | "GET_CHECKOUT" | "UPDATE_CHECKOUT"
    | "CHECKOUT_LINE_ITEMS_ADD" | "CHECKOUT_LINE_ITEMS_UPDATE" | "CHECKOUT_LINE_ITEMS_REMOVE"
    | "CUSTOMER_ACCESS_TOKEN_CREATE" | "GET_CUSTOMER" | "CHECKOUT_CUSTOMER_ASSOCIATE"
    | "CHECKOUT_CUSTOMER_DISASSOCIATE" | "CUSTOMER_ADDRESS_CREATE" | "CUSTOMER_DEFAULT_ADDRESS_UPDATE"
    | "CUSTOMER_ADDRESS_UPDATE" | "CUSTOMER_ADDRESS_DELETE" | "CHECKOUT_SHIPPING_ADDRESS_UPDATE" | "CHECKOUT_ATTRIBUTES_UPDATE"
    | "CUSTOMER_RECOVER" | "CUSTOMER_RESET_BY_URL" | "CUSTOMER_UPDATE" | "GET_ORDER" | "GET_PRODUCTS_PAGINATION" | "GET_ORDERS_PAGINATION"
    | "GET_PRODUCTS_PATHS" | "GET_PRODUCT" | "GET_CUSTOMER_ALL_ORDERS_ID" | "GET_ALL_COLLECTIONS" | "GET_COLLECTION_BY_HANDLE" 
    | "SEARCH_WORDS_PRODUCTS" | "SEARCH_QUERY_PRODUCTS" | "SEARCH_RESULT_LENGTH"  | "GET_PRODUCT_TAGS" | "GET_PRODUCT_TYPES";
}


const generateApiUrl = (apiPath: ApiPath) => {
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
        case "CUSTOMER_RESET_BY_URL" : {
            return `${HOSTING_URL}/api/customer/customer-reset-by-url`
        }
        case "CUSTOMER_UPDATE" : {
            return `${HOSTING_URL}/api/customer/customer-update`
        }
        case "GET_ORDER" : {
            return `${HOSTING_URL}/api/customer/get-order`
        }
        case "GET_ORDERS_PAGINATION" : {
            return `${HOSTING_URL}/api/customer/get-orders-pagination`
        }
        case "GET_PRODUCTS_PAGINATION" : {
            return `${HOSTING_URL}/api/products/get-products-pagination`
        }
        case "GET_PRODUCT" : {
            return `${HOSTING_URL}/api/products/get-product`
        }
        case "GET_PRODUCTS_PATHS" : {
            return `${HOSTING_URL}/api/products/get-products-paths`
        }
        case "GET_CUSTOMER_ALL_ORDERS_ID" : {
            return `${HOSTING_URL}/api/customer/get-customer-all-orders-id`
        }
        case "GET_ALL_COLLECTIONS" : {
            return `${HOSTING_URL}/api/products/get-all-collections`
        }
        case "GET_COLLECTION_BY_HANDLE" : {
            return `${HOSTING_URL}/api/products/get-collection-by-handle`
        }
        case "SEARCH_WORDS_PRODUCTS": {
            return `${HOSTING_URL}/api/products/search/search-words-products`
        }
        case "SEARCH_QUERY_PRODUCTS": {
            return `${HOSTING_URL}/api/products/search/search-query-products`
        }
        case "SEARCH_RESULT_LENGTH": {
            return `${HOSTING_URL}/api/products/search/search-result-length`
        }
        case "GET_PRODUCT_TYPES": {
            return `${HOSTING_URL}/api/products/get-product-types`
        }
        case "GET_PRODUCT_TAGS": {
            return `${HOSTING_URL}/api/products/get-product-tags`
        }
        default : {
            throw Error('It is an APITYPE that does not exist...')
        }
    }
}

export default generateApiUrl