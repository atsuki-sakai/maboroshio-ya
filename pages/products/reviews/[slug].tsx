

import React, { useEffect } from 'react'
import useSWR from 'swr'
import Link from "next/link"

import { Container, LoadingView } from '@components/ui'
import { ProductReviewInfo, Review } from '@firebase/types/review'
import { ProductReviewCard } from '@components/product'
import { firebaseApiUrl } from '@firebase/utils'
import { useRouter } from 'next/router'
import { numberToStar } from '@lib/number-to-star'

const ProductReviews = () => {

    const router = useRouter()
    const productSlug = router.query?.handle
    const productId = router.asPath.split('reviews/')[1]

    const prouctReviewsApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEWS"})
    const productReviewInfoApiUrl = firebaseApiUrl({type: "GET_PRODUCT_REVIEW_INFO"})
    const numberOfReviews = 5

    const reviewsFetcher = async (url: string, productId: string, limit?:number): Promise<Review[]> =>{
        const response = await fetch(url, {
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
        return response.reviews
    }
    const productReviewInfoFetcher = async(url: string, productId: string): Promise<ProductReviewInfo | null> => { 
        const response = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                productId: productId
            })
        }).then((res) => {
            return res.json()
        }).catch((e) => {
            throw Error(e.message)
        })
        return response.productReviewInfo
    }

    const { data: reviews, error: reviewsError } = useSWR([prouctReviewsApiUrl, productId, numberOfReviews], router.isReady ? reviewsFetcher : null)
    const { data: productReviewInfo, error: productReviewInfoError } = useSWR([productReviewInfoApiUrl, productId], router.isReady ? productReviewInfoFetcher : null)

    useEffect(() => {
    }, [router.isReady])

    if(reviewsError || productReviewInfoError){
        if(productReviewInfoError){
            return <Container>useSWR is fetch error: {productReviewInfoError.message}</Container>
        }
        return <Container>useSWR is fetch error: {reviewsError.message}</Container>
    }

    if(!reviews || !productReviewInfo){
        return  <LoadingView/>
    }

    if(reviews.length === 0){
        return <Container>
                    <div className='px-8'>
                        <div className='border-b'>
                            <h1 className='font-bold text-xl font-sans'>カスタマーレビュー</h1>
                            <div className='flex items-center justify-between'>
                            <div>
                                <div className='w-full flex justify-start items-end mt-3 mb-1'>
                                    <div className='text-yellow-500 text-lg'>{numberToStar(productReviewInfo?.score ?? 0)}</div>
                                    <div className='ml-3'>
                                        <span className='text-sm'>
                                            星5つ中の{productReviewInfo?.score}
                                        </span>
                                    </div>
                                </div>
                                <p className='text-xs mb-5 text-gray-500'>
                                    合計{productReviewInfo?.numberOfTotalReview ?? 0}件の評価
                                </p>
                            </div>
                            <Link
                                href={`/products/post-review/${productSlug}`}
                                passHref
                            >
                                <a>
                                    <div className='flex justify-center items-center'>
                                        <p className='text-xs text-blue-500 underline'>レビューを書く</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        </div>
                        <div className='flex justify-center items-center w-full h-[420px]'>
                            <p className='text-center text-gray-500'>レビューはまだありません...</p>
                        </div>
                    </div>
                </Container>
    }

    return (
        <Container>
            <div className='px-8'>
                <div className='border-b'>
                    <h1 className='font-bold text-xl font-sans'>カスタマーレビュー</h1>
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='w-full flex justify-start items-end mt-3 mb-1'>
                                <div className='text-yellow-500 text-lg'>{numberToStar(productReviewInfo?.score ?? 0)}</div>
                                <div className='ml-3'>
                                    <span className='text-sm'>
                                        星5つ中の<span className='text-base font-bold'>{productReviewInfo?.score}</span>
                                    </span>
                                </div>
                            </div>
                            <p className='text-xs mb-5 text-gray-500'>
                                合計{productReviewInfo?.numberOfTotalReview ?? 0}件の評価
                            </p>
                        </div>
                        <Link
                            href={`/products/post-review/${productSlug}`}
                            passHref
                        >
                            <a>
                                <div className='flex justify-center items-center'>
                                    <p className='text-xs text-blue-500 underline'>レビューを書く</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='space-y-5'>
                    {
                        reviews.map((review: Review, index: number) => {
                            return <ProductReviewCard key={index} review={review}/>;
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

export default ProductReviews