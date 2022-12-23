
import { Container } from '@components/ui'
import { getProductReviewInfo} from '@firebase/firestore/review'
import { ProductReviewInfo, Review } from '@shopify/types/review'
import React, { useEffect, useState } from 'react'
import { ProductReviewCard } from '@components/product'
import useSWR from 'swr'
import { firebaseApiUrl } from '@firebase/firesbase-api-url'
import { useRouter } from 'next/router'
import { numberToStar } from '@lib/number-to-star'

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

    const [ info, setInfo] = useState<ProductReviewInfo | null>()
    useEffect(() => {
        (async() => {
            if(data){
                const reviewInfo = await getProductReviewInfo(data.reviews[0].productId)
                setInfo(reviewInfo)
            }
        })()
    }, [router.isReady, data, info])

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
            <div className='px-8'>
                <h1 className='font-bold text-xl font-sans'>カスタマーレビュー</h1>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='w-full flex justify-start items-end mt-3 mb-1'>
                            <div className='text-yellow-500 text-lg'>{numberToStar(info?.score ?? 0)}</div>
                            <div className='ml-3'>
                                <span className='text-sm'>
                                    星5つ中の{info?.score}
                                </span>
                            </div>
                        </div>
                        <p className='text-xs mb-5 text-gray-500'>
                            合計{info?.numberOfTotalReview ?? 0}件の評価
                        </p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <p className='text-xs text-blue-500 underline'>レビューを書く</p>
                    </div>
                </div>
                {/* <h1 className='text-xl font-bold'>{data.reviews[0].productName}</h1> */}
                <div className='space-y-5'>
                    {
                        data.reviews.map((review: Review, index: number) => {
                            return <ProductReviewCard key={index} review={review}/>;
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

export default ProductReviews