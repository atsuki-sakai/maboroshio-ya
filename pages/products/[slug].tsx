
import React from 'react'
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType
} from 'next'
import getAllProductsPaths from '@shopify/products/get-all-product-paths'
import { getProduct } from '@shopify/products'
import { ProductView } from '@components/product'


const ProductSlug = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <ProductView product={product}/>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllProductsPaths();
    return {
        paths: paths.map((path: string) => `/products/${path}`),
        fallback: false
    }
}

export const getStaticProps:GetStaticProps = async (context) => {

    const product = await getProduct(String(context.params?.slug))
    return {
        props: {
            product: product
        }
    }
}


export default ProductSlug