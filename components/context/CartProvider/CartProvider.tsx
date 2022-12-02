
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { createCheckout, getCheckoutId, getCheckout, checkoutToCart } from '@shopify/cart'
import { Cart, LineItem } from '@shopify/types/cart'

interface Props  {
    children: ReactNode | ReactNode[]
}

type State = {
    updateCart: (cart: Cart) => void
    cart: Cart
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

const CartModifiers = {
    updateCart: (cart: Cart) => {}
}


const initialState:State = {
    cart: initialCart,
    ...CartModifiers
}

const CartContext = createContext<State>(initialState)

export const CartProvider = ({children}: Props) => {

    const [cart, setCart] = useState<Cart>(initialCart)

    const updateCart = (cart: Cart) => {
        setCart(cart)
    };

    useEffect(() => {

        (async() => {
            const setupCheckout = async () => {
                // CookieにcheckoutIdがなければ
                if(getCheckoutId()) {
                    // CheckoutIdでcheckoutを取得
                    const id = getCheckoutId()
                    const checkout = await getCheckout(id!)
                    if(checkout.completedAt){
                        alert('このチェックアウトは完了しています 時刻:', checkout.completedAt)
                    }
                    const cart = checkoutToCart(checkout);
                    setCart(cart)
                }else{
                    // Checkoutをを新しく作る
                    const checkout = await createCheckout();
                    const cart = checkoutToCart(checkout);
                    setCart(cart)
                }
            }
            setupCheckout()
        })()

    },[])

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