
import { numberToStar } from '@lib/number-to-star'
import { truncate } from '@lib/truncate'
import { Review } from '@firebase/types/review'
import React, { useState } from 'react'

interface Props {
    review: Review
}

const ProductReviewCard = ({review}: Props) => {

    const [ showMore, setShowMore ] = useState(false)
    const postDate = new Date(review.postDate._seconds * 1000)

    return (
        <div className="text-sm font-sans pb-6">
            <div className='flex justify-center pb-6'>
                <div className='bg-gray-300 h-[1px] w-2/3 rounded-full'></div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='text-yellow-500 text-xl'>{numberToStar(review.star)}</div>
                <p className='text-xs'>投稿者: <span className='font-bold text-sm'>{ truncate(review.customerName, 10)}</span></p>
            </div>
            <div className='flex items-end justify-between'>
                <p className='text-gray-500 text-xs'>{postDate.getFullYear()}年{postDate.getMonth()}月{postDate.getDay()}日に投稿</p>
                {
                    review.customerId !== "" ? <div className='px-3 py-0.5 border border-orange-500 rounded-md'><p className='text-orange-500 text-xs font-bold'>認証ユーザー</p></div>: null
                }
            </div>
            <div className='mt-1'>
                <p className='text-base font-bold tracking-wide py-2'>{truncate(review.title, 30)}</p>
                {
                    showMore ? <p className='text-xs'>{review.comment}</p> : <p className='text-xs'>{truncate(review.comment, 120)}</p>
                }
                {
                    review.comment.length > 120 ? <div className='w-full flex justify-end'><button className='text-blue-500 text-xs underline' onClick={() => setShowMore(!showMore)}>{showMore ? "閉じる": "詳しく読む"}</button></div> : null
                }
            </div>
        </div>
    )
}

export default ProductReviewCard