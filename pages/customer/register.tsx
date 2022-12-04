
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, AlertDialog, Field } from "@components/ui"
import { createCustomer, getCustomerAccessToken, loginCustomer } from '@shopify/customer'
import { useCustomerState } from '@components/context'
import Cookies from 'js-cookie'
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from '@shopify/const'
import { motion } from 'framer-motion'
import LoadCircle from '@components/icon/LoadCircle'

const Register = () => {

    const router = useRouter()
    const { updateCustomer } = useCustomerState()
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ isLoading, setIsLoading] = useState(false)
    const [ credential, setCredential ] = useState<{[key:string]: any}>({
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      acceptMarketing: true
    })

    const completedFields = credential.lastName !== "" && credential.firstName !== "" && credential.email !== "" && credential.password !== ""

    const createAccount = async() => {
      if(!completedFields){
        setErrorMessage('未入力の項目があります。再度入力フォームを確認の上ご登録ください。')
        return;
      }
      try{
        setIsLoading(true)
        const { customerUserErrors } = await createCustomer(credential.email, credential.password, credential.acceptMarketing, credential.firstName, credential.lastName)
        if(customerUserErrors[0]){
          throw Error(customerUserErrors[0].message)
        }
        const { customer } = await loginCustomer(credential.email, credential.password);
        updateCustomer(customer)
        const options = {
          expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE!
        }
        Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, getCustomerAccessToken()!, options)
        router.push('/')
      }catch(e: any){
        setErrorMessage(e.message)
      }finally{
        setIsLoading(false)
      }
    }

    return (
      <Container>
        <div className='relative'>
          <div className='px-6 py-4'>
            <div className="w-full text-start pl-5">
              <h1 className='block text-3xl font-bold'>会員登録</h1>
              <p className='block text-xs'>アカウントを作成してお得に買い物しよう。</p>
            </div>
            <div className='px-6 py-12 space-y-3'>
              <form>

                <Field
                  id='lastName'
                  label={"苗字"}
                  type={"text"}
                  autoComplete="family-name"
                  placeHolder={"山田"}
                  value={credential.lastName}
                  onChange={(e) => setCredential({...credential, lastName: e.target.value})}
                  required={true}
                />
                <Field
                  id="firstName"
                  label="名前"
                  type='text'
                  autoComplete='given-name'
                  placeHolder='太郎'
                  value={credential.firstName}
                  onChange={(e) => setCredential({...credential, firstName: e.target.value})}
                  required={true}
                />
                <Field
                  id='email'
                  label='メールアドレス'
                  type="email"
                  autoComplete='email'
                  placeHolder='sample@email.com'
                  value={credential.email}
                  onChange={(e) => setCredential({...credential, email: e.target.value})}
                  required={true}
                />
                <Field
                  id='password'
                  label='パスワード'
                  type='password'
                  autoComplete='password'
                  placeHolder='password'
                  value={credential.password}
                  onChange={(e) => setCredential({...credential, password: e.target.value})}
                  required={true}
                />
              </form>
              <div className='flex justify-start items-center pt-5'>
                <input id="acceptMarketing" className={`mr-2 h-5 w-5`} type="checkbox" value={credential.acceptMarketing} onChange={(_) => setCredential({...credential, acceptMarketing: !credential.acceptMarketing})} checked={credential.acceptMarketing}/>
                <label htmlFor="acceptMarketing" className='text-sm text-gray-500'>メルマガを希望する</label>
              </div>
              <div className='w-fit mx-auto pt-8'>
                <button className='px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md' onClick={createAccount} disabled={isLoading}>
                  <div className='flex items-center justify-between'>
                    <p className='text-white font-bold'>アカウントを作成</p>
                    <motion.div className="ml-2 -translate-y-1.5" initial={{ opacity:0, height:12, width:0 }} animate={{ opacity: isLoading ? 1: 0, height:12, width: isLoading ? 12: 0 }}>
                      <LoadCircle className='text-white h-6 w-6 animate-spin'/>
                    </motion.div>
                  </div>
                </button>
              </div>
              <div className='pt-8 w-full text-center'>
                <Link href={"/customer/login"} passHref>
                  <a className='text-sm text-blue-600 underline'>
                    アカウントをすでにお持ちですか？
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {
            errorMessage ? <AlertDialog title='会員登録エラー' message={errorMessage === "Unidentified customer" ? "ユーザーが見つかりませんでした。再度入力値が正しいかご確認の上お試しください。": errorMessage} onClose={() => setErrorMessage('')} /> : <></>
          }
        </div>
      </Container>
    )
}

export default Register