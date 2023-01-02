import { ProductConnection } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"


const searchResultLength = async(query: string): Promise<any> => {

    const searchResultLengthApiUrl = generateApiUrl({type: "SEARCH_RESULT_LENGTH"})
    const response = await fetch(searchResultLengthApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            query: query
        })
    })
    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }
    return data.products.edges
}

export default searchResultLength