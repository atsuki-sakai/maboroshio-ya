

import { createCheckout } from '@shopify/cart'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '@shopify/const'
import { Cart } from '@shopify/types/cart'
import { getCheckoutId, normalizeCart } from '@shopify/utils'
import getCheckout from '@shopify/utils/getCheckout'
import Cookies from 'js-cookie'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'

interface Props  {
    children: ReactNode | ReactNode[]
}

const CartContext = createContext<Cart | undefined>(undefined)

export const CartProvider = ({children}: Props) => {

    useEffect(() => {

        (async () => {
            if(getCheckoutId()) {
                // CheckoutIdでcheckoutを取得
                console.log("cookie: ",getCheckoutId())
                const id = getCheckoutId()
                const checkout = await getCheckout(id!)
                const cart = normalizeCart(checkout);
                console.log("cart1: ",cart)
            }else{
                // Checkoutをを新しく作る
                console.log("new checkout")
                const checkout = await createCheckout();
                const cart = normalizeCart(checkout);
                console.log("cart2: ",cart)
            }
        })
    }, [])

    return (
        <CartContext.Provider value={undefined}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}