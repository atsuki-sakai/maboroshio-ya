
import { checkoutToCart } from '@shopify/cart'
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from '@shopify/const'
import { getCustomer, getCustomerAccessToken } from '@shopify/customer'
import { useCart } from "@components/context"
import { Customer } from '@shopify/shema'
import Cookies from 'js-cookie'
import React, { useContext, createContext, useMemo, useState, useEffect, ReactNode } from 'react'
import checkout from 'pages/api/cart/checkout'
import { Cart } from '@shopify/types/cart'

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