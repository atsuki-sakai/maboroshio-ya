import { generateApiUrl } from "@shopify/utils"
import { Collection } from "@shopify/shema"

const getCollectionByHandle = async(handle: string): Promise<Collection> => {

    const getCollectionByHandleApiUrl = generateApiUrl({type: "GET_COLLECTION_BY_HANDLE"})
    const response = await fetch(getCollectionByHandleApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            handle: handle
        })
    })

    const { data, error } = await response.json()

    if(error){
        throw Error(error.message)
    }

    return data.collectionByHandle
}


export default getCollectionByHandle