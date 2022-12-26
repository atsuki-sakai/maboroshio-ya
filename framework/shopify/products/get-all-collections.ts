import { Collection } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"

const getAllCollections = async(limit: number): Promise<Collection[]> => {

    const getAllCollectionsApiUrl = generateApiUrl({type: "GET_ALL_COLLECTIONS"})
    console.log(getAllCollectionsApiUrl)
    const response = await fetch(getAllCollectionsApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            limit: limit
        })
    })

    const { data, error} = await response.json()

    if(error){
        throw Error(error.message)
    }

    console.log(data.collections)

    return data.collections.edges.map((edge: any) => edge.node)
}

export default getAllCollections