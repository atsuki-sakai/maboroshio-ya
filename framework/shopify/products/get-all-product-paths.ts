
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const getProductsPaths = async() => {

    const getProductsPathsApiUrl = generateApiUrl({type:"GET_PRODUCTS_PATHS"})
    const response = await fetch(getProductsPathsApiUrl, {
        method: "POST",
        mode: "no-cors"
    })

    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    return data.products.edges.map((p: any) => p.node.handle)
}

export default getProductsPaths