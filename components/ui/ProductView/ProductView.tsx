

import { FC } from 'react'
import Image from 'next/image';
import { Product } from '@shopify/types/product'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import { Container } from "@components/ui";
import { ADMIN_ACCESS_TOKEN, ADMIN_API_KEY, ADMIN_API_SECLET_KEY, API_URL } from '@shopify/const';
import getConfig from 'next/config';
import { checkoutCreateMutation } from '@shopify/utils/mutations';
import axios from "axios"
import { getAllProducts } from '@shopify/products';



interface Props {
    product: Product
}


const ProductView: FC<Props> = ({ product }) => {

    const createCart = async () => {
        console.log("API_URL :",API_URL)
        console.log('ADMIN :',ADMIN_ACCESS_TOKEN )
        console.log('authorization: ','Basic ' + Buffer.from( ADMIN_API_KEY! + ':' + ADMIN_API_SECLET_KEY!).toString('base64'))
        console.log(ADMIN_API_KEY)
        console.log(ADMIN_API_SECLET_KEY)
        const  data = await fetch("https://maboroshio-ya.vercel.app/api/create-checkout", {
            method: "POST",
            mode: "no-cors"
        })

        console.log('create checkout')
        console.log("checkout: ",JSON.stringify(data, null, 2))
    }
    return (
        <>
            <Container>
                <div className='px-8 relative'>
                    <Splide
                        aria-label={`${product.name} 商品画像`}
                    >
                        {
                            product.images.map((image, index) => {
                                return (
                                    <SplideSlide key={index}>
                                        <div className='flex items-center justify-center bg-gray-100 rounded-md overflow-hidden shadow-md'>
                                            <Image className='block w-full h-full object-cover' src={image.url} width={image.width} height={image.height} alt={image.altText} />
                                        </div>
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>
                    <div className='font-serif'>
                        <div className='w-full'>
                            <p>{product.vendor}</p>
                        </div>
                        <h1 className='py-2 font-bold text-2xl'>{product.name}</h1>
                        <div className='flex items-center justify-start space-x-12'>
                            <p className='text-base text-red-500'>¥ <span className={`text-2xl font-sans font-bold ${product.totalInventory === 0 ? "line-through" : "" }`}>{Number(product.priceRangeV2.minVariantPrice.amount)}</span> 税込</p>
                            {
                                product.totalInventory === 0 ? <p className='bg-gray-600 text-white px-4 py-0.5'>売り切れ</p> : ""
                            }
                        </div>
                        <div className="p-3">
                            <p className='text-gray-500'>{product.description}</p>
                        </div>
                    </div>
                    <div className='fixed bottom-0 left-0 bg-orange-600 w-1/2 rounded-tr-md z-50'>
                        <button onClick={createCart} className='w-full h-full'>
                            <div className='text-center py-3'>
                                <p className='text-white font-bold'>カートへ追加</p>
                            </div>
                        </button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductView