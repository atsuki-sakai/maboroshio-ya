
import React, { useEffect } from 'react'
import { useUI } from '@components/context'
import { motion } from 'framer-motion';
import style from "./Drawer.module.css"


const Drawer = () => {
    const { isDrawerOpen, onDrawerClose } = useUI();

    const handle = (e: any) => {
        e.preventDefault();
    }
    useEffect(() => {
        if(isDrawerOpen){
            document.addEventListener('touchmove', handle, { passive: false })
            document.addEventListener('wheel', handle, { passive: false })
        }
        return (() => {
            if(isDrawerOpen){
                document.removeEventListener('touchmove', handle)
                document.removeEventListener('wheel', handle)
            }
        })
    }, [isDrawerOpen])

    return (
            <motion.div
                initial={{ x:"-100%", opacity:0.0 }}
                animate={{ x: isDrawerOpen ? "0%" : "-100%", opacity: isDrawerOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 z-50"
            >
                <div className={style.root}>
                    <div className='flex'>
                        <div className='flex-1 bg-white rounded-tr-md rounded-br-md p-5'>
                            <div className='flex items-center justify-between'>
                                <h3 className={style.drawer_title}>目次</h3>
                            </div>
                        </div>
                        <div className='flex-1 bg-black bg-opacity-50 h-screen'>
                            <div className='flex justify-center h-full items-center'>
                                <p onClick={onDrawerClose} className={style.close_text}>目次を閉じる</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Drawer