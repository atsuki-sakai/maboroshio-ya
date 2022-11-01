import { ApiConfig } from "@shopify/types/api"
import { Product } from "@shopify/types/product"
import { ProductConnection } from "@shopify/shema"
import { getAllProductsPathsQuery } from "@shopify/utils/queries"

type ReturnType = {
    products: Pick<Product, "slug">[]
}

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {

    const { data } = await config.fetch<{products: ProductConnection}>({
        query: getAllProductsPathsQuery,
    })

    const products = data.products.edges.map(( { node : {handle}} ) => {
        return {
            slug: handle
        }
    })
    return { products }
}

export default getAllProductsPaths