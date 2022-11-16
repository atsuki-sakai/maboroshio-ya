
import React, { useEffect } from 'react'
import { useUI } from '@components/context'
import { motion } from 'framer-motion';
import style from "./Drawer.module.css"
import { Close } from "@components/icon"
import LeftArrow from '@components/icon/LeftArrow';
import Search from '@components/icon/Search';


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
                    <div className='grid grid-cols-6'>
                        <div className='col-span-5 bg-white overflow-hidden rounded-tr-md rounded-br-md relative p-3'>
                            <div className='flex items-center justify-between bg-gray-700 rounded-md px-3 py-1 text-white'>
                                <h3 className="text-lg">メニュー</h3>
                                <div className='bg-white rounded-md' onClick={onDrawerClose}>
                                    <div className='px-3 flex items-center text-gray-700 '>
                                        <LeftArrow className='h-5 w-5'/>
                                        <span className='text-sm font-bold'>メニューを閉じる</span>
                                    </div>
                                </div>
                            </div>
                            <div className='my-3  text-sm font-bold space-y-5'>
                                <p className='text-xs translate-y-3'>商品検索</p>
                                <div className='flex items-center w-full'>
                                    <input id='search' type="text" placeholder='商品キーワード：黒豆' className='bg-indigo-50 h-10 rounded-full px-3 py-1 text-sm w-full' />
                                    <button className='w-12 h-10 bg-indigo-400 rounded-full ml-2 flex justify-center items-center' onClick={() => alert("search")}>
                                        <Search className='text-white h-6 w-6'/>
                                    </button>
                                </div>
                                <div className='h-full w-full space-y-5 bg-gray-100 py-2 px-3'>
                                    <div>
                                        マイページ
                                    </div>
                                    <div>
                                        会員登録 / ログイン
                                    </div>
                                    <div>
                                        まぼろし屋について
                                    </div>
                                    <div>
                                        ご利用ガイド
                                    </div>
                                    <div>
                                        まぼろし屋について
                                    </div>
                                    <div>
                                        レシピ特集
                                    </div>
                                </div>
                                <div>
                                    <p>商品カテゴリ</p>
                                    <div className='grid grid-cols-3 gap-2 mt-3 text-xs'>
                                        <div>
                                            <p>生鮮食品</p>
                                        </div>
                                        <div>
                                            <p>加工食品</p>
                                        </div>
                                        <div>
                                            <p>特産品</p>
                                        </div>
                                        <div>
                                            <p>生鮮食品</p>
                                        </div>
                                        <div>
                                            <p>加工食品</p>
                                        </div>
                                        <div>
                                            <p>特産品</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>価格帯で選ぶ</p>
                                    <div className='grid grid-cols-3 gap-2 mt-3 text-xs'>
                                        <div>
                                            <p>3000円以下</p>
                                        </div>
                                        <div>
                                            <p>3000円から〜</p>
                                        </div>
                                        <div>
                                            <p>5000円から〜</p>
                                        </div>
                                        <div>
                                            <p>7000円から〜</p>
                                        </div>
                                        <div>
                                            <p>10000円から〜</p>
                                        </div>
                                        <div>
                                            <p>15000円から〜</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 bg-black bg-opacity-70 h-screen' onClick={onDrawerClose}>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Drawer