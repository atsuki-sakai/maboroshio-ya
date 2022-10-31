
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
                    <div className='grid grid-cols-5'>
                        <div className='col-span-3 bg-white rounded-tr-md rounded-br-md p-5'>
                            <h3 className={style.drawer_title}>目次</h3>
                            <div className='w-2/3 mx-auto bg-gray-300 h-[2px] my-3'></div>
                            <div className='my-6 font-serif space-y-3'>
                                <div>
                                    黒枝豆について
                                </div>
                                <div>
                                    商品一覧
                                </div>
                                <div>
                                    まぼろし屋について
                                </div>
                                <div>
                                    黒豆のレシピ集
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 bg-black bg-opacity-50 h-screen'>
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