
import { generateApiUrl } from "@shopify/utils"

const getProductsPaths = async(): Promise<string[]> => {

    const getProductsPathsApiUrl = generateApiUrl({type:"GET_PRODUCTS_PATHS"})
    const response = await fetch(getProductsPathsApiUrl, {
        method: "POST",
        mode: "no-cors"
    })

    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    const paths: Array<string> =  data.products.edges.map((edge: any) => edge.node.handle)
    return paths
}

export default getProductsPaths