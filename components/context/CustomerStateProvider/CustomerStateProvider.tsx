

import { checkoutToCart } from '@shopify/cart'
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE } from '@shopify/const'
import { getCustomer, getCustomerAccessToken } from '@shopify/customer'
import { useCart } from "@components/context"
import { Customer } from '@shopify/shema'
import Cookies from 'js-cookie'
import React, { useContext, createContext, useMemo, useState, useEffect, ReactNode } from 'react'

interface Props {
    children: ReactNode | ReactNode[]
}

type LoginState = {
    loggedCustomer: Customer | undefined
    updateCustomer: (customer?: Customer) => void
}

const initialState: LoginState = {
    loggedCustomer: undefined,
    updateCustomer: (customer?: Customer) => {}

}
const CustomerStateProviderContext = createContext<LoginState>(initialState)

export const CustomerStateProvider = ({ children }: Props) => {

    const [ loggedCustomer, setLoggedCustomer ] = useState<Customer | undefined>()
    const { updateCart } = useCart()

    const updateCustomer = (customer?: Customer) => {
        console.log("customer: ",customer)
        setLoggedCustomer(customer)
    }

    useEffect(() => {
        (async() => {
            const setUpLoginState = async () => {
                if(getCustomerAccessToken()){

                    // setupCustomer
                    const customer = await getCustomer(getCustomerAccessToken()!)
                    setLoggedCustomer(customer)
                    // ログインしたユーザーのカートを復元
                    if(customer.lastIncompleteCheckout){

                        Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE!)
                        Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE!)

                        const options = {
                            expires: 90
                        }
                        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!, customer.lastIncompleteCheckout.id, options)
                        Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!, customer.lastIncompleteCheckout.webUrl, options)
                        const cart = checkoutToCart(customer.lastIncompleteCheckout)
                        updateCart(cart)
                    }

                }
            }
            setUpLoginState()
        })()

    }, [])

    const value = useMemo(() => {
        return {
            loggedCustomer,
            updateCustomer
        }
    },[loggedCustomer])

    return (
        <CustomerStateProviderContext.Provider value={value}>
            { children }
        </CustomerStateProviderContext.Provider>
    )
}

export const useCustomerState = () => {
    const context = useContext(CustomerStateProviderContext);
    return context;
}