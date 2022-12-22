
import React from 'react'
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType
} from 'next'
import getAllProductsPaths from '@shopify/products/get-all-product-paths'
import { getProduct } from '@shopify/products'
import { ProductView } from '@components/product'
import { getProductReviewInfo, getProductReviews } from '@firebase/firestore/review'
import idConverter from '@lib/id-converter'

const ProductSlug = ({ product, reviews, productReviewInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {

    console.log(productReviewInfo)
    return (
        <>
            <ProductView product={product} reviews={reviews} productReviewInfo={productReviewInfo}/>
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
    const productReviewInfo = await getProductReviewInfo(idConverter({type: "PRODUCT"},product.id))

    return {
        props: {
            product,
            reviews,
            productReviewInfo

        }
    }
}

export default ProductSlug