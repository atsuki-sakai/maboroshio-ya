
import { Container, Field } from '@components/ui'
import {  postProductReview } from '@firebase/firestore/review'
import { getProduct } from '@shopify/products'
import getProductsPaths from '@shopify/products/get-all-product-paths'
import { PostReviewInput } from '@shopify/types/review'
import { useCustomerState  } from "@components/context"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useState } from 'react'
import idConverter from '@lib/id-converter'
import { useRouter } from 'next/router'

const PostReview = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {


    const { loggedCustomer } = useCustomerState()
    const router = useRouter()

    const [ postReviewInfo, setPostReviewInfo ] = useState<PostReviewInput>({
        reviewerCustomerId: idConverter({type: "CUSTOMER"},loggedCustomer?.id ?? ""),
        productId: idConverter({type: "PRODUCT"},product.id),
        review: {
            customerId: idConverter({type: "CUSTOMER"},loggedCustomer?.id ?? ""),
            customerName: loggedCustomer?.displayName ?? "",
            isPublic: false,
            productId: idConverter({type: "PRODUCT"}, product.id),
            productName: product.name,
            star: 3,
            title: "",
            comment: "",
        }
    })

    const postReview = async () => {
        try{
            await postProductReview(postReviewInfo);
            router.push('/')
        }catch(e: any){
            alert(e.message)
        }
    };

    console.log(postReviewInfo)

    return (
        <Container>
            <div className='px-8 space-y-2'>
                <h1 className='mb-6 font-bold text-lg'>商品レビューの投稿</h1>
                <div className='text-xs'>
                    <label className='block' htmlFor="star" id="star">評価</label>
                    <input className='block border rounded-md bg-gray-50 w-12 h-6 focus:outline-none px-2' type="number" id="star" name="star" min="1" max="5" onChange={(e) => setPostReviewInfo({
                        ...postReviewInfo,
                        review: {
                            ...postReviewInfo.review,
                            star: parseFloat(e.target.value)
                        }
                    })}/>
                </div>
                <Field label='投稿者名' placeHolder='山田 太郎' id='customer-name' value={postReviewInfo.review.customerName} onChange={(e) => setPostReviewInfo({...postReviewInfo, review: { ...postReviewInfo.review, customerName: e.target.value }})}/>
                <Field label='タイトル' placeHolder='例題' id='title' value={postReviewInfo.review.title} onChange={(e) => setPostReviewInfo({...postReviewInfo, review: { ...postReviewInfo.review, title: e.target.value }})}/>
                <div>
                    <label className='block text-xs text-gray-700' htmlFor="">本文</label>
                    <textarea className='text-base block text-gray-500 w-full border p-2 rounded-md bg-gray-50 focus:outline-none' id="story" placeholder={"例文"} name="story" rows={10} value={postReviewInfo.review.comment} onChange={(e) => setPostReviewInfo({...postReviewInfo, review: { ...postReviewInfo.review, comment: e.target.value }})} />
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='my-6 text-center bg-blue-600 rounded-md shadow-md text-white px-3 py-1' onClick={postReview}>レビューを投稿</button>
            </div>
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const paths = await getProductsPaths()
    return {
        paths: paths.map((path) => `/products/post-review/${path}`),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async(context) => {

    const slug = context.params?.slug as string
    const product = await getProduct(slug)

    return {
        props: {
            product
        }
    }
}

export default PostReview