import { StringEdge } from "@shopify/shema"

const getProductTypes = async(url: string): Promise<StringEdge[]> => {

    const response = await fetch(url,{
        method: "POST",
        mode: "no-cors"
    })

    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }
    return data.productTypes.edges.map((value: StringEdge) => value)
}

export default getProductTypes