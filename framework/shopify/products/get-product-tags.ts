import { StringEdge } from "@shopify/shema"

const getProductTags = async(url: string): Promise<StringEdge[]> => {
    const response = await fetch(url,{
        method: "POST",
        mode: "no-cors"
    })

    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }

    return data.productTags.edges.map((value: any) => value)
}

export default getProductTags