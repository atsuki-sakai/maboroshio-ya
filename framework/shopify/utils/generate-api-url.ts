
import { HOSTING_URL, NGROK_URL } from "@shopify/const"

export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT" | "GET_CHECKOUT" | "UPDATE_CHECKOUT" | "CHECKOUT_LINEITEMS_ADD"
}

//開発時はdev

const dev = true

const baseUrl = dev ? NGROK_URL : HOSTING_URL

export const generateApiUrl = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${baseUrl}/api/create-customer`
        }
        case "CREATE_CHECKOUT": {
            return `${baseUrl}/api/create-checkout`
        }
        case "GET_CHECKOUT": {
            return `${baseUrl}/api/get-checkout`
        }
        case "CHECKOUT_LINEITEMS_ADD": {
            return `${baseUrl}/api/checkout-lineitems-add`
        }
    }
}