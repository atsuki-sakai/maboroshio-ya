
import React, { useState } from 'react'
import { Container, Field, AlertDialog } from '@components/ui'
import { customerRecover } from "@shopify/customer"
import { motion } from 'framer-motion'
import { LoadCircle } from '@components/icon'

const RecoverPassword = () => {

    const [ email, setEmail ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorText, setErrorText ] = useState("")
    const [ sended, setSended ] = useState(false)
    const recoverPassword = async() => {

        try{
            setIsLoading(true)
            await customerRecover(email)
            setSended(true)
            setErrorText('メールアドレスにパスワード復旧リンクを送信しました。そちらからパスワードを再設定してください。')
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
                        errorText ? <AlertDialog title={ sended ? "復旧用リンクを送信しました。" : "Error" } message={errorText} onClose={() => setErrorText('')} /> : <></>
                    }
                    <h1 className='text-xl font-bold mb-6'>パスワードを再設定</h1>
                    <Field id={"email"} autoComplete="email" label={"メールアドレス"} value={email} onChange={(e) => setEmail(e.target.value)} placeHolder={"sample@email.com"} />
                    <div className='w-fit mx-auto pt-8'>
                        <button className={`px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md`} onClick={recoverPassword} disabled={isLoading}>
                            <div className='flex items-center justify-between'>
                                <p className='text-white font-bold'>復旧する</p>
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

export default RecoverPassword