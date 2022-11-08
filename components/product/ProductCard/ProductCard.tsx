import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@shopify/types/product'

interface Props {
    product: Product
}

const placeholderImage = "/images/product-image-placeholder.svg"

const ProductCard = ({product} : Props) => {
    return (
        <div key={product.id}>
            <Link href={`/products/${product.slug}`} passHref>
                <a>
                    <h4 className='text-sm font-serif text-gray-800 text-center pb-1'>
                        { product.name }
                    </h4>
                    {
                        product.images && <div className='shadow-md rounded-md relative'>
                                            <Image
                                                alt={product.name ?? "Product Image"}
                                                src={product.images[0]?.url ?? placeholderImage}
                                                height={320}
                                                width={320}
                                                quality="85"
                                                layout='responsive'
                                                className='rounded-md transform duration-1000 ease-in-out hover:scale-105'
                                            />
                                            {
                                                product.totalInventory === 0 ?
                                                <div className='absolute top-0 left-0'>
                                                    <div className='px-3 py-1 bg-gray-600 rounded-tl-md rounded-br-md'>
                                                        <p className='text-white text-xs'>売り切れ</p>
                                                    </div>
                                                </div>
                                                : <></>
                                            }
                                        </div>
                    }
                    <p className='text-center text-red-500 text-xs font-thin'><span className='text-base font-medium '>¥ { Number(product.priceRange.minVariantPrice.amount) }</span> 税込</p>
                </a>
            </Link>
        </div>
    )
}

export default ProductCard