
import { getProductsPagenationQuery } from "@shopify/utils"
import { generateApiUrl } from "@shopify/utils/generate-api-url"


type PaginationType = {
    type: "NEXT" | "PREVIOUS",
    cursor: string
}

const getProductsPagenation = async(numProducts: number, pagination?: PaginationType) => {

    const getProductsPaginationApiUrl = generateApiUrl({type:"GET_PRODUCTS_PAGINATION"})
    const response = await fetch(getProductsPaginationApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            numProducts: numProducts,
            pagination: pagination
        })
    })

    const { data, error } = await response.json();

    console.log("data: ", data)
    if(error){
        throw Error(error.message)
    }
    return data
}

export default getProductsPagenation