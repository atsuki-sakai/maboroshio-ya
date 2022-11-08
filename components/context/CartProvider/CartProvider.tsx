

import { createCheckout } from '@shopify/cart'
import { Cart } from '@shopify/types/cart'
import { getCheckoutId, normalizeCart } from '@shopify/utils'
import getCheckout from '@shopify/utils/getCheckout'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

interface Props  {
    children: ReactNode | ReactNode[]
}

const initialCart = {
    id: "",
    createdAt: "",
    currency: {
        code: ""
    },
    taxesIncluded: false,
    lineItemsSubtotalPrice: 0.0,
    totalPrice: 0.0,
    lineItems: [],
    discounts: []
}

const CartContext = createContext<any>(initialCart)

export const CartProvider = ({children}: Props) => {

    const [cart, setCart] = useState<Cart>(initialCart)

    const updateCart = (cart: Cart) => setCart(cart);

    useEffect(() => {
        const f = async () => {
            if(getCheckoutId()) {
                // CheckoutIdでcheckoutを取得
                const id = getCheckoutId()
                const checkout = await getCheckout(id!)
                const cart = normalizeCart(checkout);
                setCart(cart)
            }else{
                // Checkoutをを新しく作る
                const checkout = await createCheckout();
                const cart = normalizeCart(checkout);
                setCart(cart)
            }
        }
        f();
    })

    const value = useMemo(() => {
        return {
            cart,
            updateCart
        }
    }, [cart])

    return (
        <CartContext.Provider value={value!}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}