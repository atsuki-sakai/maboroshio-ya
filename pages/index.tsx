
import { getAllProducts } from '@shopify/products'
import { getConfig } from "@shopify/api/config"
import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Product } from '@shopify/types/product'

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
    <div className='flex items-center justify-center  px-6 py-12 space-x-12'>
      {
        products.map((product: Product, index: number) => {
          return (
            <div key={index}>
              <h4 className='font-bold text-2xl '>
                { product.name }
              </h4>
              <span className='text-sm text-red-500'>{product.vendor}</span>
              <p className='font-thin text-gray-500'>{ product.description }</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home