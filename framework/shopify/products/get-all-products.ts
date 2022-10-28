
import { ProductConnection } from "@shopify/shema"
import { ApiConfig } from "@shopify/types/api"
import { Product } from "@shopify/types/product"
import { normalizeProduct, getAllProductsQuery } from "@shopify/utils"
type ReturnType = {
    products: ProductConnection
}

const getAllProduct = async (config: ApiConfig) : Promise<Product[]>=> {
    const { data } = await config.fetch<ReturnType>({
        query: getAllProductsQuery
    })
    const products = data.products.edges.map(({node: product}) => {
        return normalizeProduct(product);
    }) ?? [];
    return products;
}

export default getAllProduct