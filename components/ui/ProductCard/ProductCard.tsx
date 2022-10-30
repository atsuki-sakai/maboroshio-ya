import React from 'react'
import Image from 'next/image'

import { Product } from '@shopify/types/product'


interface Props {
    product: Product
}

const placeholderImage = "/images/product-image-placeholder.svg"

const ProductCard = ({product} : Props) => {
    return (
        <div key={product.id}>
            <h4 className='font-bold text-2xl '>
                { product.name }
            </h4>
            <span className='text-sm text-red-500'>{product.vendor}</span>
            {
                product.images && <Image
                                    alt={product.name ?? "Product Image"}
                                    src={product.images[0]?.url ?? placeholderImage}
                                    height={320}
                                    width={320}
                                    quality="85"
                                    layout='fixed'
                                    className='z-0'
                                />
            }
            <p className='font-thin text-gray-500'>{ product.description }</p>
        </div>
    )
}

export default ProductCard