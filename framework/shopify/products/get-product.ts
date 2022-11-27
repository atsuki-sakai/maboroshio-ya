
import { ApiConfig, Variables } from "@shopify/types/api"
import { Product } from "@shopify/types/product"
import { normalizeProduct } from "@shopify/utils"
import getProductQuery from "@shopify/utils/queries/get-product"

type ReturnType = {
    product: Product | null
}

type FetchType = {
    productByHandle: any
}
const getProduct = async (options: { config: ApiConfig, variables: Variables}): Promise<ReturnType> => {
    const { config, variables } = options
    const { data } = await config.fetch<FetchType>({
        query: getProductQuery,
        variables
    })
    const { productByHandle } = data
    return {
        product: productByHandle ? normalizeProduct(productByHandle) : null
    }
}

export default getProduct