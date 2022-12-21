
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
import idConverter from '@lib/id-converter'



const ProductSlug = ({ product, reviews }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log('reviews: ',reviews)
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

    const numberOfReviews = 4
    const product = await getProduct(String(context.params?.slug))
    const reviews = await getProductReviews(idConverter({type: "PRODUCT"}, product.id), numberOfReviews)

    return {
        props: {
            product,
            reviews
        }
    }
}


export default ProductSlug