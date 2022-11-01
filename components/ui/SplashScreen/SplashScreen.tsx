
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import style from "./SplashScreen.module.css"
import { useLoaded } from '@components/context'


const SplashScreen = () => {

    const { isLoaded, onLoaded } = useLoaded();
    const handle = (e: any) => {
        e.preventDefault();
    }

    useEffect(() => {
        if(window.location.pathname !== "/"){
            onLoaded()
        }
        if(!isLoaded){
            document.addEventListener('touchmove', handle, { passive: false })
            document.addEventListener('wheel', handle, { passive: false })
        }
        return (() => {
            if(!isLoaded){
                document.removeEventListener('touchmove', handle)
                document.removeEventListener('wheel', handle)
            }
        })
    }, [isLoaded])
    return (
        <motion.div initial={{ y:"0%", opacity:1 }} animate={{ y: isLoaded ? "-100%" : "0%", opacity: isLoaded ? 0 : 1 }} transition={{ duration: 0.8, ease:"easeInOut", delay: 0.2 }} className='absolute top-0 left-0 right-0 h-screen w-screen z-50'>
            <div className='flex justify-center items-center h-full w-full bg-white'>
                <div className='z-10 absolute top-0 left-0 right-0 bottom-0'>
                    <div className='h-full w-full flex justify-center items-center'>
                        <p className={style.sub_title}>丹波篠山</p>
                        <p className={style.title} >まぼろし屋</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SplashScreen