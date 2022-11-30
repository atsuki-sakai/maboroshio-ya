
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN } from "@shopify/const";
import Cookies from "js-cookie"


const getCustomerAccessToken = () => {
    return Cookies.get(SHOPIFY_CUSTOMER_ACCESS_TOKEN!);
}

export default getCustomerAccessToken