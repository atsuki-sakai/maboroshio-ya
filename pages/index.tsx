

import React, { useEffect, useState} from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getProduct, getProductsPagenation } from '@shopify/products'
import { Hero, Container } from "@components/ui"
import { ProductCard  } from "@components/product"
import { MetaHead } from '@components/common'
import { PageInfo, Product } from '@shopify/shema'
import { normalizeProduct } from '@shopify/utils'
import getProductsPaths from '@shopify/products/get-all-product-paths'

import axios from 'axios';

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

  const showMoreProducts = async() => {
    if(!featureProductsPagination.hasNextPage) return
    try{
      const newProductsInfo = await getProductsPagenation(numFeatureProducts, { type: "NEXT", cursor: featureProductsPagination.endCursor! })
      setFeatureProducts(featureProducts.concat(newProductsInfo.products.edges.map((product: any) => product.node)))
      setFeatureProductsPagination(newProductsInfo.products.pageInfo)
    }catch(error: any){
      alert(error.message)
    }
  }

  const insertUser = async () => {
    await axios.post('/api/user');
  };
  const updateUser = async () => {
    await axios.patch('/api/user');
  };

  return (
    // <>
    //   <MetaHead/>
    //   <Container>
    //     <div className='w-full h-[320px] flex justify-center items-center bg-red-200'>
    //       <div>
    //         <p>バナーをスライドで表示</p>
    //         <p>売り対象品をプッシュする</p>
    //       </div>
    //     </div>
    //     <div>
    //       <div className='px-8 py-12'>
    //         <div className='grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center'>
    //           {
    //             featureProducts.map((product) => {
    //               const normarizedProduct = normalizeProduct(product)
    //               return <ProductCard key={product.id} product={normarizedProduct} />
    //             })
    //           }
    //         </div>
    //         <div className='flex items-center justify-between my-6'>
    //           {
    //             featureProductsPagination.hasNextPage ? <button className='w-full text-center rounded-md bg-gradient-to-tr to-green-500 from-lime-400 py-2' onClick={showMoreProducts} >
    //                                                     <p className='text-sm text-white'>
    //                                                       さらに商品を表示
    //                                                     </p>
    //                                                   </button> : <></>
    //           }
    //         </div>
    //       </div>
    //     </div>
    //     <div className='px-8 py-12'>
    //       <Hero
    //         text={"丹波篠山　黒枝豆"}
    //         subTitle={"まぼろし屋の思い"}
    //         subText={"当店ではその時期、その場所でしか手に入らないような旬の地域特産物を取り扱っています。普段市場に出回ることのない「まぼろし」の食品を地元の方以外にも味わっていただきたい！そんな思いから私たちのお店が始まりました。"}
    //         imageUrl={"/images/top-bg.jpg"}
    //       />
    //     </div>
    //     <div className='w-full h-[320px] flex justify-center items-center bg-blue-200'>
    //       <p>コレクション商品(売れ筋の商品)</p>
    //     </div>
    //     <div className='w-full h-[320px] flex justify-center items-center bg-yellow-200'>
    //       <p>お知らせ</p>
    //     </div>
    //   </Container>
    // </>
    <div>
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <button
          className="mt-4 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
          onClick={() => insertUser()}>
          Insert User
        </button>
        <button
          className="mt-4 w-60 rounded-full bg-yellow-500 py-2 px-4 font-bold text-white hover:bg-yellow-700"
          onClick={() => updateUser()}>
          Update User
        </button>
      </div>
    </div>
  )
}

export default Home