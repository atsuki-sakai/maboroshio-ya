

import React, { useState} from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getProductsPagenation } from '@shopify/products'
import { PageInfo, Product } from '@shopify/shema'
import { MetaHead } from '@components/common'
import { Container, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import { normalizeProduct } from '@shopify/utils'
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'

const numFeatureProducts = 20

export const getStaticProps: GetStaticProps = async() =>  {

  const featureProductsInfo = await getProductsPagenation(numFeatureProducts)
  return {
    props: {
      featureProductsInfo
    },
    revalidate: 4 * 60 * 60
  }
}

const Home = ({featureProductsInfo}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [ featureProducts, setFeatureProducts ] = useState<Array<Product>>(featureProductsInfo.products.edges.map((product: any) => product.node))
  const [ featureProductsPagination, setFeatureProductsPagination ] = useState<PageInfo>(featureProductsInfo.products.pageInfo)
  const [ isFetching, setIsFetching ] = useState(false)

  const showMoreProducts = async() => {
    if(!featureProductsPagination.hasNextPage) return
    try{
      setIsFetching(true)
      const newProductsInfo = await getProductsPagenation(numFeatureProducts, { type: "NEXT", cursor: featureProductsPagination.endCursor! })
      setFeatureProducts(featureProducts.concat(newProductsInfo.products.edges.map((product: any) => product.node)))
      setFeatureProductsPagination(newProductsInfo.products.pageInfo)
    }catch(error: any){
      alert(error.message)
    }finally{
      setIsFetching(false)
    }
  }

  return (
    <>
      <MetaHead/>
      <Container>
        <div className='w-full h-[320px] flex justify-center items-center bg-red-200'>
          <div>
            <p>バナーをスライドで表示</p>
            <p>売り対象品をプッシュする</p>
          </div>
        </div>
        <div>
          <div className='px-8 py-12'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center'>
              {
                featureProducts.map((product) => {
                  const normarizedProduct = normalizeProduct(product)
                  return <ProductCard key={product.id} product={normarizedProduct} />
                })
              }
            </div>
            <div className='flex items-center justify-between my-6'>
              {
                featureProductsPagination.hasNextPage ? <div className='mt-8'>
                                                          <button className="px-3 w-full py-1 textp-center bg-green-500 rounded-md" onClick={showMoreProducts} disabled={isFetching}>
                                                              <div className='flex items-center justify-center'>
                                                                  <p className='text-white text-sm text-center w-fit font-bold'>さらに商品を表示する</p>
                                                                  <motion.div className="ml-1 mr-1 -translate-y-1" initial={{ opacity:0, height:6, width:0 }} animate={{ opacity: isFetching ? 1: 0, height:12, width: isFetching ? 12: 0 }}>
                                                                      <LoadCircle className='text-white h-5 w-5 animate-spin'/>
                                                                  </motion.div>
                                                              </div>
                                                          </button>
                                                      </div> : <></>
              }
            </div>
          </div>
        </div>
        <div className='px-8 py-12'>
          <Hero
            text={"丹波篠山　黒枝豆"}
            subTitle={"まぼろし屋の思い"}
            subText={"当店ではその時期、その場所でしか手に入らないような旬の地域特産物を取り扱っています。普段市場に出回ることのない「まぼろし」の食品を地元の方以外にも味わっていただきたい！そんな思いから私たちのお店が始まりました。"}
            imageUrl={"/images/top-bg.jpg"}
          />
        </div>
        <div className='w-full h-[320px] flex justify-center items-center bg-blue-200'>
          <p>コレクション商品(売れ筋の商品)</p>
        </div>
        <div className='w-full h-[320px] flex justify-center items-center bg-yellow-200'>
          <p>お知らせ</p>
        </div>
      </Container>
    </>
  )
}

export default Home