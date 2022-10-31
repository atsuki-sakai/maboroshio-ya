

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

  const { onLoaded, onLoading } = useLoaded()
  return (
    <>
      <MetaHead/>
      <Container>
        <div className='relative h-screen w-full'>
          <VideoPlayer
            onPlay={onLoaded}
            webm={"https://res.cloudinary.com/fdsfmsadlfmaslkdmfalksk/video/upload/v1667175737/%E8%83%8C%E6%99%AF-_1920-_-1080-px_%E5%8B%95%E7%94%BB-_1__kouwmt.webm"}
            mp4={"https://res.cloudinary.com/fdsfmsadlfmaslkdmfalksk/video/upload/v1667174458/%E8%83%8C%E6%99%AF_1920_1080_px_%E5%8B%95%E7%94%BB_1_lsmyam.mp4"}
          />
          <div className='absolute top-0 left-0 w-full h-full z-10'>
            <div className='w-1/2 h-3/5 translate-x-1/2 translate-y-1/2'>
              <div className='flex justify-center items-center w-full h-full'>
                <div className='whitespace-pre'>
                  <p className='text-white font-bold text-3xl wraps md:text-4xl lg:text-5xl font-serif' >丹波篠山産黒枝豆</p>
                  <p className='text-white text-base md:text-xl lg:text-2xl mt-3 font-serif '>こだわりの農法で栽培した<br />特選品をお届け</p>
                </div>
              </div>
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center'>
            {
              products.map((product: Product) => {
                return <ProductCard key={product.id} product={product} />
              })
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home