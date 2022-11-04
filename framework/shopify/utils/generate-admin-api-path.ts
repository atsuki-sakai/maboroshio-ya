
import { HOSTING_URL } from "@shopify/const"

export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT"
}

export const generateAdminApiPath = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${HOSTING_URL}/api/create-customer`
        }
        case "CREATE_CHECKOUT": {
            return `${HOSTING_URL}/api/create-checkout`
        }
    }
}