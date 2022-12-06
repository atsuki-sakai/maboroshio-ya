
import React, { useState } from 'react'
import { AlertDialog, Container, Field } from '@components/ui'
import { customerResetByUrl, customerResetPassword } from "@shopify/customer"
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'
import { useRouter } from 'next/router'

const PasswordReset = () => {

    const router = useRouter()
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")

    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorText, setErrorText ] = useState("")
    const query = router.query;

    const resetPassword = async() => {

        try{
            setIsLoading(true)
            if(!(password === confirmPassword)){
                setErrorText('パスワードが一致していません。再度ご確認ください。')
            }
            console.log('query: ', query)
            await customerResetByUrl(password, query)

        }catch(e: any){
            setErrorText(e.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Container>
             <div className='my-32'>
                <div className=' px-8'>
                    {
                        errorText ? <AlertDialog title={"Error"} message={errorText} onClose={() => setErrorText('')} /> : <></>
                    }
                    <h1 className='text-xl font-bold mb-6'>パスワードを再設定する</h1>

                    <div className='space-y-3'>
                        <Field id={"password"} autoComplete="password" label={"パスワード"} value={password} onChange={(e) => setPassword(e.target.value)} placeHolder={"パスワード"} />
                        <Field id={"confirmPassword"} type="password" label={"パスワード確認用"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeHolder={"パスワード確認用"} />
                    </div>
                    <div className='w-fit mx-auto pt-8'>
                        <button className={`px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md`} onClick={resetPassword} disabled={isLoading}>
                            <div className='flex items-center justify-between'>
                                <p className='text-white font-bold'>リセットする</p>
                                <motion.div className="ml-2 -translate-y-1.5" initial={{ opacity:0, height:12, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                                <LoadCircle className='text-white h-6 w-6 animate-spin'/>
                                </motion.div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default PasswordReset
