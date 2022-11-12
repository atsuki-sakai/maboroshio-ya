
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useUI, useCart } from '@components/context'
import { motion } from 'framer-motion';
import Image from 'next/image';
import style from "./Cart.module.css"
import { LineItem } from '@shopify/types/cart';


const placeholderImage = "/images/product-image-placeholder.svg"

const Cart = () => {

    const { isCartOpen, onCartClose } = useUI();
    const { cart } = useCart()

    return (
            <motion.div
                initial={{ x:"100%", opacity:0.0 }}
                animate={{ x: isCartOpen ? "0%" : "100%", opacity: isCartOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto z-50"
            >
                <div className='w-screen h-full'>
                    <div className='grid grid-cols-5'>
                        <div className='col-span-2 bg-black bg-opacity-70 h-full' onClick={onCartClose}>
                            <div className="h-full flex justify-center pt-56 font-bold">
                                <p onClick={onCartClose} className={style.close_text}>カートを閉じる</p>
                            </div>
                        </div>
                        <div className='col-span-3 h-full bg-white rounded-tl-md rounded-bl-md p-3'>
                            <h3 className='font-serif text-xl font-bold'>お客様のカート</h3>
                            <div className='py-8 overflow-y-auto'>
                                    {
                                        cart.lineItems.map((item: LineItem) => {
                                            return (
                                                <div key={item.id} onClick={onCartClose}>
                                                    <Link  href={`/products/${item.path}`} passHref>
                                                        <a>
                                                            <div className='flex items-start font-serif mt-2 bg-gray-100 shadow-md p-1'>
                                                                <Image className="flex-1 rounded-md shadow-md mb-2" src={item.variant.image?.url ?? placeholderImage} width={70} height={70} alt={"test"}/>
                                                                <div className='pl-2 flex-1'>
                                                                    <h5 className='text-sm font-bold'>{item.name}</h5>
                                                                    {
                                                                        item.options && item.options![0].displayName === "Title" ? <></>:  <p className='text-xs'>{item.options![0].displayName} / {item.variant.name}</p>
                                                                    }
                                                                    <p className='text-xs mt-1'>数量 / {item.quantity}</p>
                                                                    <p className='text-xs'>¥ <span>{Math.floor(item.variant.price!)}</span> 税込</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="font-serif mt-6">
                                        合計 : <span className="font-sans text-xl">¥{Math.floor(cart.totalPrice)}</span><span className="text-xs">税込</span>
                                    </div>
                                    <div className='flex justify-center mt-4'>
                                        <div className='bg-black px-6 py-1' onClick={() => console.log('購入')}>
                                            <p className='text-white text-xl tracking-wider'>
                                                購入する
                                            </p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Cart