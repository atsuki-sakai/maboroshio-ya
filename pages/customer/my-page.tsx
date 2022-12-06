
import React, { useState } from 'react'
import Link from 'next/link'
import { Container, AlertDialog } from '@components/ui'
import { checkoutCustomerDisassociate } from "@shopify/customer"
import { useCustomerState } from '@components/context'
import { useRouter } from 'next/router'
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN } from '@shopify/const'
import { checkoutShippingAddressUpdate, getCheckoutId } from '@shopify/cart'
import { LoadCircle } from '@components/icon'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import provinceToJP from '@lib/province-to-jp'


const MyPage = () => {

    const router = useRouter()
    const { loggedCustomer, updateCustomer } = useCustomerState()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorText, setErrorText ] = useState("")

    const logout = async () => {
        try{
            setIsLoading(true)
            await checkoutShippingAddressUpdate(getCheckoutId()!)
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
    const orders = loggedCustomer && loggedCustomer!.orders?.edges.map(({node: order}) => order);

    console.log(loggedCustomer)

    return (
        <Container>
            { errorText ? <AlertDialog title='エラー' message={errorText} onClose={() => setErrorText("")} /> : <></>}
            <div className="px-8">
                <div className='flex items-end justify-between pt-6 pb-4'>
                    <h3 className='font-bold'>お客様の注文履歴</h3>
                    <div>
                        <button className="px-3 py-1 textp-center bg-gray-300 rounded-md" onClick={logout} disabled={isLoading}>
                            <div className='flex items-center text-center w-full justify-between'>
                                <p className='text-gray-500 text-xs font-bold'>ログアウト</p>
                                <motion.div className="ml-1 mr-1 -translate-y-1" initial={{ opacity:0, height:6, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                                <LoadCircle className='text-white h-5 w-5 animate-spin'/>
                                </motion.div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='pt-3'>
                    {
                        orders ? orders.length === 0 ?  <div className='col-span-2 text-gray-500 text-sm h-20'>まだ注文履歴はありません</div>
                        :   <div className='grid grid-cols-2 gap-3'>
                                {
                                    orders.map((order, index) => {
                                        return  <div key={index}>
                                                    <p>{order.id}</p>
                                                </div>
                                    })
                                }
                            </div> : <div className="col-span-2 text-gray-500 text-sm h-20">まだ注文履歴はありません</div>
                    }
                </div>
                <div className="flex items-start justiry-between py-12">
                    <div className='w-full'>
                        <p className='font-bold mb-3'>配送情報</p>
                        {
                            defaultAddress ? <div className='text-gray-500 text-sm'>
                                                <div className='h-fit'>
                                                    <p>{defaultAddress?.lastName}{defaultAddress?.firstName}</p>
                                                    <p>{defaultAddress?.company}</p>
                                                    <p>{defaultAddress?.phone}</p>
                                                    <p>{provinceToJP(defaultAddress?.province!)}</p>
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
                                            : <div>
                                                <div className='pt-5 h-20 text-gray-500 text-sm'>配送情報はありません</div>
                                                <div>
                                                    <Link href={"/customer/address-update"}>
                                                        <a>
                                                            <div className='bg-green-100 w-fit px-3 py-1 rounded-md mt-3'>
                                                                <p className='text-xs text-green-500'>配送情報を作成</p>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                        }
                    </div>
                    <div className='w-full'>
                        <p className="font-bold mb-3">アカウント情報</p>
                        <div className='text-xs font-gray-500 space-y-3'>
                            <p>{loggedCustomer?.lastName}{loggedCustomer?.firstName}</p>
                            <p>{loggedCustomer?.email}</p>
                            <p>メルマガ{loggedCustomer?.acceptsMarketing ? "購読中" : "未購読"}</p>
                        </div>
                        <div>
                            <Link href={"/customer/customer-update"}>
                                <a>
                                    <div className='bg-green-100 w-fit px-3 py-1 rounded-md mt-3'>
                                        <p className='text-xs text-green-500'>アカウントを編集する</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MyPage