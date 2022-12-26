
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
            <div className='h-screen w-full flex items-center justify-center'>
                <h4>予期せぬエラーが発生しました...</h4>
                <p>{message}</p>
                <div>
                    <button onClick={() => router.push('/')}>戻る</button>
                </div>
            </div>
        </Container>
    )
}

export default ErrorView