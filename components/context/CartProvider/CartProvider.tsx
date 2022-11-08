

import { createCheckout } from '@shopify/cart'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '@shopify/const'
import { Cart } from '@shopify/types/cart'
import Cookies from 'js-cookie'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'

interface Props  {
    children: ReactNode | ReactNode[]
}

const CartContext = createContext<Cart | undefined>(undefined)



export const CartProvider = ({children}: Props) => {

    let initialValue: Cart
    useEffect(() => {

        (async () => {
            const checkout_cookie = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE!);

            console.log("checkoutCookie: ",checkout_cookie)

            if(checkout_cookie) {
                // CheckoutIdでcheckoutを取得
            }else{
                // Checkoutをを新しく作る
                const checkout = await createCheckout();
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