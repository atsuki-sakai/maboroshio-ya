
import React from 'react'
import { motion } from 'framer-motion'
import style from "./SplashScreen.module.css"

interface Props {
    loaded: boolean
}

const SplashScreen = ({loaded}: Props) => {
    return (
        <motion.div initial={{ x:"0%", opacity:1 }} animate={{ x: loaded ? "-100%" : "0%", opacity: loaded ? 0 : 1 }} transition={{ duration: 0.6, ease:"easeInOut" }} className='absolute top-0 left-0 right-0 h-screen w-screen z-50'>
            <div className='flex justify-center items-center h-full w-full bg-gradient-to-tl to-teal-900 from-gray-900'>
                <div>
                    <p className={style.title}>丹波篠山　まぼろし屋</p>
                </div>
            </div>
        </motion.div>
    )
}

export default SplashScreen