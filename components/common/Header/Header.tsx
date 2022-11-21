
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Marquee } from '@components/ui'
import { useUI, useScrollY } from '@components/context'
import style from "./Header.module.css"
import cn from "classnames"
import { Cart, Menu, Person } from '@components/icon'
import Search from '@components/icon/Search'

const Header = () => {

    const { onDrawerOpen, onCartOpen} = useUI()
    const scrollY = useScrollY()
    const changeBgColorY = 800;
    const [ changeBgolor, setChangeBgColor ] = useState(false)

    const headerClassName = cn(style.wrapper, {
        [style.hide]: !changeBgolor,
        [style.show]: changeBgolor
    })


    const switchBgColor = (y: number) => {
        if(y >= changeBgColorY){
            setChangeBgColor(true)
        }else{
            setChangeBgColor(false)
        }
    }

    useEffect(() => {
        switchBgColor(scrollY)
    },[scrollY])

    return (
        <header className={style.root}>
            <div className={headerClassName}>
                {/* MARQUEE */}
                <div className="bg-green-800">
                    <Marquee>
                        <div className={style.marquee}>
                            <p>丹波篠山の特産品を買うならまぼろし屋！</p>
                            <p>8000円以上お買い上げで送料無料</p>
                        </div>
                    </Marquee>
                </div>
                {/* MOBIEL HEADER */}
                <div className={style.mobile_container}>
                    <div className={style.mobile_menu}>
                        <button onClick={onDrawerOpen}>
                            <Menu/>
                        </button>
                        <button className='invisible'>
                            <Menu/>
                        </button>
                    </div>
                    <div className="">
                        <Link href={"/"} passHref>
                            <a>
                                <h1 className='text-lg font-bold'>まぼろし屋</h1>
                                <p className='text-[10px] scale-75 -translate-y-1 -translate-x-3'>丹波篠山の食料品卸の店</p>
                            </a>
                        </Link>
                    </div>
                    <div className={style.mobile_menu}>
                        <Link href='/account/login' passHref>
                            <a>
                                <Person/>
                            </a>
                        </Link>
                        <button onClick={onCartOpen}>
                            <Cart/>
                        </button>
                    </div>
                </div>
                {/* DESKTOP HEADER */}
                <div className={style.desktop_container}>
                    <div className='bg-white'>
                        <div className={style.desktop_menu_wrapper}>
                            <div>
                                <Link href={"/"} passHref>
                                    <a>
                                        <h1 className='text-2xl lg:text-4xl text-left'>まぼろし屋</h1>
                                        <p className='text-xs lg:text-sm text-left pl-1'>丹波篠山の食料品卸の店</p>
                                    </a>
                                </Link>
                            </div>
                            <div className={style.desktop_menu}>
                                <button>
                                    商品一覧
                                </button>
                                <button onClick={onCartOpen}>
                                    料理レシピ
                                </button>
                                <button onClick={onCartOpen}>
                                    まぼろし屋について
                                </button>
                                <button onClick={onDrawerOpen}>
                                    会員登録
                                </button>
                                <button onClick={onCartOpen}>
                                    お問い合わせ
                                </button>
                            </div>
                        </div>
                        <div className='pb-2 w-full shadow-md'>
                            <div className='flex items-center justify-end px-8'>
                                <div className='flex items-center space-x-3 mt-1 text-lg lg:text-xl'>
                                    <p>商品検索</p>
                                    <input className=' ml-2 bg-gray-100 rounded-md' type="text" />
                                    <Search/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header