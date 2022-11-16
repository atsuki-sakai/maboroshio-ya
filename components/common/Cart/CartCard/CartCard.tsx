

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUI, useCart } from '@components/context'
import { Cart, LineItem } from '@shopify/types/cart'
import { Minus, Plus } from "@components/icon"

interface Props {
    product: LineItem
}


const placeholderImage = "/images/product-image-placeholder.svg"

const CartCard = ({ product }: Props) => {
    const { onCartClose } = useUI();
    const { cart, updateCart } = useCart()

    return (
        <div>
            <div className='flex items-start mt-2 p-1'>
                <Link href={`/products/${product.path}`} passHref>
                    <a>
                        <div className='relative' onClick={onCartClose}>
                            <Image className="flex-1 rounded-md shadow-md mb-2" src={product.variant.image?.url ?? placeholderImage} width={70} height={70} alt={"test"}/>
                            <div className='absolute -top-1 -right-1 h-6 w-6 bg-gray-700 rounded-full flex justify-center items-center shadow-md'>
                                <p className='text-white text-sm text-center font-sans'>{product.quantity}</p>
                            </div>
                        </div>
                    </a>
                </Link>
                <div className='pl-4 flex-1'>
                    <h5 className='text-base'>{product.name}</h5>
                    {
                        product.options && product.options![0].displayName === "Title" ? <></>:  <p className='text-sm text-gray-500'>{product.options![0].displayName} / {product.variant.name}</p>
                    }
                </div>
            </div>
            <div className='flex items-center'>
                <p className='w-full text-xs scale-90'>¥ <span className='text-lg font-bold'>{product.variant.price! * product.quantity}</span> 税込</p>
                <div className='w-full flex items-center space-x-2'>
                    <button>
                        <Minus className='text-red-400 h-6 w-6'/>
                    </button>
                    <input className='w-12 h-5 text-sm bg-white text-gray-700 border text-center rounded-md' id='quantity' type="text" value={product.quantity} />
                    <button>
                        <Plus className='text-green-400 h-6 w-6'/>
                    </button>
                </div>
            </div>
            <div className='bg-gray-300 h-[1px] w-3/4 mx-auto my-3' />
        </div>
    )
}

export default CartCard