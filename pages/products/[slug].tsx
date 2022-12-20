
import React from 'react'
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType
} from 'next'
import getAllProductsPaths from '@shopify/products/get-all-product-paths'
import { getProduct } from '@shopify/products'
import { ProductView } from '@components/product'
import { getProductReviews } from '@firebase/firestore/review'


const ProductSlug = ({ product, reviews }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log('reviews: ', reviews)
    console.log('product: ', product)
    return (
        <>
            <ProductView product={product} reviews={reviews}/>
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
    const reviews = await getProductReviews(product.id, 4)
    return {
        props: {
            product: product,
            reviews: reviews
        }
    }
}


export default ProductSlug