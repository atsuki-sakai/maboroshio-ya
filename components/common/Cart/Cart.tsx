
import React, { useEffect } from 'react'
import { useUI } from '@components/context'
import { motion } from 'framer-motion';
import { Close } from '@components/icon';

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
                document.removeEventListener('touch', handle)
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
                <div className='w-screen h-screen'>
                    <div className='flex'>
                        <div className='flex-1 bg-black bg-opacity-50 h-screen' onClick={onCartClose}>
                        </div>
                        <div className='flex-1 bg-white rounded-tl-md rounded-bl-md p-5'>
                            <div className='flex items-center justify-between'>
                                <p>カート</p>
                                <button onClick={onCartClose}>
                                    <Close className='h-6 w-6'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Cart