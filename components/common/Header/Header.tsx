
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Marquee } from '@components/ui'
import { useUI, useScrollY } from '@components/context'
import style from "./Header.module.css"
import cn from "classnames"

const Header = () => {

    const { onDrawerOpen, onCartOpen} = useUI()
    const scrollY = useScrollY()
    const changeBgColorY = 700;
    const [ changeBgolor, setChangeBgColor ] = useState(false)

    const titleWrapperClassNames = cn(style.title_wrapper,{
        [style.hide]: changeBgolor,
        [style.show]: !changeBgolor
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
            <div className={style.marquee}>
                <Marquee>
                    <div className={style.marquee_container}>
                        <p>丹波篠山の特産品を買うならまぼろし屋！</p>
                        <p>8000円以上お買い上げで送料無料</p>
                    </div>
                </Marquee>
            </div>
            <div className={style.title_container}>
                <Link href={"/"} passHref>
                    <a>
                        <div className={titleWrapperClassNames}>
                            <h1 className={style.title}>
                                まぼろし屋
                            </h1>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="hidden md:block fixed bottom-12 left-8 z-30">
                <div className='flex items-center space-x-6 bg-gray-800 px-12 py-4 text-white'>
                    <button>まぼろし屋について</button>
                    <button>レシピ一覧</button>
                    <button>商品一覧</button>
                    <button>黒枝豆について</button>
                    <button>会員登録</button>
                    <button>カート</button>
                </div>
            </div>
            <div className={style.mobile_menu_container}>
                <div className={style.menu}>
                    <button onClick={onDrawerOpen}>
                        {/* <Menu className={style.icon}/> */}
                        目次
                    </button>
                    <button onClick={onCartOpen}>
                        {/* <Cart className={style.icon}/> */}
                        <p className='break-word'>カート</p>
                    </button>
                    <button onClick={() => window.location.href = "/account/login"}>
                        {/* <Person className={style.icon}/> */}
                        会員登録
                    </button>
                    <button>
                        <p className='invisible'>ダミ-</p>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header

// <div className={""}>
//                     <button>
//                         黒枝豆について
//                     </button>
//                     <button>
//                         カート
//                     </button>
//                     <button>
//                         ログイン
//                     </button>
//                     <button>
//                         会員登録
//                     </button>
//                 </div>