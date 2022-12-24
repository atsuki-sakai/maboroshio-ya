
import { Container, Field } from '@components/ui'
import {  postProductReview } from '@firebase/firestore/review'
import { PostReviewInput } from '@shopify/types/review'
import { useCustomerState  } from "@components/context"
import React, { useEffect, useState } from 'react'
import idConverter from '@lib/id-converter'
import { useRouter } from 'next/router'
import Image from "next/image"
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'
import { truncate } from '@lib/truncate'
import { generateApiUrl } from '@shopify/utils/generate-api-url'
import useSWR from 'swr'
import ProductSlug from '../[slug]'

const placeholderImage = "/images/product-image-placeholder.svg"

const PostReview = () => {

    const { loggedCustomer } = useCustomerState()
    const router = useRouter()
    const productSlug: string = router.query.slug as any


    const getProductBySlugApiUrl = generateApiUrl({type: "GET_PRODUCT"})

    const productFetcher = (url: string, slug: string) => fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            slug: slug
        })
    }).then((res) => res.json()).catch((e) => { throw Error(e.message) })

    const { data: productSWR, error } = useSWR([getProductBySlugApiUrl, productSlug], router.isReady ? productFetcher: null)

    const [ isLoading, setIsLoading ] = useState(false)

    const [ postReviewInfo, setPostReviewInfo ] = useState<PostReviewInput>({
        reviewerCustomerId: idConverter({type: "CUSTOMER"},loggedCustomer?.id ?? ""),
        productId: idConverter({type: "PRODUCT"},productSWR?.data.productByHandle.id ?? ""),
        productName: productSWR?.data.productByHandle.name ?? "",
        review: {
            customerId: idConverter({type: "CUSTOMER"},loggedCustomer?.id ?? ""),
            customerName: loggedCustomer?.displayName ?? "",
            isPublic: false,
            productId: idConverter({type: "PRODUCT"}, productSWR?.data.productByHandle.id),
            productName: productSWR?.data.productByHandle.name ?? "",
            star: 3,
            title: "",
            comment: "",
        }
    })

    const postReview = async () => {
        if(postReviewInfo.review.title === "" || postReviewInfo.review.comment === "" || postReviewInfo.review.customerName === ""){
            alert('すべての項目を入力してください。')
            return
        }
        setIsLoading(true)
        try{
            await postProductReview(postReviewInfo);
            router.push('/')
        }catch(e: any){
            alert(e.message)
        }finally{
            setIsLoading(false)
        }
    };

    useEffect(() => {
    }, [router.isReady])

    if(error){
        return <Container>useSWR is fetch error: {error.message}</Container>
    }

    if(!productSWR){
        return  <div className='h-screen w-screen'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <p className='text-center text-gray-500'>読み込み中...</p>
                    </div>
                </div>
    }

    return (
        <Container>
            <div className='px-8 space-y-2'>
                <h1 className='mb-6 font-bold text-lg'>商品レビュー投稿</h1>
                <div className='flex items-center justify-start'>
                    <Image
                        alt={productSWR.data.productByHandle.name ?? "Product Image"}
                        src={productSWR.data.productByHandle.images.edges[0].node.url ?? placeholderImage}
                        height={50}
                        width={50}
                        quality="85"
                        layout='fixed'
                        className='rounded-sm transform duration-1000 ease-in-out hover:scale-105'
                    />
                    <div className='pl-3'>
                        <h3 className='text-lg'>{truncate(productSWR.data.productByHandle.title, 12)}</h3>
                    </div>
                </div>
                <div className='text-xs pt-5 pb-4'>
                    <label className='block' htmlFor="star" id="star">総合評価</label>
                    <div className='flex items-center space-x-1 text-4xl text-yellow-500'>
                        <button onClick={() => setPostReviewInfo({...postReviewInfo, review: {...postReviewInfo.review, star: 1}})}>{ postReviewInfo.review.star >= 1 ? "★": "☆" }</button>
                        <button onClick={() => setPostReviewInfo({...postReviewInfo, review: {...postReviewInfo.review, star: 2}})}>{ postReviewInfo.review.star >= 2 ? "★": "☆" }</button>
                        <button onClick={() => setPostReviewInfo({...postReviewInfo, review: {...postReviewInfo.review, star: 3}})}>{ postReviewInfo.review.star >= 3 ? "★": "☆" }</button>
                        <button onClick={() => setPostReviewInfo({...postReviewInfo, review: {...postReviewInfo.review, star: 4}})} >{ postReviewInfo.review.star >= 4 ? "★": "☆" }</button>
                        <button onClick={() => setPostReviewInfo({...postReviewInfo, review: {...postReviewInfo.review, star: 5}})} >{ postReviewInfo.review.star >= 5 ? "★": "☆" }</button>
                    </div>
                </div>
                <Field label='投稿者名' placeHolder='山田 太郎' id='customer-name' value={postReviewInfo.review.customerName} onChange={(e) => setPostReviewInfo({...postReviewInfo, review: { ...postReviewInfo.review, customerName: e.target.value }})}/>
                <p className='text-lg font-bold pt-4'>タイトルを追加</p>
                <span className='text-xs text-gray-500'>一行にレビューを要約</span>
                <Field placeHolder='もっとも伝えたいポイントは？' id='title' value={postReviewInfo.review.title} onChange={(e) => setPostReviewInfo({...postReviewInfo, review: { ...postReviewInfo.review, title: e.target.value }})}/>
                <div>
                    <label className='block text-lg font-bold pt-4' htmlFor="">レビュー</label>
                    <p className='text-xs text-gray-500 pb-4'>使いやすさ、操作性、耐久性など具体的に記入しましょう。</p>
                    <textarea className='text-base block text-gray-500 w-full border p-2 rounded-md bg-gray-50 focus:outline-none' id="story" placeholder={"気に入った事/気に入らなかったことは何ですか？この製品をどのように使用しましたか？"} name="story" rows={10} value={postReviewInfo.review.comment} onChange={(e) => setPostReviewInfo({...postReviewInfo, review: { ...postReviewInfo.review, comment: e.target.value }})} />
                </div>
            </div>
            <div className='w-fit mx-auto py-8'>
                <button className={`px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md shadow-md`} onClick={postReview} disabled={isLoading}>
                    <div className='flex items-center justify-between'>
                        <p className='text-white font-bold'>{isLoading ? "投稿中..." : "レビューを投稿"}</p>
                        <motion.div className="ml-2 -translate-y-1.5" initial={{ opacity:0, height:12, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                        <LoadCircle className='text-white h-6 w-6 animate-spin'/>
                        </motion.div>
                    </div>
                </button>
            </div>
        </Container>
    )
}

export default PostReview