

import React, { useState} from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllCollections, getProductsPagenation } from '@shopify/products'
import { Collection, PageInfo } from '@shopify/shema'
import { MetaHead } from '@components/common'
import { Container, ErrorView, Hero } from '@components/ui'
import { CollectionSlide, ProductCard } from '@components/product'
import { generateApiUrl, normalizeProduct } from '@shopify/utils'
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'
import { getProductReviewInfo } from '@firebase/firestore/review'
import type { Product } from "@shopify/types/product"
import idConverter from '@lib/id-converter'
import { ProductReviewInfo } from '@shopify/types/review'
import useSWR from 'swr'
import { SplideSlide, Splide } from '@splidejs/react-splide'
import { truncate } from '@lib/truncate'

const numFeatureProducts = 10

export const getStaticProps: GetStaticProps = async() =>  {

  const featureProductsInfo = await getProductsPagenation(numFeatureProducts)
  const _featureProducts: Product[] = await featureProductsInfo.products.edges.map((product: any) => product.node);
  const productReviewInfos = await Promise.all(
    _featureProducts.map( async(product) => {
      return await getProductReviewInfo(idConverter({type: "PRODUCT"}, product.id))
    })
  )


  return {
    props: {
      featureProductsInfo,
      productReviewInfos
    },
    revalidate: 4 * 60 * 60
  }
}

const Home = ({featureProductsInfo, productReviewInfos}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [ featureProducts, setFeatureProducts ] = useState<Array<Product>>(featureProductsInfo.products.edges.map((product: any) => product.node))
  const [ featureProductsPagination, setFeatureProductsPagination ] = useState<PageInfo>(featureProductsInfo.products.pageInfo)
  const [ featureProductReviewInfos, setFeatureProductReviewInfos ] = useState<ProductReviewInfo[]>(productReviewInfos)
  const [ isFetching, setIsFetching ] = useState(false)


  const getCollectionByHandleApiUrl = generateApiUrl({type: "GET_COLLECTION_BY_HANDLE"})
  const collectionHandle = "women"
  const collection2Handle = "men"
  const collection3Handle = "sale"

  const collectionFeatcher = async(url: string, handle: string): Promise<Collection> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        handle: handle
      })
    }).then((res) => {
      return res.json()
    }).catch((e) => {
      throw Error(e.message)
    })
    return response.data.collectionByHandle
  }

  const { data: collection } = useSWR([getCollectionByHandleApiUrl, collectionHandle],collectionFeatcher )
  const { data: collection2 } = useSWR([getCollectionByHandleApiUrl, collection2Handle],collectionFeatcher )
  const { data: collection3 } = useSWR([getCollectionByHandleApiUrl, collection3Handle],collectionFeatcher )

  const showMoreProducts = async() => {
    if(!featureProductsPagination.hasNextPage) return
    try{
      setIsFetching(true)
      const newProductsInfo = await getProductsPagenation(numFeatureProducts, { type: "NEXT", cursor: featureProductsPagination.endCursor! })
      const newProductReviewInfos = await Promise.all(
        newProductsInfo.products.edges.map(async(product: any) => {
          return await getProductReviewInfo(idConverter({type: "PRODUCT"}, product.node.id))
        })
      )
      setFeatureProducts(featureProducts.concat(newProductsInfo.products.edges.map((product: any) => product.node)))
      setFeatureProductReviewInfos(featureProductReviewInfos.concat(newProductReviewInfos))
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
            <p className='font-bold text-lg mb-3'>最新商品</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center'>
              {
                featureProducts.map((product, index) => {
                  const normarizedProduct = normalizeProduct(product)
                  return <ProductCard key={product.id} productReviewInfo={featureProductReviewInfos[index]} product={normarizedProduct} />
                })
              }
            </div>
            <div className='flex items-center justify-between my-6'>
              {
                featureProductsPagination.hasNextPage ? <div className='mt-8 w-full'>
                                                          <button className="px-3 w-full shadow-md py-1 textp-center bg-green-500 rounded-md" onClick={showMoreProducts} disabled={isFetching}>
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
        <div className='px-8'>
          <Hero
            text={"丹波篠山　黒枝豆"}
            subTitle={"まぼろし屋の思い"}
            subText={"当店ではその時期、その場所でしか手に入らないような旬の地域特産物を取り扱っています。普段市場に出回ることのない「まぼろし」の食品を地元の方以外にも味わっていただきたい！そんな思いから私たちのお店が始まりました。"}
            imageUrl={"/images/top-bg.jpg"}
          />
        </div>
        <div className='h-full w-full px-8 py-4 space-y-12'>
          {
            collection ? <CollectionSlide collection={collection} />: null
          }
          {
            collection2 ? <CollectionSlide collection={collection2} />: null
          }
          {
            collection3 ? <CollectionSlide collection={collection3} />: null
          }
        </div>
        <div className='w-full h-[320px] flex justify-center items-center bg-yellow-200'>
          <p>お知らせ</p>
        </div>
      </Container>
    </>
  )
}

export default Home