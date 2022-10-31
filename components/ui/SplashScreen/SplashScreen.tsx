
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import style from "./SplashScreen.module.css"

interface Props {
    loaded: boolean
}

const SplashScreen = ({loaded}: Props) => {
    return (
        <motion.div initial={{ x:"0%", opacity:1 }} animate={{ x: loaded ? "-100%" : "0%", opacity: loaded ? 0 : 1 }} transition={{ duration: 1.2, ease:"easeInOut" }} className='absolute top-0 left-0 right-0 h-screen w-screen z-50'>
            <div className='flex justify-center items-center h-full w-full bg-white'>
                <div className='absolute left-0 right-0 bottom-0 w-full z-10'>
                    <Image src={"/images/kousi-2.png"} layout="responsive" width="100%" priority={true} height="100%" alt={"background image"} />
                </div>
                <div className='z-20 absolute top-0 left-0 right-0 bottom-0'>
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