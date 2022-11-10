

import { FC, useState, useEffect } from 'react'
import Image from 'next/image';
import { Product } from '@shopify/types/product'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import { Container } from "@components/ui";
import { useCart, useUI } from '@components/context';
import { Choices, getVariant } from '../helpers'
import checkoutLineItemsAdd from '@shopify/cart/checkout-lineitems-add';
import { checkoutToCart, getCheckoutId } from '@shopify/cart';



interface Props {
    product: Product
}


const ProductView: FC<Props> = ({ product }) => {

    const { cart, updateCart } = useCart()
    const { onCartOpen } = useUI()

    const initialOptions = () => {
        let initialOptions: {[key: string]: string} = {}
        product.variants[0].options.map((option) => {
            initialOptions = {
                ...initialOptions,
                [option.displayName.toLocaleLowerCase()]:option.values[0].label.toLocaleLowerCase()
            }
        })
        return initialOptions
    }
    const [ choices, setChoices ] = useState<Choices>(initialOptions());
    const variant = getVariant(product, choices)


    const addProduct = async () => {
        
            const variable = {
                checkoutId: getCheckoutId() ?? cart.id,
                lineItems: {
                    variantId: variant!.id,
                    quantity: 1
                }
            }
            const checkout = await checkoutLineItemsAdd(variable)
            console.log("product view checkout :", checkout)
            const newCart = checkoutToCart(checkout)
            console.log(newCart)
            // updateCart(newCart)
            // console.log(cart)
            // onCartOpen()

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
                            <p className='text-base text-red-500'>¥ <span className={`text-2xl font-sans font-bold ${product.totalInventory === 0 ? "line-through" : "" }`}>{variant?.price}</span> 税込</p>
                            {
                                product.totalInventory === 0 ? <p className='bg-gray-600 text-white px-4 py-0.5'>売り切れ</p> : ""
                            }
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
                                                <div className={`text-xs ml-2 px-3 py-3 rounded-full h-12 w-12 flex justify-center items-center shadow-md transfrom duration-300 ease-in-out ${ activeChoice === value.label ? "scale-110 border border-green-300" : "bg-gray-100 scale-95" }`} key={index} onClick={() => {
                                                    setChoices({
                                                        ...choices,
                                                        [option.displayName.toLocaleLowerCase()]: value.label.toLocaleLowerCase(),
                                                        price: String(product.variants[index].price)
                                                    })
                                                }}>
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
                        <div className="p-3">
                            <p className='text-gray-500'>{product.description}</p>
                        </div>
                    </div>
                    <div className='fixed bottom-0 left-0 bg-orange-600 w-1/2 rounded-tr-md z-50'>
                        <button onClick={addProduct} className='w-full h-full'>
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