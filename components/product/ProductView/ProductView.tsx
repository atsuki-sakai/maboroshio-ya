

import { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import { Product } from '@shopify/types/product'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import { Container } from "@components/ui";
import { useCart, useUI } from '@components/context';
import { Choices, getVariant } from '../helpers'
import checkoutLineItemsAdd from '@shopify/cart/checkout-lineitems-add';
import { checkoutToCart, getCheckoutId } from '@shopify/cart';
import { motion } from 'framer-motion';
import LoadCircle from '@components/icon/LoadCircle';
import Swatch from '../Swatch';

interface Props {
    product: Product
}


const ProductView: FC<Props> = ({ product }) => {

    const { cart, updateCart } = useCart()
    const { onCartOpen } = useUI()

    const initialOptions = (product: Product) => {
        let initialOptions: {[key: string]: string} = {}
        product.variants[0].options.map((option) => {
            initialOptions = {
                ...initialOptions,
                [option.displayName.toLocaleLowerCase()]:option.values[0].label.toLocaleLowerCase()
            }
        })
        return initialOptions
    }
    const [ choices, setChoices ] = useState<Choices>(initialOptions(product));
    const [isLoading, setIsLoading] = useState(false);
    const variant = getVariant(product, choices)

    const addItem = async () => {
        setIsLoading(true)
        try{
            const variable = {
                checkoutId: getCheckoutId() ?? cart.id,
                lineItems: {
                    variantId: variant!.id,
                    quantity: 1
                }
            }
            const checkout = await checkoutLineItemsAdd(variable)
            const newCart = checkoutToCart(checkout)
            updateCart(newCart)
            onCartOpen()
        }catch(e: any){
            alert(`error: ${e.message}`)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setChoices(initialOptions(product))
    }, [product])

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
                                            <Image className='block w-full h-full object-cover overflow-hidden rounded-md' src={image.url} width={image.width} height={image.height} alt={image.altText} />
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
                            <p className='text-base text-red-500'>¥ <span className={`text-2xl font-sans font-bold ${product.totalInventory === 0 ? "line-through" : "" }`}>{variant?.price}</span> 税込</p>
                        </div>
                        <div className='flex items-end'>
                        <section>
                        {product.options.map((option, index) =>
                            <div key={index}>
                                <h2 className='text-sm mt-2'>{ option.displayName }</h2>
                                <div className='flex items-row py-2'>
                                    {
                                        option.values.map((value, index) => {
                                            const activeChoice = choices[option.displayName.toLowerCase()]
                                            return (
                                                <div
                                                    className={`text-xs ml-2 px-3 py-3 rounded-full h-12 w-12 flex justify-center items-center shadow-md transfrom duration-300 ease-in-out ${ activeChoice === value.label ? "scale-110 border border-gray-500" : "bg-gray-100 scale-95" }`} 
                                                    key={index}
                                                    onClick={() => {
                                                        setChoices({
                                                            ...choices,
                                                            [option.displayName.toLocaleLowerCase()]: value.label.toLocaleLowerCase(),
                                                            price: String(product.variants[index].price)
                                                        })
                                                    }}
                                                >
                                                    <p className='font-sans'><span className='font-bold text-sm'>{ value.label }</span></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )}
                    </section>
                        </div>
                        <div className={`my-3 ${product.totalInventory === 0 ? "bg-gray-500" : "bg-black"}`} >
                            <button onClick={addItem} className='w-full h-full' disabled={product.totalInventory === 0}>
                                <div className='text-center h-full py-3 flex items-center justify-center space-x-2'>
                                    <div className='text-white font-bold'>{product.totalInventory === 0 ? "売り切れ" : "カートへ追加"}</div>
                                    <motion.div className='-translate-y-1' initial={{width:0 , height:0, opacity:0}} animate={{width: isLoading ? 20: 0, height: isLoading ? 12: 0, opacity: isLoading ? 1: 0}}>
                                        <LoadCircle className='animate-spin text-white' />
                                    </motion.div>
                                </div>
                            </button>
                        </div>
                        <div className="p-3">
                            <p className='text-gray-500'>{product.description}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductView