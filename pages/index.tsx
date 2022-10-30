

import React from 'react'
import Image from 'next/image'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllProducts } from '@shopify/products'
import { getConfig } from "@shopify/api/config"
import { Product } from '@shopify/types/product'
import { ProductCard, Container, VideoPlayer } from '@components/ui'
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
  return (
    <>
      <MetaHead/>
      <Container>
        <div className='relative h-screen w-full -z-10'>
          <VideoPlayer
            webm={"https://res.cloudinary.com/fdsfmsadlfmaslkdmfalksk/video/upload/v1659753884/bg-particel_yb8as0.webm"}
            mp4={"https://res.cloudinary.com/fdsfmsadlfmaslkdmfalksk/video/upload/v1659753868/bg-particel_vqwbgl.mp4"}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center'>
          {
            products.map((product: Product) => {
              return <ProductCard key={product.id} product={product} />
            })
          }
        </div>
      </Container>
    </>
  )
}

export default Home