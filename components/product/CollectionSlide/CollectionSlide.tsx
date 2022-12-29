
import { Splide, SplideSlide } from '@splidejs/react-splide'
import React from 'react'
import ProductCard from '../ProductCard'
import type { Collection, Product } from '@shopify/shema'
import { truncate } from '@lib/truncate'
import { normalizeProduct } from '@shopify/utils'
import useSWR from 'swr'
import { firebaseApiUrl } from '@firebase/utils'
import idConverter from '@lib/id-converter'

interface Props {
    collection?: Collection
}

const CollectionSlide = ({collection}: Props) => {

    const products = collection?.products.edges.map(({node: product}) => normalizeProduct(product))
    const getProductReviewInfosApiUrl = firebaseApiUrl({type: "GET_PRODUCT_REVIEW_INFO"})

    const getProductReviewInfosFetcher = async(url: string, products: Product[]) => {
        const productReviewInfos = await Promise.all(
            products.map( async(product) => {
                const response = await fetch(url, {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify({
                        productId: idConverter({type: "PRODUCT"}, product.id)
                    })
                })
                const data = await response.json()
                return data.productReviewInfo
            })
        )
        console.log(productReviewInfos)
        return productReviewInfos
    }
    const { data: productInfos } = useSWR([getProductReviewInfosApiUrl, products], collection ? getProductReviewInfosFetcher: null)

    if(!productInfos){
        return <div className='py-16 px-8'>Loading</div>
    }
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
                                            <ProductCard product={normalizeProduct(product)} productReviewInfo={productInfos[index]}/>
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