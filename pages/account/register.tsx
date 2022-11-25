
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, AlertDialog, Field } from "@components/ui"
import { createCustomer, loginCustomer } from '@shopify/auth'
import { useCustomerState } from '@components/context'
import Cookies from 'js-cookie'
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from '@shopify/const'
import { motion } from 'framer-motion'

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
      phone: "",
      acceptMarketing: true,
    })

    const completedFields = credential.lastName !== "" && credential.firstName !== "" && credential.email !== "" && credential.password !== ""

    const createAccount = async() => {
      if(!completedFields){
        setErrorMessage('未入力の項目があります。再度入力フォームを確認の上ご登録ください。')
        return;
      }
      try{
        setIsLoading(true)
        const { customerUserErrors } = await createCustomer(credential.email, credential.password, credential.acceptMarketing, credential.firstName, credential.lastName, credential.phone)
        if(customerUserErrors[0]){
          throw Error(customerUserErrors[0].message)
        }
        const { customer, customerAccessToken } = await loginCustomer(credential.email, credential.password);
        updateCustomer(customer)
        const options = {
          expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE!
        }
        Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, customerAccessToken.accessToken, options)
        router.push('/')
      }catch(e: any){
        setErrorMessage(e.message)
      }finally{
        setIsLoading(false)
      }
    }

    console.log(credential)
    return (
      
      <Container>
        <div className='relative'>
          <div className='px-6 py-4'>
            <div className="w-full text-start pl-5">
              <h1 className='block text-3xl font-bold'>会員登録</h1>
              <p className='block text-xs'>アカウントを作成してお得に買い物しよう。</p>
            </div>
            <div className='px-6 py-12 space-y-3'>
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
              <Field
                id='phone'
                label='電話番号'
                type='number'
                autoComplete="phone"
                placeHolder='09012345678'
                value={credential.phone}
                onChange={(e) => setCredential({...credential, phone: e.target.value})}
              />
              <div className='flex justify-center items-center mt-5'>
                <label htmlFor="acceptMarketing" className='text-sm text-gray-500'>メルマガを希望する</label>
                <input id="acceptMarketing" className={`ml-2 h-5 w-5`} type="checkbox" value={credential.acceptMarketing} onChange={(_) => setCredential({...credential, acceptMarketing: !credential.acceptMarketing})} checked={credential.acceptMarketing}/>
              </div>
              <div className='w-fit mx-auto pt-8'>
                <button className='px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md' onClick={createAccount} disabled={isLoading}>
                  <p className='text-white font-bold'>アカウントを作成</p>
                </button>
              </div>
              <div className='pt-8 w-full text-center'>
                <Link href={"/account/login"} passHref>
                  <a className='text-sm text-blue-600 underline'>
                    アカウントをすでにお持ちですか？
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {
            errorMessage ? <AlertDialog title='会員登録エラー' message={errorMessage} onClose={() => setErrorMessage('')} /> : <></>
          }
        </div>
      </Container>
    )
}

export default Register