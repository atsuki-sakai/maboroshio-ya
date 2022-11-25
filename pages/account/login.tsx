
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AlertDialog, Container, Field } from "@components/ui"
import { loginCustomer } from '@shopify/auth'
import { useCustomerState } from "@components/context"
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from '@shopify/const'
import Cookies from 'js-cookie'

const Login = () => {

    const router = useRouter()
    const { updateCustomer } = useCustomerState()

    const [ credential, setCredential ] = useState<{[key:string]: any}>({
      email: "",
      password: ""
    })
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const completedFields = credential.email !== "" && credential.password !== ""

    const login = async() => {

      if(!completedFields){
        setErrorMessage('未入力の項目があります。再度入力フォームを確認の上ログインしてください。')
        return;
      }
      try{
        setIsLoading(true)
        const { customer, customerAccessToken } = await loginCustomer(credential.email, credential.password);
        updateCustomer(customer)
        const options = {
          expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE!
        }
        Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, customerAccessToken.accessToken, options)
        router.push("/")
      }catch(e: any){
        setErrorMessage(e.message)
      }finally{
        setIsLoading(false)
      }
    }

    return (
      <Container>
        <div className='px-6 py-4'>
          <div className="w-full text-start pl-5">
            <h1 className='block text-3xl font-bold'>ログインする</h1>
          </div>
          <div className='px-6 py-12 space-y-2'>
            <Field
              id='email'
              label="メールアドレス"
              value={credential.email}
              autoComplete="email"
              placeHolder="sample@email.com"
              onChange={(e) => setCredential({...credential, email: e.target.value})}
              required={true}
            />
            <Field
              id='password'
              label="パスワード"
              value={credential.password}
              autoComplete="password"
              placeHolder="password"
              onChange={(e) => setCredential({...credential, password: e.target.value})}
              required={true}
            />
            <div className='w-fit mx-auto pt-8'>
              <button className={`px-6 py-2 textp-center ${isLoading ? "bg-gray-300" : "bg-gradient-to-tl to-blue-500 from-sky-400"} rounded-md`} onClick={login} disabled={isLoading}>
                <p className='text-white font-bold'>ログインする</p>
              </button>
            </div>
            <div className='pt-8 w-full text-center'>
              <Link href={"/account/register"} passHref>
                <a className='text-sm text-blue-600 underline'>
                  アカウントをお持ちでないですか？
                </a>
              </Link>
            </div>
          </div>
          {
            errorMessage ? <AlertDialog title='ログインエラー' message={errorMessage} onClose={() => setErrorMessage('')}/>: <></>
          }
        </div>
      </Container>
    )
}

export default Login