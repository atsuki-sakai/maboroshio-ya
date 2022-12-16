
import { Product as ShopifyProduct } from "@shopify/shema" 
import type { Product } from "@shopify/types/product"
import { normalizeProduct } from "@shopify/utils"
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const getProduct = async(slug: string) => {

    const getProductApiUrl = generateApiUrl({type:"GET_PRODUCT"})
    console.log(getProductApiUrl)
    const response = await fetch(getProductApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            slug: slug
        })
    })

    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    const _product = data.productByHandle as ShopifyProduct
    const product = normalizeProduct(_product) as Product
    return product
}

export default getProduct