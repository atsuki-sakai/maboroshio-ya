
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
import { getProductTags, getProductTypes } from '@shopify/products';
import { Router, useRouter } from 'next/router';

const Drawer = () => {

    const { isDrawerOpen, onDrawerClose } = useUI();
    const router = useRouter()
    const { loggedCustomer } = useCustomerState()
    const [ showDetailSearch, setShowDetailSearch ] = useState(false)

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
    const [ productType, setProductType ] = useState<string>("")
    const [ productTag, setProductTag ] = useState<string>("")
    const [ priceRange, setPriceRange ] = useState<string>()

    const getTagsApiUrl = generateApiUrl({type: "GET_PRODUCT_TAGS"})
    const getTypesApiUrl = generateApiUrl({type: "GET_PRODUCT_TYPES"})
    const { data: tags } = useSWR(getTagsApiUrl, getProductTags)
    const { data: types } = useSWR(getTypesApiUrl, getProductTypes)

    const wordsToQuery = (words: string[], onlyTitle: boolean = false) => {
        const queryList =  words.map((word, index) => {
            if(index === 0){
                return `(${onlyTitle ? `title:${word}*`: `${word}*`})`
            }else{
                return ` OR (${onlyTitle ? `title:${word}*`: `${word}*`})`
            }
        })

        return queryList.length !== 0 ? queryList.reduce((sum, value) => sum += value) : ""
    }
    const detailSearch = async() => {

        const words = searchText.split(/(\s+)/).filter( e => e.trim().length > 0)
        let searchTextQuery = wordsToQuery(words)
        let priceRangeQuery = ""
        if(priceRange && parseInt(priceRange) >= 1000){
            if(searchTextQuery === ""){
                priceRangeQuery = `(variants.price:<${parseInt(priceRange)})`
            }else{
                priceRangeQuery = ` AND (variants.price:<${parseInt(priceRange)})`
            }
        }
        let productTypeQuery = ""
        let productTagQuery = ""
        if(productType){
            if(!searchTextQuery || !priceRangeQuery){
                productTypeQuery = `(product_type:${productType})`
            }else{
                productTypeQuery = ` AND (product_type:${productType})`
            }
        }
        if(productTag){
            if(!searchTextQuery || !priceRangeQuery || !productTypeQuery){
                productTagQuery = `(tag:${productTag})`
            }else{
                productTagQuery = ` AND (product_type:${productTag})`
            }
        }
        const graphQuery = searchTextQuery + priceRangeQuery + productTypeQuery + productTagQuery
        setPriceRange(undefined)
        setSearchText("")
        setProductTag("")
        setProductType("")
        router.push({
            pathname: `/products/search/query/${graphQuery}`,
            query: { graphQuery: graphQuery, categoryName: `${searchText} / ${priceRange}円以下 / ${productType} / ${productTag}` }
        })
        onDrawerClose()
    }

    return (
            <motion.div
                initial={{ x:"-100%", opacity:0.0 }}
                animate={{ x: isDrawerOpen ? "0%" : "-100%", opacity: isDrawerOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto"
            >
                <div className={style.root}>
                    <div className='grid grid-cols-6 h-full font-sans'>
                        <div className='col-span-5 bg-white rounded-tr-md rounded-br-md h-full  py-8 relative p-3'>
                            <div className='flex items-center justify-between bg-gray-700 rounded-md  px-3 py-1 text-white'>
                                <h3 className="dtext-lg">メニュー</h3>
                                <div className='bg-white rounded-md' onClick={onDrawerClose}>
                                    <div className='px-3 flex items-center text-gray-700 '>
                                        <LeftArrow className='h-5 w-5'/>
                                        <span className='text-sm font-bold'>メニューを閉じる</span>
                                    </div>
                                </div>
                            </div>
                            <div className='my-3 text-sm font-sans'>
                                <p className='text-base font-bold mb-1'>商品検索</p>
                                <div className='flex items-center w-full'>
                                    <input id='search' type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='商品キーワードで検索' className='bg-indigo-50 border shadow-sm border-indigo-300 h-10 rounded-md px-3 py-1 text-[18px] w-full focus:outline-none font-light tracking-wide' />
                                    <Link
                                        as={`/products/search/${searchText}`}
                                        href={{ pathname: `/products/search/[text]`, query:{ titleOnly: false, text: searchText } }}
                                        passHref
                                    >
                                        <a>
                                            <div className='w-12 h-11 bg-indigo-600 rounded-lg ml-4 flex justify-center items-center shadow-md'>
                                                <Search className='text-white h-6 w-6'/>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div className='px-3 py-0.5 mt-2 mb-4 bg-indigo-100 rounded-md border border-indigo-500 shadow-md w-fit'>
                                    <button className='text-sm text-indigo-500' onClick={() => setShowDetailSearch(!showDetailSearch)}>
                                        { showDetailSearch ? "閉じる": "詳細で絞り込む" }
                                    </button>
                                </div>
                                <div className={`${ showDetailSearch ? "border p-3 rounded-xl shadow-xl mb-8": "hidden" }`}>
                                    <p className='text-sm font-bold'>価格帯</p>
                                        <p className='text-sm mt-2'><span className='text-lg font-bold'>{priceRange}円</span>以下の商品</p>
                                        <div className='w-full my-2'>
                                            <input className='w-full' value={priceRange ?? 0} type="range" id='price-range' name='price-range' min={0} max={10000} step={1000} onInput={(e: any) => setPriceRange(e.target.value)}/>
                                            <label htmlFor="price-range" className='hidden'>価格帯</label>
                                        </div>
                                    <p className='text-sm font-bold pt-3'>商品タイプ</p>
                                    <div className='grid grid-cols-3 gap-3 text-xs py-2'>
                                        {
                                            types && types.length !== 0 ? types.map((type, index) => {
                                                return <b key={index} className={` ${type.node.length > 7 ? "col-span-2" : ""} text-center rounded-full bg-indigo-600 shadow-md`} onClick={() => setProductType(type.node)}><p className='text-white font-bold'>{type.node}</p></b>
                                            }): <div className='whitespace-nowrap text-gray-500'>商品タイプはありません</div>
                                        }
                                    </div>
                                    <p className='text-sm font-bold pt-3'>商品タグ</p>
                                    <div className='grid grid-flow-row-dense grid-cols-3 grid-row-3 gap-3 text-xs py-2'>
                                        {
                                            tags && tags.length !== 0 ? tags.map((tag, index) => {
                                                return  <button key={index} className={` ${tag.node.length > 7 ? "col-span-2" : ""} text-center  bg-indigo-600 rounded-full shadow-md`} onClick={() => setProductTag(tag.node)}><p className='text-white font-bold'>{tag.node}</p></button>
                                            }): <div className='whitespace-nowrap text-gray-500'>タグはありません</div>
                                        }
                                    </div>
                                    {
                                        searchText || priceRange && priceRange !== "0"  ?  <div className='border rounded-md shadow-md bg-gray-100 text-gray-500 mt-3 p-2'>
                                                                        <p className='text-xs font-bold mb-1 text-black'>検索条件</p>
                                                                        {
                                                                            searchText && <p className='text-xs'>検索ワード <span className='text-sm'>{searchText}</span></p>
                                                                        }
                                                                        {
                                                                            priceRange && priceRange !== "0" ?  <p className='text-xs'><span className='text-sm'>{priceRange}</span>円以下の商品</p>: null
                                                                        }
                                                                        {
                                                                            productType && <p className='text-xs'>カテゴリ　<span className='text-sm'>{productType}</span></p>
                                                                        }
                                                                        {
                                                                            productTag && <p className='text-xs'>タグ　<span className='text-sm'>{productTag}</span></p>
                                                                        }
                                                                    </div>: null
                                    }
                                    <div className='w-full pt-6 flex justify-center'>
                                        <button className='text-white w-fit px-3 py-1 rounded-md shadow-md bg-blue-500' onClick={detailSearch}>
                                            上記の条件で検索する
                                        </button>
                                    </div>
                                </div>
                                <div className='h-full w-full space-y-3 font-bold bg-gradient-to-tr from-amber-500 to-yellow-400 text-white  p-3 rounded-md shadow-lg'>
                                    <div onClick={onDrawerClose}>
                                        <Link href={` ${ loggedCustomer ? "/customer/my-page" : "/customer/login"} `} passHref>
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
                                <div className='py-3 mt-3'>
                                    <p className='text-base font-bold'>商品コレクション</p>
                                    <div className='grid grid-cols-3 gap-x-5 gap-y-4 mt-4 text-xs'>
                                        {
                                            collections && collections.map((collection, index) => {
                                                return <div key={index} onClick={onDrawerClose}>
                                                            <Link href={`/products/collection/${collection.handle}`} passHref>
                                                                <a>
                                                                    <div className='px-2 py-0.5 border  rounded-full bg-gray-100 shadow-md'>
                                                                        <p className='text-center font-bold'>
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
                                <div className="pb-3 mt-3">
                                    <p className='text-base font-bold'>価格帯で選ぶ</p>
                                    <div className='grid grid-cols-3 gap-2 mt-3 text-xs'>
                                        <div>
                                            <Link
                                                as={`/products/search/query/${"max-of-price-1000"}`}
                                                href={{ pathname: `/products/search/query/[query]`, query: { graphQuery: `(variants.price:<1000)`, categoryName: "1000円以下の商品" }}}
                                                passHref
                                            >
                                                <a>
                                                    <div className='px-2 py-0.5 rounded-full shadow-md bg-gray-700'>
                                                        <p className='text-white text-center font-bold'>
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
                                                    <div className='px-2 py-0.5 rounded-full shadow-md bg-gray-700'>
                                                        <p className='text-white text-center font-bold'>
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
                                                    <div className='px-2 py-0.5 rounded-full shadow-md bg-gray-700'>
                                                        <p className='text-white text-center font-bold'>
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
                                                    <div className='px-2 py-0.5 rounded-full shadow-md bg-gray-700'>
                                                        <p className='text-white text-center font-bold'>
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
                                                    <div className='px-2 py-0.5 rounded-full shadow-md bg-gray-700'>
                                                        <p className='text-white text-center font-bold'>
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
                                                    <div className='px-2 py-0.5 rounded-full shadow-md bg-gray-700'>
                                                        <p className='text-white text-center font-bold'>
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
                        <div className='col-span-1 bg-black bg-opacity-70 h-full' onClick={onDrawerClose}>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Drawer