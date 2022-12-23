import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@shopify/types/product'
import { truncate } from '@lib/truncate'
import { ProductReviewInfo } from '@shopify/types/review'
import { numberToStar } from '@lib/number-to-star'
import { Cart } from '@components/icon'
interface Props {
    product: Product
    productReviewInfo: ProductReviewInfo | null
}

const placeholderImage = "/images/product-image-placeholder.svg"

const ProductCard = ({product, productReviewInfo} : Props) => {
    return (
        <div key={product.id} className="rounded-md overflow-hidden">
            <Link href={`/products/${product.slug}`} passHref>
                <a>
                    {
                        product.images && <div className='relative'>
                                            <Image
                                                alt={product.name ?? "Product Image"}
                                                src={product.images[0].url ?? placeholderImage}
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
                    <div className='w-full flex justify-end items-center'>
                        <div className='text-yellow-500'>{numberToStar(productReviewInfo?.score ?? 0)}</div>
                        <div className='flex items-end justify-center font-sans'>
                            <p className='text-sm text-blue-500 ml-3'>{productReviewInfo?.numberOfTotalReview ?? 0}</p>
                            <p className='text-black text-xs scale-75'> 件</p>
                        </div>
                    </div>
                    <h4 className='text-xs font-sans text-gray-800 text-center'>
                        { truncate(product.name, 25) }
                    </h4>
                    <p className='text-end text-red-500 text-xs font-thin'><span className='text-lg font-medium '>¥ { Number(product.priceRange.minVariantPrice.amount) }</span> 税込</p>
                    <div className='flex mt-2 shadow-md'>
                        <button className='bg-blue-500 w-full flex items-center justify-center rounded-md shadow-md'>
                            <p className='text-xs text-white font-bold'>
                                今すぐ購入
                            </p>
                            <Cart className='pl-2 h-7 w-7 text-white'/>
                        </button>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default ProductCard