

import { FC } from 'react'
import Image from 'next/image';
import { Product } from '@shopify/types/product'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import { Container } from "@components/ui"


interface Props {
    product: Product
}
const ProductView: FC<Props> = ({ product }) => {
    return (
        <>
            <Container>
                <div className='mx-8'>
                    <h1 className='pl-8 py-2 font-bold text-2xl font-serif'>{product.name}</h1>
                    <Splide
                        aria-label="商品画像　一覧"
                        options={{
                            autoplay: true, // 自動再生を有効
                            interval: 4000, // 自動再生の間隔を4秒に設定
                        }}
                    >
                        {
                            product.images.map((image, index) => {
                                return (
                                    <SplideSlide key={index}>
                                        <div className='flex items-center justify-center bg-gray-100'>
                                            <Image className='block w-full h-full object-cover' src={image.url} width={image.width} height={image.height} alt={image.altText} />
                                        </div>
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>
                    <div className=''>
                        <p className='text-gray-500 p-3'>{product.description}</p>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductView