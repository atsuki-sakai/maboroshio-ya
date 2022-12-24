
import { Container } from '@components/ui'
import { Review } from '@shopify/types/review'
import React, { useEffect } from 'react'
import { ProductReviewCard } from '@components/product'
import useSWR from 'swr'
import { firebaseApiUrl } from '@firebase/firesbase-api-url'
import { useRouter } from 'next/router'
import { numberToStar } from '@lib/number-to-star'

const ProductReviews = () => {

    const router = useRouter()
    const productId = router.asPath.split('reviews/')[1]

    const getProuctReviewsApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEWS"})
    const getProductReviewInfoApiUrl = firebaseApiUrl({type: "GET_PRODUCT_REVIEW_INFO"})
    const numberOfReviews = 5

    const reviewFetcher = (url: string, productId: string, limit?:number) => fetch(url, {
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

    const productReviewInfoFetcher = (url: string, productId: string) => fetch(url, {
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

    const { data: reviewsSWR, error: reviewError } = useSWR([getProuctReviewsApiUrl, productId, numberOfReviews], router.isReady ? reviewFetcher : null)
    const { data: productReviewInfoSWR, error: productReviewInfoError } = useSWR([getProductReviewInfoApiUrl, productId], router.isReady ? productReviewInfoFetcher : null)

    useEffect(() => {
    }, [router.isReady])

    if(reviewError || productReviewInfoError){
        if(productReviewInfoError){
            return <Container>useSWR is fetch error: {productReviewInfoError.message}</Container>
        }
        return <Container>useSWR is fetch error: {reviewError.message}</Container>
    }

    if(!reviewsSWR || !productReviewInfoSWR){
        return  <div className='h-screen w-screen'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <p className='text-center text-gray-500'>読み込み中...</p>
                    </div>
                </div>
    }

    if(reviewsSWR.reviews.length === 0){
        return <Container>
                    <div className='px-8'>
                        <h1 className='font-bold text-xl font-sans'>カスタマーレビュー</h1>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='w-full flex justify-start items-end mt-3 mb-1'>
                                    <div className='text-yellow-500 text-lg'>{numberToStar(productReviewInfoSWR.productReviewInfo?.score ?? 0)}</div>
                                    <div className='ml-3'>
                                        <span className='text-sm'>
                                            星5つ中の{productReviewInfoSWR.productReviewInfo?.score}
                                        </span>
                                    </div>
                                </div>
                                <p className='text-xs mb-5 text-gray-500'>
                                    合計{productReviewInfoSWR.productReviewInfo?.numberOfTotalReview ?? 0}件の評価
                                </p>
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className='text-xs text-blue-500 underline'>レビューを書く</p>
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
                <h1 className='font-bold text-xl font-sans'>カスタマーレビュー</h1>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='w-full flex justify-start items-end mt-3 mb-1'>
                            <div className='text-yellow-500 text-lg'>{numberToStar(productReviewInfoSWR.productReviewInfo?.score ?? 0)}</div>
                            <div className='ml-3'>
                                <span className='text-sm'>
                                    星5つ中の{productReviewInfoSWR.productReviewInfo?.score}
                                </span>
                            </div>
                        </div>
                        <p className='text-xs mb-5 text-gray-500'>
                            合計{productReviewInfoSWR.productReviewInfo?.numberOfTotalReview ?? 0}件の評価
                        </p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <p className='text-xs text-blue-500 underline'>レビューを書く</p>
                    </div>
                </div>
                <div className='space-y-5'>
                    {
                        reviewsSWR.reviews.map((review: Review, index: number) => {
                            return <ProductReviewCard key={index} review={review}/>;
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

export default ProductReviews