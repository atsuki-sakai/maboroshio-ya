
import React from 'react'
import { Container } from '@components/ui'
import { useCustomerState } from '@components/context'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN } from '@shopify/const'

const MyPage = () => {

    const router = useRouter()
    const { loggedCustomer, updateCustomer } = useCustomerState()

    const logout = () => {
        Cookies.remove(SHOPIFY_CUSTOMER_ACCESS_TOKEN!)
        updateCustomer(undefined)
        router.push('/')
    }

    return (
        <Container>
            <div className='w-fit mx-auto my-4'>
                <button onClick={logout}>
                    <div className='bg-red-100 px-6 py-1 rounded-md'>
                        <p className='text-red-500'>Logout</p>
                    </div>
                </button>
            </div>
            <br />
            { JSON.stringify(loggedCustomer, null, 2) }
        </Container>
    )
}

export default MyPage