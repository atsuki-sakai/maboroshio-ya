
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { generateApiUrl, normalizeProduct } from '@shopify/utils'
import useSWR from 'swr'
import { Container, ErrorView, LoadingView } from '@components/ui'
import { ProductCard } from '@components/product'
import { ProductConnection } from '@shopify/shema'
import { getProductTags, getProductTypes } from '@shopify/products'
import { Search } from '@components/icon'
import Link from 'next/link'

const ProductQuery = () => {

  const router = useRouter()
  const query = router.query as any

  const graphQuery = query.graphQuery as string
  console.log("query :", query)

  const categoryName: string | undefined = query.categoryName

  const [ searchText, setSearchText ] = useState<string>("")
  const [ priceRange, setPriceRange ] = useState("")


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

  const { data: products, error } = useSWR([searchQueryProductsApiUrl, graphQuery], router.isReady ? searchQueryProductsFetcher: null);

  const getTagsApiUrl = generateApiUrl({type: "GET_PRODUCT_TAGS"})
  const getTypesApiUrl = generateApiUrl({type: "GET_PRODUCT_TYPES"})
  const { data: tags } = useSWR(getTagsApiUrl, getProductTags)
  const { data: types } = useSWR(getTypesApiUrl, getProductTypes)

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
                  <Link href={"/products/search/detail"} passHref>
                    <a className='text-sm text-blue-500'>
                      さらに商品を検索する
                    </a>
                  </Link>
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
      </div>
    </Container>
  )
}

export default ProductQuery