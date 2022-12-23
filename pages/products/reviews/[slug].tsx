
import { Container } from '@components/ui'
import { getProductReviews } from '@firebase/firestore/review'
import { Review } from '@shopify/types/review'
import React, { useEffect, useState } from 'react'
import { ProductReviewCard } from '@components/product'

const ProductReviews = () => {

    const [ reviews, setReviews ] = useState<Review[]>()
    useEffect(() => {

        (async() => {
            console.log(document.location.pathname)
            const firestoreProductId = document.location.pathname.split('reviews/')[1]
            const productReviews = await getProductReviews(firestoreProductId, 5)
            setReviews(productReviews)
        })()

    }, [])

    if(!reviews){
        return  <div className='h-screen w-screen'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <p className='text-center text-gray-500'>読み込み中...</p>
                    </div>
                </div>
    }

    if(reviews.length === 0){
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
                    reviews.map((review: Review, index) => {
                        return <ProductReviewCard key={index} review={review}/>;
                    })
                }
            </div>
        </Container>
    )
}

export default ProductReviews