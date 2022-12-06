
import { checkoutToCart } from '@shopify/cart'
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from '@shopify/const'
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

    const loggedCustomerRecoverCheckout = () => {
        if(loggedCustomer?.lastIncompleteCheckout){

            Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE!)
            Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE!)

            const options = {
                expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
            }

            Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!,loggedCustomer.lastIncompleteCheckout.id, options)
            Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!, loggedCustomer.lastIncompleteCheckout.id, options)
            const cart = checkoutToCart(loggedCustomer.lastIncompleteCheckout)

            updateCart(cart)
        }
    }

    const updateCustomer = (customer?: Customer) => {
        setLoggedCustomer(customer)
    }

    useEffect(() => {
        (async() => {
            const setUpLoginState = async () => {
                if(getCustomerAccessToken()!){
                    // setupCustomer
                    const customer = await getCustomer(getCustomerAccessToken()!)
                    setLoggedCustomer(customer)
                    loggedCustomerRecoverCheckout()
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