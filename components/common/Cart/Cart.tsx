
import React, { useEffect } from 'react'
import { useUI } from '@components/context'
import { motion } from 'framer-motion';
import Image from 'next/image';
import style from "./Cart.module.css"

const Cart = () => {

    const { isCartOpen, onCartClose } = useUI();


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

    return (
            <motion.div
                initial={{ x:"100%", opacity:0.0 }}
                animate={{ x: isCartOpen ? "0%" : "100%", opacity: isCartOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 z-50"
            >
                <div className='w-screen h-full'>
                    <div className='grid grid-cols-5'>
                        <div className='col-span-2 bg-black bg-opacity-50 h-screen'>
                        <div className='flex justify-center h-full items-center'>
                                <p onClick={onCartClose} className={style.close_text}>カートを閉じる</p>
                            </div>
                        </div>
                        <div className='col-span-3 bg-transparent border rounded-tl-md rounded-bl-md p-5 overflow-hidden relative'>
                            <h3 className='font-serif text-xl font-bold'>お客様のカート</h3>
                            <div className="w-2/3 mx-auto bg-gray-300 h-[2px] mt-2 rounded-full"></div>
                            <div className='flex h-full w-full justify-center items-center'>
                                <p className={style.empty_text}>現在カート内に商品はございません。</p>
                            </div>
                            <div className='absolute left-0 right-0 top-0 -z-10 w-full h-full'>
                                <Image src={"/images/wasi.png"} layout="fill" width="100%" height="100%" alt={"background image"} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Cart