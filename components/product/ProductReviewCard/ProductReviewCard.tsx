
import { numberToStar } from '@lib/number-to-star'
import { truncate } from '@lib/truncate'
import { Review } from '@shopify/types/review'
import React, { useState } from 'react'

interface Props {
    review: Review
}

const ProductReviewCard = ({review}: Props) => {

    const [ showMore, setShowMore ] = useState(false)
    return (
        <div className="text-sm font-sans pb-6">
            <div className='flex justify-center pb-6'>
                <div className='bg-gray-300 h-[1px] w-2/3 rounded-full'></div>
            </div>
            <div className='flex items-end justify-between'>
                <p className='text-indigo-700 text-xs'>{ (new Date(review.postDate._seconds * 1000).toLocaleDateString())}</p>
                <p className='text-xs'>投稿者: <span className='font-bold text-xs'>{ truncate(review.customerName, 10)}</span></p>
            </div>
            <div className='flex items-end justify-between mt-1'>
                <div className='text-yellow-500'>{numberToStar(review.star)}</div>
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
            <div className='mt-3 flex items-center justify-between'>
                <button className='text-xs px-3 py-0.5 border shadow-sm rounded-md'>
                    役に立った
                </button>
            </div>
        </div>
    )
}

export default ProductReviewCard