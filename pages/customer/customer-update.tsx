import React, { useState } from 'react'
import { useCustomerState } from '@components/context'
import { Container, Field,  AlertDialog } from '@components/ui'
import { customerUpdate, getCustomerAccessToken } from "@shopify/customer"
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from '@shopify/const'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const CustomerUpdate = () => {

    const router = useRouter()
    const { loggedCustomer, updateCustomer } = useCustomerState()
    const [ updateCredential, setUpdateCredential ] = useState<{[key: string]: any}>({
        lastName: loggedCustomer?.lastName ?? "",
        firstName: loggedCustomer?.firstName ?? "",
        email: loggedCustomer?.email ?? "",
        acceptsMarketing: loggedCustomer?.acceptsMarketing ?? false
    })
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)

    const editCustomer =  async() => {
        try{
            setIsLoading(true)
            const newCustomer = {
                lastName: updateCredential.lastName,
                firstName: updateCredential.firstName,
                email: updateCredential.email,
                acceptsMarketing: updateCredential.acceptsMarketing
            }
            const { customer, customerAccessToken } = await customerUpdate(newCustomer, getCustomerAccessToken()!)
            if(customerAccessToken) {
                Cookies.remove(SHOPIFY_CUSTOMER_ACCESS_TOKEN!)
                const options = {
                    expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
                }
                Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, customerAccessToken.accessToken, options)
            }
            if(customer){
                updateCustomer(customer!)
            }
            router.push("/")
        }catch(e: any){
            setErrorMessage(e.message)
        }finally{
            setIsLoading(false)
        }
    }

    console.log(updateCredential)

    return (
        <Container>
            {
                errorMessage ? <AlertDialog title='ERROR' message={errorMessage} onClose={() => {setErrorMessage('')}}/> : <></>
            }
            <div className='px-8 py-12'>
                <h3 className="font-bold text-xl mb-8">アカウント情報の更新</h3>
                <div className='space-y-2'>
                    <Field id='lastName' label={"苗字"} type={"text"} autoComplete="family-name" placeHolder={"山田"} value={updateCredential.lastName} onChange={(e) => setUpdateCredential({...updateCredential, lastName: e.target.value})} />
                    <Field id="firstName" label="名前" type='text' autoComplete='given-name' placeHolder='太郎' value={updateCredential.firstName} onChange={(e) => setUpdateCredential({...updateCredential, firstName: e.target.value})} />
                    <Field id={"email"} label={"メールアドレス"} type={"email"} autoComplete={"email"} value={updateCredential.email} placeHolder={"株式会社 〇〇建設"} onChange={(e) => setUpdateCredential({...updateCredential, email: e.target.value})}/>
                    <div className="flex items-center justify-center pt-2">
                        <input id='defaultAddress' type="checkbox" checked={updateCredential.acceptsMarketing} onChange={() => setUpdateCredential({...updateCredential, acceptsMarketing: !updateCredential.acceptsMarketing})} />
                        <label className="ml-3 text-sm" htmlFor="defaultAddress">メルマガを購読する</label>
                    </div>
                </div>
                <div className='w-fit mx-auto pt-8'>
                    <button className='px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md' onClick={editCustomer} disabled={isLoading}>
                        <div className='flex items-center justify-between'>
                            <p className='text-white font-bold'>アカウントを更新</p>
                            <motion.div className="ml-2 -translate-y-1.5" initial={{ opacity:0, height:12, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                                <LoadCircle className='text-white h-6 w-6 animate-spin'/>
                            </motion.div>
                        </div>
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default CustomerUpdate