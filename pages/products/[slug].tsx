
import React from 'react'
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType
} from 'next'
import { getConfig } from '@shopify/api/config'
import getAllProductsPaths from '@shopify/products/get-all-product-paths'
import { getProduct } from '@shopify/products'
import { ProductView } from '@components/ui'

const ProductSlug = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <ProductView product={product}/>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const config = getConfig();
    const { products } = await getAllProductsPaths(config);
    return {
        paths: products.map(p => `/products/${p.slug}`),
        fallback: false
    }
}
export const getStaticProps:GetStaticProps = async (context) => {
    const config = getConfig()
    const { product } = await getProduct({ config, variables: { slug: context.params?.slug } })
    return {
        props: {
            product: product
        }
    }
}


export default ProductSlug