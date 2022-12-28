
import React from 'react'
import Container from '../Container'
import { useRouter } from 'next/router'

interface Props {
    message: string
}

const ErrorView = ({message}: Props) => {
    const router = useRouter()
    return (
        <Container>
            <div className='px-8 py-12'>
                <div className='bg-gray-50 rounded-md shadow-md p-3'>
                    <div className='bg-red-100 px-3 py-1 rounded-md'>
                        <p className='text-lg font-bold text-red-500'>予期せぬエラーが発生しました...</p>
                    </div>
                    <p className='text-base text-wide mt-2 text-gray-500 p-1 bg-gray-50 break-words'>{message}</p>
                    <div className='w-full flex justify-end pt-3'>
                        <button className='text-blue text-base underline text-blue-500' onClick={() => router.push('/')}>戻る</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ErrorView