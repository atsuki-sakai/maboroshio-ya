

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUI, useCart } from '@components/context'
import { Cart, LineItem } from '@shopify/types/cart'
import { Minus, Plus } from "@components/icon"
import { checkoutToCart, getCheckoutId } from '@shopify/cart'
import { checkoutLineItemsUpdate, checkoutLineItemRemove } from '@shopify/cart'
import LoadCircle from '@components/icon/LoadCircle'

import { motion } from 'framer-motion'
import Trash from '@components/icon/Trash'

interface Props {
    item: LineItem
}


const placeholderImage = "/images/item-image-placeholder.svg"

const CartCard = ({ item }: Props) => {

    const { cart, updateCart } = useCart()
    const { onCartClose } = useUI();
    const [ quantity, setQuantity] = useState<string>(item.quantity.toString())
    const [ isUpdate, setIsUpdate ] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(parseInt(e.target.value) <= 0 || parseInt(e.target.value) >= 100) return;
        if(parseInt(e.target.value ) >= item.variant.quantityAvailable!){
            setQuantity(item.variant.quantityAvailable!.toString())
            return;
        }
        setQuantity(e.target.value)
    }

    const increment = () => {
        if(parseInt(quantity) >= 99) return;
        if(parseInt(quantity) >= item.variant.quantityAvailable!){
            setQuantity(item.variant.quantityAvailable!.toString())
            return;
        }
        const newQuantity = parseInt(quantity) + 1
        setQuantity(newQuantity.toString())
        updateQuantity(newQuantity)
    }

    const decriment = () => {
        if(parseInt(quantity) <= 1) return;
        const newQuantity = parseInt(quantity) - 1
        setQuantity(newQuantity.toString())
        updateQuantity(newQuantity)
    }

    const removeItem = async () => {
        setIsUpdate(true)
        try{
            const variable = {
                checkoutId: getCheckoutId() ?? cart.id,
                lineItemIds: [item.id]
            }
            const checkout = await checkoutLineItemRemove(variable)
            const newCart = checkoutToCart(checkout)
            updateCart(newCart)
        }catch(e){
            alert(e)
        }finally{
            setIsUpdate(false)
        }
    }

    const onKeydown = (key: string) => {
        switch (key) {
            case "Enter": {
                updateQuantity(parseInt(quantity === "" ? "1" : quantity))
                break;
            }
            default: {
                break;
            }
        }
    };

    const updateQuantity = async(quantity: number) => {
        setIsUpdate(true)
        try{
            const variable = {
                checkoutId: getCheckoutId()!,
                lineItems: {
                    id: item.id,
                    variantId: item.variantId,
                    quantity: quantity === 0 ? 1 : quantity
                }
            }
            const checkout = await checkoutLineItemsUpdate(variable);
            const newCart = checkoutToCart(checkout);
            updateCart(newCart);
        }catch(e) {
            alert(e)
        }finally {
            if(quantity === 0 ){
                setQuantity("1")
            }
            setIsUpdate(false)
        }
    }

    useEffect(() => {
        setQuantity(item.quantity.toString());
    }, [item.quantity])

    return (
        <div className={"relative"}>
            <div className='flex items-start mt-2 p-1'>
                <Link href={`/products/${item.path}`} passHref>
                    <a>
                        <div className='relative' onClick={onCartClose}>
                            <Image className="rounded-md shadow-md mb-2" src={item.variant.image?.url ?? placeholderImage} width={70} height={70} alt={"test"}/>
                            <div className='absolute -top-2 -right-2 h-fit w-fit bg-gray-700 rounded-full flex justify-center items-center shadow-md'>
                                <p className='text-white text-xs text-center font-sans scale-75'>在庫数 / <span className='font-bold'>{item.variant.quantityAvailable}</span></p>
                            </div>
                        </div>
                    </a>
                </Link>
                <div className='pl-4 flex-1'>
                    <h5 className='text-[15px]'>{item.name}</h5>
                    {
                        item.options && item.options![0].displayName === "Title" ? <></>:  <p className='text-sm text-gray-500'>{item.options![0].displayName} / {item.variant.name}</p>
                    }
                </div>
            </div>
            <div className='flex items-center'>
                <p className='w-full text-xs scale-90'>¥ <span className='text-lg font-bold'>{item.variant.price! * item.quantity}</span> 税別</p>
                <div className='relative w-full flex items-center justify-center space-x-1'>
                    <button onClick={increment} disabled={isUpdate}>
                        <Plus className={` h-6 w-6 transition duration-300 ease-in-out ${isUpdate ? "text-gray-400 scale-95": "text-green-400"} `}/>
                    </button>
                    <input className={`w-16 h-8 text-[17px] scale-90 ${isUpdate ? "bg-gray-100 text-gray-400": "bg-gray-50 text-gray-500"} text-center border rounded-md focus:outline-none`} id='quantity' type="number" value={quantity} onChange={handleChange} disabled={isUpdate} onKeyDown={(e) => onKeydown(e.key)}/>
                    <button onClick={decriment} disabled={isUpdate}>
                        <Minus className={` h-6 w-6 transition duration-300 ease-in-out ${isUpdate ? "text-gray-400 scale-95": "text-red-400"} `}/>
                    </button>
                    <motion.div initial={{ opacity: 0, width:0, height:12 }} animate={{ opacity: isUpdate? 1.0 : 0.0, width: isUpdate ? 12 : 0.0 }} className='absolute top-0 left-0 w-full h-full translate-x-10 -translate-y-0.5'>
                        <LoadCircle className="h-8 w-8 animate-spin text-blue-500"/>
                    </motion.div>
                </div>
                <button className={`ml-3 px-2 py-1 rounded-md ${isUpdate ? "text-gray-500 bg-gray-200 scale-95" : "text-red-500 bg-red-100"} w-18 text-center`} onClick={removeItem} disabled={isUpdate}>
                    <Trash className={`h-5 w-5`} />
                </button>
            </div>
            <div className='bg-gray-300 h-[1px] w-3/4 mx-auto my-3' />
        </div>
    )
}

export default CartCard