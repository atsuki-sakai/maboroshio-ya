

import { getCustomer } from '@shopify/auth'
import getCustomerAccessToken from '@shopify/auth/get-customer_access_token'
import { Customer } from '@shopify/shema'
import React, { useContext, createContext, useMemo, useState, useEffect, ReactNode } from 'react'

interface Props {
    children: ReactNode | ReactNode[]
}

type LoginState = {
    loggedCustomer: Customer | undefined
    updateLoginCustomer: (customer: Customer) => void
}

const initialState: LoginState = {
    loggedCustomer: undefined,
    updateLoginCustomer: (customer: Customer) => {}

}
const LoginProviderContext = createContext<LoginState>(initialState)

export const LoginProvider = ({ children }: Props) => {

    const [ loggedCustomer, setCustomer ] = useState<Customer | undefined>()

    const updateLoginCustomer = (customer: Customer) => {
        setCustomer(customer)
    }

    useEffect(() => {

        (async() => {
            const setUpLoginState = async () => {
                if(getCustomerAccessToken()){
                    const customer = await getCustomer(getCustomerAccessToken()!)
                    setCustomer(customer)
                }else{
                    setCustomer(undefined)
                }
            }
            setUpLoginState()
        })

    }, [loggedCustomer])

    const value = useMemo(() => {
        return {
            loggedCustomer,
            updateLoginCustomer
        }
    },[loggedCustomer])

    return (
        <LoginProviderContext.Provider value={value}>
            { children }
        </LoginProviderContext.Provider>
    )
}

export const useLoginState = () => {
    const context = useContext(LoginProviderContext);
    return context;
}