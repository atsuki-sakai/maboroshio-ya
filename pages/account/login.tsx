
import React, { useState } from 'react'
import Link from 'next/link'
import { Container } from "@components/ui"
import { loginCustomer } from '@shopify/auth'
import { useLoginState } from "@components/context"

const Login = () => {
    const { updateLoginCustomer, loggedCustomer  } = useLoginState()


    console.log('logged customer: ', loggedCustomer)

    const [ credential, setCredential ] = useState<{[key:string]: any}>({
      email: "",
      password: ""
    })

    const login = async() => {
      const customer = await loginCustomer(credential.email, credential.password);
      updateLoginCustomer(customer);

      console.log(customer)
    }

    console.log(credential)
    return (
      <Container>
        <div className='px-6 py-4'>
          <div className="w-full text-start pl-5">
            <h1 className='block text-3xl font-bold'>ログインページ</h1>
          </div>
          <div className='px-6 py-12'>
            <div>
              <label htmlFor="email" className='text-xs text-gray-700'>メールアドレス</label>
              <input id="email" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="email" placeholder='samplel@email.com' value={credential.email} onChange={(e) => setCredential({...credential, email: e.target.value})} />
            </div>
            <div>
              <label htmlFor="password" className='text-xs text-gray-700'>パスワード</label>
              <input id="password" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="password" placeholder='パスワード' value={credential.password} onChange={(e) => setCredential({...credential, password: e.target.value})} />
            </div>
            <div className='w-fit mx-auto pt-8'>
              <button className='px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md' onClick={login}>
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
        </div>
      </Container>
    )
}

export default Login