
import { Container, ErrorView, LoadingView } from '@components/ui'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { generateApiUrl, normalizeProduct } from '@shopify/utils'
import { Collection } from '@shopify/shema'
import { ProductCard } from '@components/product'
import idConverter from '@lib/id-converter'
import { firebaseApiUrl } from '@firebase/utils'
import { ProductReviewInfo } from '@firebase/types/review'


const CollectionPage = () => {

    const router = useRouter()
    const query = router.query as any

    const collectionHandle = query.handle as string
    const getCollectionByHandleApiUrl = generateApiUrl({type: "GET_COLLECTION_BY_HANDLE"})
    const getProuctReviewInfoApiUrl = firebaseApiUrl({type:"GET_PRODUCT_REVIEW_INFO"})

    const collectionFetcher = async(url: string, handle: string): Promise<Collection> => {
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
        return response.data.collectionByHandle;
    }

    const productReveiwInfos = async(url: string, productIds: string[]): Promise<ProductReviewInfo[]>=> {
        let infos = await Promise.all(
            productIds.map(async(productId) => {
                const response = await fetch(url, {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify({
                        productId: idConverter({type: "PRODUCT"}, productId)
                    })
                }).then((res) => {
                    return res.json()
                }).catch((e) => {
                    throw Error(e.message)
                })
                return response.productReviewInfo
            })
        )
        return infos
    }

    const { data: collection, error } = useSWR<Collection, Error>([getCollectionByHandleApiUrl, collectionHandle], router.isReady ? collectionFetcher: null)
    const { data: infos, error: infosError } = useSWR([getProuctReviewInfoApiUrl, collection?.products.edges.map(({node: product}) => product.id)], collection ? productReveiwInfos: null)

    console.log(infos)
    useEffect(() => {


        console.log('update', collection?.products.edges.map(({node: product}) => product))
    }, [router.isReady, collection])

    if(error || infosError){
        const errorMessage = error ? error.message : infosError.message
        return <ErrorView message={errorMessage}/>
    }

    if(!collection || !infos){
        return <LoadingView/>
    }

    return (
        <Container>
            <div className='px-8 font-sans'>
                <h2 className='text-lg font-bold'>{collection.title}</h2>
                <p className='text-gray-500'>{collection.description}</p>
                <div className='grid grid-cols-2 gap-3 py-6'>
                    {
                        collection.products.edges.map(({node: product}, index) => <ProductCard key={index} product={normalizeProduct(product)} productReviewInfo={infos[index]} />)
                    }
                </div>
            </div>
        </Container>
    )
}

export default CollectionPage