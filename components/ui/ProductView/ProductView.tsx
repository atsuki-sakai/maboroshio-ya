

import { FC } from 'react'
import Image from 'next/image';
import { Product } from '@shopify/types/product'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import { Container } from "@components/ui";
import { createCustomer } from "@shopify/auth"



interface Props {
    product: Product
}


const ProductView: FC<Props> = ({ product }) => {

    const createCart = async () => {
        console.log('create customre')
        const email = "atk721420@icloud.com"
        const password = "Heisei50721"
        const acceptsMarketing = true
        const firstName = "sakai"
        const lastName = "atsuki"
        const phone = "07090308805"

        let data
        try {
            data = await createCustomer(email, password, acceptsMarketing, firstName, lastName, phone);
        } catch (error: any) {
            console.log(error?.message)
            data = []
        }
        console.log(data)
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