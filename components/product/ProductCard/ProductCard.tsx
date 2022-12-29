import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@shopify/types/product'
import { truncate } from '@lib/truncate'
import { ProductReviewInfo } from '@firebase/types/review'
import { numberToStar } from '@lib/number-to-star'
import { Cart, LoadCircle } from '@components/icon'
import { checkoutLineItemsAdd, checkoutShippingAddressUpdate, createCheckout } from '@shopify/cart'
import { useCustomerState, useUI } from '@components/context'
import { MailingAddress } from '@shopify/shema'
import { checkoutCustomerAssociate, getCustomerAccessToken } from '@shopify/customer'

interface Props {
    product: Product
    productReviewInfo: ProductReviewInfo | null
    showBuyNow?: boolean
}

const placeholderImage = "/images/product-image-placeholder.svg"

const ProductCard = ({product, productReviewInfo, showBuyNow = false} : Props) => {

    const { onCartClose } = useUI()
    const { loggedCustomer } = useCustomerState()
    const [ isLoading, setIsLoading ] = useState(false)

    const buyNow = async() => {
        try{
            setIsLoading(true)
            const checkout = await createCheckout()
            const addItemCheckout = await checkoutLineItemsAdd({checkoutId:checkout.id, lineItems:{ variantId: product.variants[0].id,quantity: 1 }})
            if(loggedCustomer) {
                await checkoutShippingAddressUpdate(checkout.id, loggedCustomer.defaultAddress as MailingAddress)
                await checkoutCustomerAssociate(checkout.id, getCustomerAccessToken()!)
            }
            document.location.href = addItemCheckout.webUrl
        }catch(e: any){
            alert(e.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div key={product.id} className="rounded-md overflow-hidden" onClick={onCartClose}>
            <Link href={`/products/${product.slug}`} passHref>
                <a>
                    {
                        product.images && <div className='relative'>
                                            <Image
                                                alt={product.name ?? "Product Image"}
                                                src={product.images[0].url ?? placeholderImage}
                                                height={320}
                                                width={320}
                                                quality="85"
                                                layout='responsive'
                                                className='rounded-md transform duration-1000 ease-in-out hover:scale-105'
                                            />
                                            {
                                                product.totalInventory === 0 ?
                                                <div className='absolute top-0 left-0'>
                                                    <div className='px-3 py-1 bg-gray-600 rounded-tl-md rounded-br-md'>
                                                        <p className='text-white text-xs'>売り切れ</p>
                                                    </div>
                                                </div>
                                                : <></>
                                            }
                                        </div>
                    }
                    <div className='w-full flex justify-end items-center'>
                        <div className='text-yellow-500'>{numberToStar(productReviewInfo?.score ?? 0)}</div>
                        <div className='flex items-end justify-center font-sans'>
                            <p className='text-sm text-blue-500 ml-3'>{productReviewInfo?.numberOfTotalReview ?? 0}</p>
                            <p className='text-black text-xs scale-75'> 件</p>
                        </div>
                    </div>
                    <h4 className='text-xs font-sans text-gray-800 text-center'>
                        { truncate(product.name, 25) }
                    </h4>
                    <p className='text-end text-red-500 text-xs font-thin'><span className='text-lg font-medium'>¥ { Number(product.priceRange.minVariantPrice.amount) }</span> 税込</p>
                </a>
            </Link>
            {
                showBuyNow ? <div className='mt-2'>
                                <button className={`transform duration-300 ease-linear ${isLoading ? "bg-gray-600": "bg-yellow-500"} w-fit mx-auto px-3 py-1 flex items-center justify-center rounded-full shadow-full overflow-hidden`} onClick={buyNow} disabled={isLoading}>
                                    <p className='text-xs text-white font-bold'>
                                        { isLoading ? "決済処理中": "今すぐ購入" }
                                    </p>
                                    {
                                        isLoading ? <div className='transition pl-2'><LoadCircle className='h-5 w-5 text-white animate-spin'></LoadCircle></div> : <Cart className='pl-2 h-6 w-6 text-white'/>
                                    }
                                </button>
                            </div> : null
            }
        </div>
    )
}

export default ProductCard