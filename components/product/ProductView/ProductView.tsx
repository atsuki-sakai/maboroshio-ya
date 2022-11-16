

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
import { Minus, Plus } from '@components/icon';

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
                                        <div className='flex items-center h-full justify-centeroverflow-hidden'>
                                            <Image className='block w-full h-full object-cover rounded-md overflow-hidden' src={image.url} width={image.width} height={image.height} alt={image.altText} />
                                        </div>
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>
                    <div className='font-serif pt-3'>
                        <div className='flex items-center justify-between w-full mt-2'>
                            <div className="bg-gray-100 rounded-md w-fit px-3 py-1">
                                <p className='text-sm text-gray-500'>
                                    {product.vendor}
                                </p>
                            </div>
                            <div className={`${product.totalInventory < 10 ? "bg-red-100" : "bg-green-100"} rounded-md px-3 py-1`}>
                                <p className={`font-sans text-xs ${product.totalInventory < 10 ? " text-red-500": "text-green-500"}`}>残り<span className='text-sm font-bold'>{product.totalInventory}</span>点</p>
                            </div>
                        </div>
                        <h1 className='py-5 font-bold text-2xl'>{product.name}</h1>
                        <div className='flex items-end font-sans'>
                            <section>
                                {product.options.map((option, index) =>
                                    <div key={index}>
                                        <div className='bg-indigo-100 w-fit rounded-md px-3 py-1'>
                                            <p className='text-xs text-indigo-500'>{ option.displayName }</p>
                                        </div>
                                        <div className='grid grid-cols-5 gap-1 py-2 w-full'>
                                            {
                                                option.values.map((value, index) => {
                                                    const activeChoice = choices[option.displayName.toLowerCase()]
                                                    return (
                                                        <div
                                                            className={`text-xs ml-2 px-2 py-2 rounded-full h-11 w-11 flex justify-center items-center shadow-md transfrom duration-300 ease-in-out ${ activeChoice === value.label ? "scale-110 border border-indigo-600 text-indigo-600 bg-indigo-50" : "bg-gray-100 scale-95 text-gray-500" }`} 
                                                            key={index}
                                                            onClick={() => {
                                                                setChoices({
                                                                    ...choices,
                                                                    [option.displayName.toLocaleLowerCase()]: value.label.toLocaleLowerCase(),
                                                                    price: String(product.variants[index].price)
                                                                })
                                                            }}
                                                        >
                                                            <p className='font-sans'><span className='text-sm'>{ value.label }</span></p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                        <div className="p-3">
                            <p className='text-gray-500'>{product.description}</p>
                        </div>
                    </div>
                    <div className='fixed bottom-0 left-0 right-0 h-fits z-40 bg-white border-t'>
                        <div className={``} >
                            <button onClick={addItem} className='w-full h-full' disabled={isLoading || product.totalInventory === 0}>
                                <div className='text-center h-full py-2 flex items-center justify-between space-x-2 px-6 bg-gray-50 rounded-md'>
                                    <div>
                                        <div className='flex items-center'>
                                            <div className='w-full flex items-center space-x-2'>
                                                <button>
                                                    <Minus className='text-red-400 h-5 w-5'/>
                                                </button>
                                                <input className='w-12 h-5 text-sm bg-white text-gray-700 border text-center rounded-md' id='quantity' type="text" value={1} />
                                                <button>
                                                    <Plus className='text-green-400 h-5 w-5'/>
                                                </button>
                                            </div>
                                        </div>
                                        <p className='text-sm text-red-500'>¥ <span className={`text-2xl font-sans font-bold tracking-wider ${product.totalInventory === 0 ? "line-through" : "" }`}>{variant?.price}</span> 税込</p>
                                    </div>
                                    <div className={`flex items-center text-white font-bold px-6 py-2 ${product.totalInventory === 0 ? "bg-gray-500" : "bg-gradient-to-tl to-green-600 from-lime-600"} rounded-md shadow-md tracking-widest`}>
                                        <p>{product.totalInventory === 0 ? "売り切れ" : "カートへ追加"}</p>
                                        <motion.div className='-translate-y-1 pl-1' initial={{width:0 , height:0, opacity:0}} animate={{width: isLoading ? 20: 0, height: isLoading ? 12: 0, opacity: isLoading ? 1: 0}}>
                                            <LoadCircle className='animate-spin text-white h-5 w-5' />
                                        </motion.div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductView