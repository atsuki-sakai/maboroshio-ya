
import { Splide, SplideSlide } from '@splidejs/react-splide'
import React from 'react'
import ProductCard from '../ProductCard'
import type { Collection } from '@shopify/shema'
import { truncate } from '@lib/truncate'
import { normalizeProduct } from '@shopify/utils'

interface Props {
    collection?: Collection
}

const CollectionSlide = ({collection}: Props) => {
    return (
        <>
            {
                collection ?
                <div>
                    <p className='text-lg font-bold'>
                        {collection.title}
                    </p>
                    <p className='text-sm text-gray-500'>
                        {truncate(collection.description, 32)}
                    </p>
                    <Splide>
                        {
                            collection.products.edges.map(({node: product}, index) => {
                                return  <SplideSlide key={index}>
                                            <ProductCard product={normalizeProduct(product)} productReviewInfo={null}/>
                                        </SplideSlide>
                            })
                        }
                    </Splide>
                </div> :
                <div>
                    scaleton Slide
                </div>
            }
        </>
    )
}

export default CollectionSlide