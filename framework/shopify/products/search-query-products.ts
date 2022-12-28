import { ProductConnection } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"


const searchQueryProducts = async(query: string, andToOr: "AND" | "OR"): Promise<ProductConnection> => {

    const searchQueryProductsApiUrl = generateApiUrl({type: "SEARCH_QUERY_PRODUCTS"})
    const response = await fetch(searchQueryProductsApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            query: query,
            andToOr: andToOr
        })
    })
    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }
    return data.products
}

export default searchQueryProducts