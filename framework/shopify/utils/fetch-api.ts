
import { SHOPIFY_ADMIN_ACCESS_TOKEN, SHOPIFY_ADMIN_API_URL } from "@shopify/const"
import { ApiFetchResults } from "@shopify/types/api"

export type Variables = { [key: string]: string | string[] | any | undefined }

export type ApiFetchOptions = {
    query: string
    variables?: Variables
}

const fetchApi = async<T>({ query, variables }: ApiFetchOptions): Promise<ApiFetchResults<T>> => {
    const res = await fetch(SHOPIFY_ADMIN_API_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": SHOPIFY_ADMIN_ACCESS_TOKEN!
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
    const { data, errors } = await res.json();
    if(errors) {
        throw new Error(errors[0].message ?? errors.message);
    }
    return { data }
}

export default fetchApi