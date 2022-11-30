

import { getCustomer, getCustomerAccessToken } from '@shopify/customer'
import { Customer } from '@shopify/shema'
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

    const updateCustomer = (customer?: Customer) => {
        setLoggedCustomer(customer)
    }

    useEffect(() => {
        (async() => {
            const setUpLoginState = async () => {
                if(getCustomerAccessToken()){
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