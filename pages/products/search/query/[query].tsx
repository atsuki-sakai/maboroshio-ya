
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { generateApiUrl, normalizeProduct } from '@shopify/utils'
import useSWR from 'swr'
import { Container, ErrorView, LoadingView } from '@components/ui'
import { ProductCard } from '@components/product'
import { ProductConnection } from '@shopify/shema'
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'

const ProductQuery = () => {

  const router = useRouter()
  const query = router.query as any

  const graphQuery = query.graphQuery as string
  console.log("query :", query)

  const categoryName: string | undefined = query.categoryName

  const [ isFetching, setIsFetching ] = useState(false)

  const searchQueryProductsApiUrl = generateApiUrl({type: "SEARCH_QUERY_PRODUCTS"})
  const searchQueryProductsFetcher = async(url: string, query: string): Promise<ProductConnection> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        query: query
      })
    }).then((res) => {
      return res.json()
    }).catch((e) => {
      throw Error(e.message)
    })
    return response.data.products
  }

  const fetchMoreProducts = async() => {
    
    try{
      setIsFetching(true)
    }catch(e: any){
      throw Error(e.message)
    }finally{
      setIsFetching(false)
    }
  }

  const { data: products, error } = useSWR([searchQueryProductsApiUrl, graphQuery], router.isReady ? searchQueryProductsFetcher: null);
  useEffect(() => {
  }, [ router.isReady ])

  if(error){
    return <ErrorView message={error.message} />
  }

  if(!products){
    return <LoadingView/>
  }

  if(products.edges.length === 0){
    return  <Container>
              <div className='px-12 pb-12'>
                <div className='py-20'>
                  {
                    categoryName && <p className='text-lg font-bold'>{categoryName}</p>
                  }
                  <p className='my-12 text-center text-gray-500'>検索条件と一致する商品は見つかりませんでした。</p>
                </div>
              </div>
            </Container>
  }

  return (
    <Container>
      <div className='px-8 mb-12'>
        {
          categoryName && <p className='text-lg font-bold'>{categoryName}</p>
        }
        <div className='w-full flex justify-end mb-4'>
          <p className='text-sm'><span className='text-lg text-gray-800'>{products.edges.length}</span>点の商品がヒット</p>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {
            products.edges.map(({node: product}) => {
              return <ProductCard key={product.id} product={normalizeProduct(product)} productReviewInfo={null} />
            })
          }
        </div>
        <div className='w-full pt-5'>
          {
              products.pageInfo.hasNextPage ? <div className='mt-8'>
                                                  <button className="px-3 w-full py-1 textp-center bg-green-500 rounded-md shadow-md" onClick={fetchMoreProducts} disabled={isFetching}>
                                                      <div className='flex items-center justify-center'>
                                                          <p className='text-white text-sm text-center w-fit'>さらに商品を表示</p>
                                                          <motion.div className="ml-1 mr-1 -translate-y-1" initial={{ opacity:0, height:6, width:0 }} animate={{ opacity: isFetching ? 1: 0, height:12, width: isFetching ? 12: 0 }}>
                                                              <LoadCircle className='text-white h-5 w-5 animate-spin'/>
                                                          </motion.div>
                                                      </div>
                                                  </button>
                                              </div> : <></>
          }
        </div>
      </div>
    </Container>
  )
}

export default ProductQuery