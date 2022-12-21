

import { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { Container } from "@components/ui";
import { useCart, useUI } from '@components/context';
import { Choices, getVariant } from '../helpers'
import { checkoutLineItemsAdd }  from '@shopify/cart';
import { checkoutToCart, getCheckoutId } from '@shopify/cart';
import { motion } from 'framer-motion';
import LoadCircle from '@components/icon/LoadCircle';
import { Minus, Plus } from '@components/icon';
import { Product } from '@shopify/types/product';
import { Review } from '@shopify/types/review';
import { truncate } from '@lib/truncate';

interface Props {
    product: Product,
    reviews: Array<Review>
}

const ProductView: FC<Props> = ({ product, reviews }) => {

    const { updateCart } = useCart()
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

    const [ quantity, setQuantity ] = useState<number>(variant?.quantityAvailable! === 0 ? 0: 1)

    const addItem = async () => {
        setIsLoading(true)
        try{
            const variable = {
                checkoutId: getCheckoutId()!,
                lineItems: {
                    variantId: variant!.id,
                    quantity: quantity
                }
            }

            const checkout = await checkoutLineItemsAdd(variable)
            const newCart = checkoutToCart(checkout)
            updateCart(newCart)
            onCartOpen()
        }catch(e: any){
            alert(`Error: ${e.message}`)
        }finally{
            setTimeout(() => {
                setQuantity(1)
            }, 600)
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(parseInt(e.target.value) <= 0 || parseInt(e.target.value) >= 100) return;
        if(parseInt(e.target.value) >= variant?.quantityAvailable!) {
            setQuantity(variant?.quantityAvailable!);
            return;
        }
        setQuantity(parseInt(e.target.value))
    }

    const decrementQuantity = () => {
        if(quantity <= 1) return;
        setQuantity(quantity - 1)
    }
    const incrementQuantity = () => {
        if(quantity >= 99) return;
        if(quantity >= variant?.quantityAvailable!) {
            setQuantity(variant?.quantityAvailable!);
            return;
        }
        setQuantity(quantity + 1)
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
                        </div>
                        <div className='py-4'>
                            <h1 className='font-bold text-2xl my-3'>{product.name}</h1>
                            <div className='flex items-end justify-between'>
                                <div className='mb-2'>
                                    <p className='text-sm w-full text-start text-gray-800'>購入数量</p>
                                    <div className='flex items-center'>
                                        <div className='w-full flex items-center space-x-3'>
                                            <button onClick={incrementQuantity}>
                                                <Plus className='text-green-400 h-8 w-8'/>
                                            </button>
                                            <input className='w-16 h-8 font-sans text-[17px] bg-white text-gray-700 border text-center rounded-md focus:outline-none' id='quantity' type="number" value={quantity} onChange={handleChange} />
                                            <button onClick={decrementQuantity}>
                                                <Minus className='text-red-400 h-8 w-8'/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${variant?.quantityAvailable! < 10 ? "bg-red-100" : "bg-green-100"} rounded-md px-3 py-1`}>
                                    <p className={`font-sans text-xs ${variant?.quantityAvailable! < 10 ? " text-red-500": "text-green-500"}`}>残り<span className='text-sm font-bold'>{variant?.quantityAvailable}</span>点</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end font-sans'>
                            <section>
                                {product.options.map((option, index) =>
                                    <div key={index}>
                                        <div className='bg-indigo-100 w-fit rounded-md px-3 py-1'>
                                            <p className='text-xs text-indigo-500'>{ option.displayName }</p>
                                        </div>
                                        <div className='grid grid-cols-5 gap-3 py-2 w-full'>
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
                                                                setQuantity(1)
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
                        <div className='py-6'>
                            <div className='flex items-start justify-between mb-3'>
                                <p className='mb-2 font-bold text-base'>商品レビュー</p>
                                <div className='pr-5'>☆☆☆☆☆</div>
                            </div>
                            <div className='grid grid-cols-1 gap-5 py-2'>
                            {
                                reviews.length !== 0 ? reviews.map((review: Review, index) => 
                                    <div key={index} className="text-sm border rounded-md shadow-md p-3">
                                        <div className='flex items-end justify-between'>
                                            <p className='text-blue-500 font-mono'>{ (new Date(review.postDate._seconds * 1000).toLocaleDateString())}</p>
                                            <p className='text-xs'>投稿者: <span className='font-bold text-sm'>{ truncate(review.customerName, 15)}</span></p>
                                        </div>
                                        <div className='mt-2 p-2'>
                                            <p className='text-base font-bold tracking-wide py-2'>{truncate(review.title, 30)}</p>
                                            <p className='text-gray-500 text-sm'>{truncate(review.comment, 120)}</p>
                                        </div>
                                    </div>)
                                        : <div className='cols-span-2'>
                                            <p className='text-sm foont-bold text-gray-500 text-center my-12'>まだレビューはありません。</p>
                                        </div>
                            }
                            </div>
                            <div className='pt-3'>
                                <Link href={`/products/post-review/${product.slug}`} passHref><a className='text-blue-500 underline text-sm'>レビューを書く</a></Link>
                            </div>
                        </div>
                    </div>
                    <div className='fixed bottom-0 left-0 right-0 h-fits z-40 bg-white border-t'>
                        <div className={``} >
                            <div className='text-center h-full pb-3 pt-0.5 flex items-end justify-between px-6'>
                                <div className='translate-y-1'>
                                    <p className='text-xs text-start'>販売価格</p>
                                    <p className='text-xs text-red-500'>¥ <span className={`text-2xl font-sans font-bold tracking-wider ${product.totalInventory === 0 ? "line-through" : "" }`}>{Math.floor(variant?.price ?? 0)}</span> 税別</p>
                                </div>
                                <button onClick={addItem} className='w-fit h-full' disabled={isLoading || variant?.quantityAvailable === 0}>
                                    <div className={`flex items-center text-white font-bold px-6 py-2 ${variant?.quantityAvailable === 0 ? "bg-gray-500" : "bg-gradient-to-tl to-green-600 from-lime-600"} rounded-md shadow-md tracking-widest`}>
                                        <p>{variant?.quantityAvailable === 0 ? "売り切れ" : "カートへ追加"}</p>
                                        <motion.div className='-translate-y-1 pl-1' initial={{width:0 , height:0, opacity:0}} animate={{width: isLoading ? 20: 0, height: isLoading ? 12: 12, opacity: isLoading ? 1: 0}}>
                                            <LoadCircle className='animate-spin text-white h-5 w-5' />
                                        </motion.div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductView