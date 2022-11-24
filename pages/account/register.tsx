
import React, { useState } from 'react'
import Link from 'next/link'
import { Container } from "@components/ui"
import { createCustomer } from '@shopify/auth'

const Register = () => {

    const [ credential, setCredential ] = useState<{[key:string]: any}>({
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      phone: "",
      acceptMarketing: true,
    })

    const createAccount = async() => {
      console.log("create")

      const { customer, customerUserErrors } = await createCustomer(credential.email, credential.password, credential.acceptMarketing, credential.firstName, credential.lastName, credential.phone)

      if(customerUserErrors[0]){
        alert(customerUserErrors[0].message)
        return;
      }

      if(customer){
        console.log(customer)
      }
      console.log(customer)

    }

    console.log(credential)
    return (
      <Container>
        <div className='px-6 py-4'>
          <div className="w-full text-start pl-5">
            <h1 className='block text-3xl font-bold'>会員登録</h1>
            <p className='block text-xs'>アカウントを作成してお得に買い物しよう。</p>
          </div>
          <div className='px-6 py-12'>
            <div>
              <label htmlFor="lastName" className='text-xs text-gray-700'>苗字</label>
              <input id="lastName" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="text" placeholder='山田' value={credential.lastName} onChange={(e) => setCredential({...credential, lastName: e.target.value})} />
            </div>
            <div>
              <label htmlFor="firstName" className='text-xs text-gray-700'>名字</label>
              <input id="firstName" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="text" placeholder='太郎' value={credential.firstName} onChange={(e) => setCredential({...credential, firstName: e.target.value})} />
            </div>
            <div>
              <label htmlFor="email" className='text-xs text-gray-700'>メールアドレス</label>
              <input id="email" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="email" placeholder='samplel@email.com' value={credential.email} onChange={(e) => setCredential({...credential, email: e.target.value})} />
            </div>
            <div>
              <label htmlFor="phone" className='text-xs text-gray-700'>電話番号</label>
              <input id="phone" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="phone" placeholder='09012345678' value={credential.phone} onChange={(e) => setCredential({...credential, phone: e.target.value})} />
            </div>
            <div>
              <label htmlFor="password" className='text-xs text-gray-700'>パスワード</label>
              <input id="password" className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type="password" placeholder='パスワード' value={credential.password} onChange={(e) => setCredential({...credential, password: e.target.value})} />
            </div>
            <div className='flex justify-center items-center mt-5'>
              <label htmlFor="acceptMarketing" className='text-sm text-gray-500'>メルマガを希望する</label>
              <input id="acceptMarketing" className={`ml-2 h-5 w-5`} type="checkbox" value={credential.acceptMarketing} onChange={(_) => setCredential({...credential, acceptMarketing: !credential.acceptMarketing})} checked={credential.acceptMarketing}/>
            </div>
            <div className='w-fit mx-auto pt-8'>
              <button className='px-6 py-2 textp-center bg-gradient-to-tl to-blue-500 from-sky-400 rounded-md' onClick={createAccount}>
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
      </Container>
    )
}

export default Register