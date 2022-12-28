
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useCustomerState, useUI } from '@components/context'
import { motion } from 'framer-motion';
import style from "./Drawer.module.css"
import LeftArrow from '@components/icon/LeftArrow';
import Search from '@components/icon/Search';
import useSWR from 'swr';
import { generateApiUrl } from '@shopify/utils';
import { Collection } from "@shopify/shema"
import { Menu, Person, Trash } from '@components/icon';

const Drawer = () => {

    const { isDrawerOpen, onDrawerClose } = useUI();
    const { loggedCustomer } = useCustomerState()
    const handle = (e: any) => {
        e.preventDefault();
    }

    const getAllCollectionsApiUrl = generateApiUrl({type: "GET_ALL_COLLECTIONS"})
    const collectionsFeacher = async(url: string): Promise<Collection[]> => {
        const response = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                limit: 6
            })
        }).then((res) => {
            return res.json()
        }).catch((e) => {
            throw Error(e.message)
        })
        return response.data.collections.edges.map((edge: any) => edge.node)
    }
    const { data: collections } = useSWR(getAllCollectionsApiUrl, collectionsFeacher)

    const [ searchText, setSearchText ] = useState<string>("")

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
                    <div className='grid grid-cols-6 font-sans'>
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
                            <div className='my-3  text-sm space-y-5'>
                                <p className='text-sm translate-y-3 font-bold'>商品検索</p>
                                <div className='flex items-center w-full'>
                                    <input id='search' type="text" onChange={(e) => setSearchText(e.target.value)} placeholder='商品キーワードで検索' className='bg-indigo-50 border shadow-sm border-indigo-300 h-10 rounded-full px-3 py-1 text-sm w-full focus:outline-none font-thin' />
                                    <Link
                                        as={`/products/search/${searchText}`}
                                        href={{ pathname: `/products/search/[text]`, query:{ titleOnly: false, text: searchText } }}
                                        passHref
                                    >
                                        <a>
                                            <div className='w-14 h-11 bg-indigo-600 rounded-xl ml-4 flex justify-center items-center shadow-md'>
                                                <Search className='text-white h-6 w-6'/>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div className='h-full w-full space-y-5 font-bold bg-gray-100 p-3 rounded-md shadow-sm'>
                                    <div onClick={onDrawerClose}>
                                        <Link href={` ${loggedCustomer ? "/customer/login" : "/customer/my-page"} `} passHref>
                                            <a>
                                                <div className='flex items-center'>
                                                    <Person/>
                                                    <p className='pl-1'>
                                                        { loggedCustomer ? "マイページ" : "会員登録する" }
                                                    </p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div onClick={onDrawerClose}>
                                        <Link href={`/`} passHref>
                                            <a>
                                                <div className='flex items-center'>
                                                    <Trash/>
                                                    <p className='pl-1'>
                                                        まぼろし屋について
                                                    </p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div onClick={onDrawerClose}>
                                        <Link href={`/`} passHref>
                                            <a>
                                                <div className='flex items-center'>
                                                    <Menu/>
                                                    <p className='pl-1'>
                                                        ご利用ガイド
                                                    </p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div onClick={onDrawerClose}>
                                        <Link href={`/`} passHref>
                                            <a>
                                                <div className='flex items-center'>
                                                    <Search/>
                                                    <p className='pl-1'>
                                                        レシピ特集
                                                    </p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <p className='text-sm font-bold'>商品コレクション</p>
                                    <div className='grid grid-cols-3 gap-x-5 gap-y-4 mt-4 text-xs'>
                                        {
                                            collections && collections.map((collection, index) => {
                                                return <div key={index} onClick={onDrawerClose}>
                                                            <Link href={`/products/collection/${collection.handle}`} passHref>
                                                                <a>
                                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                                        <p className='text-yellow-500 text-center font-bold'>
                                                                            {collection.title}
                                                                        </p>
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="pb-3">
                                    <p className='text-sm font-bold'>価格帯で選ぶ</p>
                                    <div className='grid grid-cols-3 gap-2 mt-3 text-xs'>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"max-of-price-1000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:<1000)`, categoryName: "1000円以下の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                        <p className='text-yellow-500 text-center font-bold'>
                                                            1000円以下から〜
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"max-of-price-3000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:<3000)`, categoryName: "3000円以下の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                        <p className='text-yellow-500 text-center font-bold'>
                                                            3000円以下から〜
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"max-of-price-35000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:<5000)`, categoryName: "5000円以下の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                        <p className='text-yellow-500 text-center font-bold'>
                                                            5000円以下から〜
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"under-of-price-1000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:>1000)`, categoryName: "1000円以上の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                        <p className='text-yellow-500 text-center font-bold'>
                                                            1000円以上から〜
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"under-of-price-3000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:>3000)`, categoryName: "3000円以上の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                        <p className='text-yellow-500 text-center font-bold'>
                                                            30000円以上から〜
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"under-of-price-5000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:>5000)`, categoryName: "5000円以上の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='bg-yellow-100 px-2 py-0.5 rounded-full shadow-sm'>
                                                        <p className='text-yellow-500 text-center font-bold'>
                                                            5000円以上から〜
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
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