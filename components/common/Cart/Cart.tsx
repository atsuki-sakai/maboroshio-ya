
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useUI, useCart } from '@components/context'
import { motion } from 'framer-motion';
import Image from 'next/image';
import style from "./Cart.module.css"
import { LineItem } from '@shopify/types/cart';
import { ProductCard } from '@components/product';
import { JSON_CONFIG_FILENAME } from 'tslint/lib/configuration';


const placeholderImage = "/images/product-image-placeholder.svg"

const Cart = () => {

    const { isCartOpen, onCartClose } = useUI();
    const { cart } = useCart()

    const handle = (e: any) => {
        e.preventDefault();
    }
    useEffect(() => {
        if(isCartOpen){
            document.addEventListener('touchmove', handle, { passive: false })
            document.addEventListener('wheel', handle, { passive: false })
        }
        return (() => {
            if(isCartOpen){
                document.removeEventListener('touchmove', handle)
                document.removeEventListener('wheel', handle)
            }
        })
    }, [isCartOpen])

    console.log(cart.lineItems[0])

    return (
            <motion.div
                initial={{ x:"100%", opacity:0.0 }}
                animate={{ x: isCartOpen ? "0%" : "100%", opacity: isCartOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 z-50"
            >
                <div className='w-screen h-full'>
                    <div className='grid grid-cols-5'>
                        <div className='col-span-2 bg-black bg-opacity-70 h-screen'>
                        <div className='flex justify-center h-full items-center'>
                                <p onClick={onCartClose} className={style.close_text}>カートを閉じる</p>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-tl-md rounded-bl-md p-5 relative'>
                            <h3 className='font-serif text-xl font-bold'>お客様のカート</h3>
                            <div className='h-full w-full mt-8'>
                                {
                                    cart.lineItems.length === 0 ? <p className={style.empty_text}>現在カート内に商品はございません。</p>
                                    :  <div>
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
                                                                                item.options[0].displayName === "Title" ? <></>:  <p className='text-xs'>{item.options[0].displayName} / {item.variant.name}</p>
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
                                            <div className="font-serif mt-6">合計 : <span className="font-sans">¥{Math.floor(cart.totalPrice)}</span> <span className="text-xs">税込</span> </div>
                                            <div className='flex justify-center mt-4'>
                                                <div className='bg-green-500 px-6 py-1'>
                                                    <p className='text-white text-lg tracking-wider'>
                                                        商品を購入
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Cart