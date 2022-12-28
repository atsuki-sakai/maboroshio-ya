
import { Container } from '@components/ui'
import React from 'react'

const ErrorPage = () => {
    return (
        <Container>
            <div className='px-8 h-screen w-screen flex items-center justify-center'>
                <div>
                    <h1 className='text-gray-500'>404ERROR</h1>
                    <p className='text-gray-500'>お探しのページは見つかりませんでした....</p>
                    <div className='pt-4'>
                        <button className='text-blue-500 underline'>
                            HOME
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ErrorPage