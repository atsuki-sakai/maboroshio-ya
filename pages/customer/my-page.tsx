
import React, { useState } from 'react'
import Link from 'next/link'
import { Container, AlertDialog } from '@components/ui'
import { checkoutCustomerDisassociate } from "@shopify/customer"
import { useCustomerState } from '@components/context'
import { useRouter } from 'next/router'
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN } from '@shopify/const'
import { getCheckoutId } from '@shopify/cart'
import { LoadCircle } from '@components/icon'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'


const MyPage = () => {

    const router = useRouter()
    const { loggedCustomer, updateCustomer } = useCustomerState()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorText, setErrorText ] = useState("")

    const logout = async () => {
        try{
            setIsLoading(true)
            await checkoutCustomerDisassociate(getCheckoutId()!)
            Cookies.remove(SHOPIFY_CUSTOMER_ACCESS_TOKEN!)
            updateCustomer(undefined)
            setTimeout(() => {
                router.push('/')
            }, 300)
        }catch(e: any){
            setErrorText(e.message)
        }finally{
            setIsLoading(false)
        }
    }

    const defaultAddress = loggedCustomer && loggedCustomer!.defaultAddress
    const orders = loggedCustomer && loggedCustomer!.orders.edges.map(({node: order}) => order);
    console.log("mypage default address: ",defaultAddress?.id)

    return (
        <Container>
            { errorText ? <AlertDialog title='エラー' message={errorText} onClose={() => setErrorText("")} /> : <></>}
            <div className="px-8">
                <div className='flex items-end justify-between pt-6 pb-4'>
                    <h3 className='font-bold'>お客様の注文履歴</h3>
                    <button className="px-3 py-1 textp-center bg-gray-500 rounded-md" onClick={logout} disabled={isLoading}>
                        <div className='flex items-center text-center w-full justify-between'>
                            <p className='text-white text-sm font-bold'>ログアウト</p>
                            <motion.div className="ml-1 mr-1 -translate-y-1" initial={{ opacity:0, height:6, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                            <LoadCircle className='text-white h-5 w-5 animate-spin'/>
                            </motion.div>
                        </div>
                    </button>
                </div>
                <div className='pt-3 grid grid-cols-2 gap-3'>
                    {
                        orders?.length !== 0 ? "ok": <div className='col-span-2 text-gray-500 text-sm h-20'>まだ注文履歴はありません</div>
                    }
                </div>
                <div className="py-12">
                    <p className='font-bold mb-3'>アカウント詳細</p>
                    {
                        defaultAddress ? <div className='text-gray-500 text-sm'>
                                            <div className='h-fit'>
                                                <p>{defaultAddress?.lastName}{defaultAddress?.firstName}</p>
                                                <p>{defaultAddress?.company}</p>
                                                <p>{defaultAddress?.phone}</p>
                                                <p>{defaultAddress?.province}</p>
                                                <p>{defaultAddress?.city}</p>
                                                <p>{defaultAddress?.address1}</p>
                                                <p>{defaultAddress?.address2}</p>
                                            </div>
                                            <div>
                                                <Link href={"/customer/address-update"}>
                                                    <a>
                                                        <div className='bg-green-100 w-fit px-3 py-1 rounded-md mt-3'>
                                                            <p className='text-xs text-green-500'>配送情報を編集する</p>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        : <div className='h-20 text-gray-500'>配送情報はありません</div>
                    }
                </div>
            </div>
        </Container>
    )
}

export default MyPage