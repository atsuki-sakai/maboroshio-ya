

import { Search } from '@components/icon'
import { Container } from '@components/ui'
import { getProductTags, getProductTypes } from '@shopify/products'
import { generateApiUrl } from '@shopify/utils'
import React, { useState } from 'react'
import useSWR from 'swr'

const Detail = () => {



    const [ searchText, setSearchText ] = useState<string>("")
    const [ priceRange, setPriceRange ] = useState("0")

    const getTagsApiUrl = generateApiUrl({type: "GET_PRODUCT_TAGS"})
    const getTypesApiUrl = generateApiUrl({type: "GET_PRODUCT_TYPES"})
    const { data: tags } = useSWR(getTagsApiUrl, getProductTags)
    const { data: types } = useSWR(getTypesApiUrl, getProductTypes)

    return (
        <Container>
            <div className='px-8 py-4'>
                <p className='pt-5 text-sm font-bold my-3'>価格帯</p>
                    <p className='text-sm'>{priceRange}円以下の商品</p>
                    <div className='w-full'>
                    <input className='w-full' type="range" id='price-range' name='price-range' min={0} max={10000} step={1000} onInput={(e: any) => setPriceRange(e.target.value)}/>
                    <label htmlFor="price-range" className='hidden'>価格帯</label>
                    </div>
                <p className='pt-5 text-sm font-bold my-3'>商品キーワード</p>
                <div className='flex items-center w-full'>
                    <input id='search' type="text" onChange={(e) => setSearchText(e.target.value)} placeholder='他のキーワードで検索' className='bg-indigo-50 border shadow-sm border-indigo-300 h-10 rounded-full px-3 py-1 text-sm w-full focus:outline-none font-thin' />
                    <div className='w-14 h-11 bg-indigo-600 rounded-xl ml-4 flex justify-center items-center shadow-md'>
                        <Search className='text-white h-6 w-6'/>
                    </div>
                </div>
                <p className='pt-5 text-sm font-bold my-3'>商品タイプ</p>
                <div className='grid grid-flow-row-dense grid-cols-3 grid-row-3 gap-3 text-xs'>
                    {
                        types && types.length !== 0 ? types.map((type, index) => {
                            return <div key={index} className=""><p className='text-yellow-500 font-bold'>{type.node}</p></div>
                        }): <div>商品タイプはありません</div>
                    }
                </div>
                <p className='pt-5 text-sm font-bold my-3'>商品タグ</p>
                <div className='grid grid-flow-row-dense grid-cols-3 grid-row-3 gap-3 text-xs'>
                    {
                        tags && tags.length !== 0 ? tags.map((tag, index) => {
                            return  <div key={index} className=""><p className='text-yellow-500 font-bold'>{tag.node}</p></div>
                        }): <div>タグはありません</div>
                    }
                </div>
            </div>
        </Container>
    )
}

export default Detail