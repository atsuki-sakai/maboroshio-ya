
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { generateApiUrl, normalizeProduct } from '@shopify/utils'
import { ProductConnection } from '@shopify/shema'
import { Container, ErrorView, LoadingView } from '@components/ui'
import { ProductCard } from '@components/product'
import { Search } from '@components/icon'
import Link from 'next/link'

const SearchProduct = () => {

  const router = useRouter()
  const query = router.query as any

  const searchWord = query.text as string
  const titleOnly = query.titleOnly === "true" ? true: false as boolean
  const [ searchText, setSearchText ] = useState<string>("")

  const searchWordsProductsApiUrl = generateApiUrl({type: "SEARCH_WORDS_PRODUCTS"})

  const searchProductsFeatcher = async(url: string, titleOnly: boolean, searchText: string): Promise<ProductConnection> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        titleOnly: titleOnly,
        text: searchText
      })
    }).then((res) => {
      return res.json()
    }).catch((e) => {
      throw Error(e.message)
    })
    return response.data.products
  }

  const { data: productConnection, error } = useSWR([searchWordsProductsApiUrl, titleOnly, searchWord], searchProductsFeatcher)
    console.log(productConnection)
  useEffect(() => {

  },[router.isReady])


  if(error){
    return <ErrorView message={error.message} />
  }

  if(!productConnection){
    return <LoadingView/>
  }
  if(productConnection.edges.length === 0){
    return  <Container>
              <div className='px-12 pb-12'>
                <div className='py-16'>
                  <p className='text-sm text-gray-500'><span className='text-lg font-bold text-gray-800 pr-1'>{searchWord}</span>で検索</p>
                  <p className='my-12 text-center text-gray-500'>検索ワードと一致する商品は見つかりませんでした。</p>
                  <div className='flex items-center w-full'>
                      <input id='search' type="text" onChange={(e) => setSearchText(e.target.value)} placeholder='他のキーワードで検索' className='bg-indigo-50 border shadow-sm border-indigo-300 h-10 rounded-full px-3 py-1 text-sm w-full focus:outline-none font-thin' />
                      <Link
                          as={`/products/search/${searchText}`}
                          href={{ pathname: `/products/search/[text]`, query:{ titleOnly: titleOnly, text: searchText } }}
                          passHref
                      >
                          <a>
                              <div className='w-14 h-11 bg-indigo-600 rounded-xl ml-4 flex justify-center items-center shadow-md'>
                                  <Search className='text-white h-6 w-6'/>
                              </div>
                          </a>
                      </Link>
                  </div>
                </div>
              </div>
            </Container>
  }

  return (
    <Container>
      <div className='px-8 mb-12'>
        <p className='text-sm text-gray-500'><span className='text-lg text-gray-800'>{searchWord}</span>で検索</p>
        <div className='w-full flex justify-end mb-4'>
          <p className='text-sm'><span className='text-lg text-gray-800'>{productConnection.edges.length}</span>点の商品がヒット</p>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {
            productConnection.edges.map(({node: product}) => {
              return <ProductCard key={product.id} product={normalizeProduct(product)} productReviewInfo={null} />
            })
          }
        </div>
      </div>
    </Container>
  )
}

export default SearchProduct