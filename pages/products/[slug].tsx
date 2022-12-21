
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

    const numberOfReviews = 4
    const firestoreProductId = idConverter({type: "PRODUCT"}, product.id)

    const reviews = await getProductReviews(firestoreProductId, numberOfReviews)

    return {
        props: {
            product,
            reviews
        }
    }
}


export default ProductSlug