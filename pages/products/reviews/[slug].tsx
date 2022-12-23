
import { Container } from '@components/ui'
import { getProductReviews } from '@firebase/firestore/review'
import { Review } from '@shopify/types/review'
import React, { useEffect, useState } from 'react'
import { ProductReviewCard } from '@components/product'
import useSWR from 'swr'
import { firebaseApiUrl } from '@firebase/firesbase-api-url'
import { useRouter } from 'next/router'

const ProductReviews = () => {

    const router = useRouter()
    const orderId = router.asPath.split('reviews/')[1]

    const getProuctReviewsApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEWS"})
    const fetcher = (url: string, productId: string, limit?:number) => fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            productId: productId,
            limit: limit
        })
    }).then((res) => {
        return res.json()
    }).catch((e) => {
        throw Error(e.message)
    })

    const { data, error } = useSWR([getProuctReviewsApiUrl, orderId, 5], router.isReady ? fetcher : null)

    useEffect(() => {
    }, [router.isReady])

    if(error){
        return <Container>useSWR is fetch error: {error.message}</Container>
    }

    if(!data){
        return  <div className='h-screen w-screen'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <p className='text-center text-gray-500'>読み込み中...</p>
                    </div>
                </div>
    }

    if(data.reviews.length === 0){
        return  <div className='h-screen w-screen'>
                    <h1 className='text-xl font-bold'>商品レビュー</h1>
                    <div className='flex justify-center items-center w-full h-full'>
                        <p className='text-center text-gray-500'>レビューはまだありません...</p>
                    </div>
                </div>
    }

    return (
        <Container>
            <h1 className='text-xl font-bold'>商品レビュー</h1>
            <div className='px-8 space-y-5'>
                {
                    data.reviews.map((review: Review, index: number) => {
                        return <ProductReviewCard key={index} review={review}/>;
                    })
                }
            </div>
        </Container>
    )
}

export default ProductReviews