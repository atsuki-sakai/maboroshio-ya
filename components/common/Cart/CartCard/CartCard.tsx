

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUI, useCart } from '@components/context'
import { Cart, LineItem } from '@shopify/types/cart'
import { Minus, Plus } from "@components/icon"
import { checkoutToCart, getCheckoutId } from '@shopify/cart'
import checkoutLineItemsUpdate from '@shopify/cart/checkout-line-items-update'

interface Props {
    product: LineItem
}


const placeholderImage = "/images/product-image-placeholder.svg"

const CartCard = ({ product }: Props) => {

    const { cart, updateCart } = useCart()
    const lineItem:LineItem = cart.lineItems.filter((lineItem: LineItem) => lineItem.variantId === product.variantId)[0]
    const { onCartClose } = useUI();
    const [quantity, setQuantity] = useState<number>(product.quantity)
    const [ isUpdate, setIsUpdate ] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(parseInt(e.target.value) <= 0 || parseInt(e.target.value) >= 100) return;
        setQuantity(parseInt(e.target.value) ?? 1)
    }
    
    const increment = () => {
        if(quantity >= 99 || isUpdate) return;
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        updateQuantity(newQuantity)
    }

    const decriment = () => {
        if(quantity <= 1 || isUpdate) return;
        const newQuantity = quantity - 1
        setQuantity(newQuantity)
        updateQuantity(newQuantity)
    }

    const updateQuantity = async(quantity: number) => {
        console.log("update q: ", quantity)
        setIsUpdate(true)
        try{
            const variable = {
                checkoutId: getCheckoutId() ?? cart.id,
                lineItems: {
                    id: lineItem.id,
                    variantId: product.variantId,
                    quantity: quantity
                }
            }
            console.log('variable: ', variable)
            const checkout = await checkoutLineItemsUpdate(variable);
            const newCart = checkoutToCart(checkout);
            updateCart(newCart);
        }catch(e) {
            alert(e)
        }finally {
            setIsUpdate(false)
        }
    }

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
                <div className='relative w-full flex items-center justify-center space-x-3'>
                    <button onClick={decriment} disabled={isUpdate}>
                        <Minus className='text-red-400 h-6 w-6'/>
                    </button>
                    <input className='w-12 h-6 text-[17px] scale-80 bg-white text-gray-700 border text-center rounded-md focus:outline-none' id='quantity' type="text" value={quantity} onChange={handleChange} disabled={isUpdate} />
                    <button onClick={increment} disabled={isUpdate}>
                        <Plus className='text-green-400 h-6 w-6'/>
                    </button>
                </div>
            </div>
            <div className='bg-gray-300 h-[1px] w-3/4 mx-auto my-3' />
        </div>
    )
}

export default CartCard