
import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className=''>
            <div className='p-3'>

                <div className="-translate-x-4 font-serif">
                    <Link href={"/"} passHref>
                        <a>
                            <h1 className='text-lg font-bold pl-4'>まぼろし屋</h1>
                            <p className='text-[10px] scale-90 -translate-y-1'>丹波篠山の食料品卸の店</p>
                        </a>
                    </Link>
                </div>
                <div className='py-2 text-xs font-noto text-gray-500'>
                    <p>〒: 669-2133</p>
                    <p>TEL: 090-1234-5678</p>
                    <p>Adress: 兵庫県丹波篠山市今田町下小野原59-45</p>
                    <p>E-Mail: suport@multipla.io</p>
                </div>
                <div className='grid grid-cols-2 gap-4 text-xs py-4'>
                    <div className='w-full text-blue-500 text-center underline'>
                        <Link href={"/"}>
                            <a>プライバシーポリシー</a>
                        </Link>
                    </div>
                    <div className='w-full text-blue-500 text-center underline'>
                        <Link href={"/"}>
                            <a>特定商取引法表記</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center text-xs text-center text-white font-thin bg-gray-700 px-3 py-1'>
                <p>copyright©︎ Multipla.io Products Associated all rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer