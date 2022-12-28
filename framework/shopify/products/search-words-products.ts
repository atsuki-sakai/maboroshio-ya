import { ProductConnection } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"

const searchWordsProducts = async(searchText: string, titleOnly: boolean): Promise<ProductConnection> => {

    const formatText = (words: string): string[] => words.split(/(\s+)/).filter( e => e.trim().length > 0)

    const searchWordsProductsApiUrl = generateApiUrl({type: "SEARCH_WORDS_PRODUCTS"})
    const response = await fetch(searchWordsProductsApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            titleOnly: titleOnly,
            words: [...formatText(searchText)]
        })
    })

    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }
    return data
}

export default searchWordsProducts