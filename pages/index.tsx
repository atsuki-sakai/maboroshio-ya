

import React, { useState} from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getProductsPagenation } from '@shopify/products'
import { Hero, Container } from "@components/ui"
import { ProductCard  } from "@components/product"
import { MetaHead } from '@components/common'
import { PageInfo, Product } from '@shopify/shema'

const numProducts = 20

export const getStaticProps: GetStaticProps = async() =>  {

  const featureProductsInfo = await getProductsPagenation(numProducts)
  return {
    props: {
      featureProductsInfo
    },
    revalidate: 4 * 60 * 60
  }
}

const Home = ({featureProductsInfo}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [ featureProducts, setFeatureProducts ] = useState<Array<Product>>(featureProductsInfo.products.edges.map((connection: any) => connection.node))
  const [ featureProductsPageInfo, setFeatureProductsPageInfo ] = useState<PageInfo>(featureProductsInfo.products.pageInfo)

  const showMoreProducts = async() => {

    if(!featureProductsPageInfo.hasNextPage) return

    const newProductsInfo = await getProductsPagenation(numProducts, { type: "NEXT", cursor: featureProductsPageInfo.endCursor! })
    setFeatureProducts(featureProducts.concat(newProductsInfo.products.edges.map((connection: any) => connection.node)))
    setFeatureProductsPageInfo(newProductsInfo.products.pageInfo)
  }

  console.log('new: ', featureProducts)

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
                  return <ProductCard key={product.id} product={product} />
                })
              }
            </div>
            <div className='flex items-center justify-between my-6'>
              {
                featureProductsPageInfo.hasNextPage ? <button className='w-full text-center rounded-md bg-gradient-to-tr to-green-500 from-lime-400 py-2' onClick={showMoreProducts}>
                                                        <p className='text-sm text-white'>
                                                          さらに商品を表示
                                                        </p>
                                                      </button> : <></>
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