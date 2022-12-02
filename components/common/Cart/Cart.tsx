
import React, { useEffect, useState } from 'react'
import { useUI, useCart } from '@components/context'
import CartCard from './CartCard';
import { Check, LoadCircle, RightArrow } from '@components/icon';
import { useCustomerState } from '@components/context';
import { getCheckout, getCheckoutId } from '@shopify/cart';
import { checkoutShippingAddressUpdate } from "@shopify/cart"
import { SHOPIFY_STORE_DOMAIN } from '@shopify/const';

import { motion } from 'framer-motion';
import type { LineItem } from '@shopify/types/cart';
import { AlertDialog } from '@components/ui';


type Address =  {
    address1: string
    address2: string
    city: string
    company: string
    country: string
    firstName: string
    lastName: string
    phone: string
    province: string
    zip: string
}

const Cart = () => {

    const { isCartOpen, onCartClose } = useUI();
    const { loggedCustomer } = useCustomerState();
    const { cart } = useCart()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorMessage, setErrorMessage] = useState("")
    const shippingFreeCost = 10000
    const shippingFree = (shippingFreeCost - cart.lineItemsSubtotalPrice) > 0

    const cartTotalQuantity = () => cart.lineItems.map((item: LineItem) => item.quantity).reduce((sum, element) => sum + element, 0)

    const setupCheckoutShippingAddress = async() => {
        if(loggedCustomer?.defaultAddress){
            const updateAddress: Address = {
                address1: loggedCustomer.defaultAddress.address1 ?? "",
                address2: loggedCustomer.defaultAddress.address2 ?? "",
                city: loggedCustomer.defaultAddress.city ?? "",
                company: loggedCustomer.defaultAddress.company ?? "",
                country: loggedCustomer.defaultAddress.country ?? "",
                firstName: loggedCustomer.defaultAddress.firstName ?? "",
                lastName: loggedCustomer.defaultAddress.lastName ?? "",
                phone: loggedCustomer.defaultAddress.phone ?? "",
                province: loggedCustomer.defaultAddress.province ?? "",
                zip: loggedCustomer.defaultAddress.zip ?? ""
            }
            await checkoutShippingAddressUpdate(getCheckoutId()!, updateAddress);
        }
    }

    const checkoutCart = async() => {
        try{
            setIsLoading(true)
            await setupCheckoutShippingAddress()
            const checkoutParam = getCheckoutId()?.split("Checkout/")[1].split('?')[0]
            const checkoutUrl = `${SHOPIFY_STORE_DOMAIN}/checkouts/co/${checkoutParam}/information`
            const checkout = await getCheckout(getCheckoutId()!)
            document.location.href = loggedCustomer ? checkoutUrl: checkout.webUrl
        }catch(e: any){
            setErrorMessage(e.message)
        }
    }

    useEffect(() => {
        return () => {
            setIsLoading(false)
        }
    })

    return (
            <motion.div
                initial={{ x:"100%", opacity:0.0 }}
                animate={{ x: isCartOpen ? "0%" : "100%", opacity: isCartOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto z-50"
            >
                {
                    errorMessage ? <AlertDialog title='ERROR' message={errorMessage} onClose={() => setErrorMessage('')}/>: <></> 
                }
                <div className="w-screen h-screen">
                    <div className='grid grid-cols-6 h-full'>
                        <div className={`col-span-1 h-full transition duration-300 ease-in-out ${isCartOpen ? "bg-black bg-opacity-50": ""}`} onClick={onCartClose} />
                        <div className='col-span-5 h-full bg-white rounded-tl-md rounded-bl-md p-3'>
                            <div className='flex items-center justify-between bg-gray-700 shadow-md rounded-md px-3 py-2'>
                                <h3 className=' text-white'>お客様のカート</h3>
                                <div className='bg-white rounded-md'>
                                    <button className='flex items-center text-gray-800 px-3 py-1' onClick={onCartClose}>
                                        <span className='text-xs font-bold'>カートを閉じる</span><RightArrow className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <div className='w-full flex items-center justify-end rounded-md text-center'>
                                    {
                                        shippingFree ? <p className='bg-indigo-100 text-xs text-indigo-600 rounded-md px-2 py-0.5'>あと<span className='text-base font-bold'>¥{shippingFreeCost - cart.lineItemsSubtotalPrice}</span>で<span className='text-sm font-bold'>送料無料</span></p> : <div className='bg-green-100 flex items-center space-x-2 px-3 py-1 rounded-md'><Check className='text-green-500 w-5 h-5'/><span className='text-green-500 text-sm font-bold'>送料無料</span></div>
                                    }
                                </div>
                                <div className='grid grid-cols-7 items-end justify-between mt-2 py-2 px-2 rounded-md bg-gray-100'>
                                    <div className="col-span-4 text-gray-500 text-sm font-noto">
                                        合計 <span className="font-sans text-black text-3xl">¥{Math.floor(cart.lineItemsSubtotalPrice)}</span>
                                    </div>
                                    <div className='col-span-3'>
                                        <p className='text-sm text-end text-gray-500'><span className='text-lg font-semibold text-black'>{cartTotalQuantity()}</span> 点の商品</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-1 flex items-center justify-end'>
                                {
                                    shippingFree ? <p className='text-xs text-blue-600 bg-blue-100 w-fit rounded-md px-3 py-1'>送料は次のステップで計算されます</p> : <></>
                                }
                            </div>
                            <button className='flex justify-center mt-3 w-full bg-gradient-to-tr to-green-500 from-lime-400 py-2 rounded-md' onClick={ checkoutCart } disabled={cart.lineItems.length === 0 || isLoading}>
                                <div className='flex items-center justify-between'>
                                    <p className='text-white text-lg font-bold text-center tracking-wider'>
                                        {cart.lineItems.length === 0 ? "カートは空です": isLoading ? "決済処理中" : "商品を購入する"}
                                    </p>
                                    <motion.div className="ml-2 -translate-y-1.5" initial={{ opacity:0, height:12, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                                    <LoadCircle className='text-white h-6 w-6 animate-spin'/>
                                    </motion.div>
                                </div>
                            </button>
                            <div className='overflow-y-auto my-5 p-1'>
                                    {
                                        cart.lineItems.length === 0
                                        ? <div>
                                            <p className='py-6 text-center font-bold text-gray-400'>カート内に商品はありません</p>
                                        </div>
                                        : cart.lineItems.map((item: LineItem) => {
                                            return <CartCard key={item.id} item={item}/>
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Cart