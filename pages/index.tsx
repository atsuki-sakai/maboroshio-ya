

import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllProducts } from '@shopify/products'
import { getConfig } from "@shopify/api/config"
import { Product } from '@shopify/types/product'
import { ProductCard, Container, VideoPlayer, Hero } from '@components/ui'
import { useLoaded } from '@components/context'
import { MetaHead } from '@components/common'


export const getStaticProps: GetStaticProps = async() =>  {

  const config = getConfig()
  const products = await getAllProducts(config)
  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60
  }
}


const Home = ({products}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const { onLoaded } = useLoaded()
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
                products.map((product: Product) => {
                  return <ProductCard key={product.id} product={product} />
                })
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