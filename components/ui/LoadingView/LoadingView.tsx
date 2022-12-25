

import React from 'react'
import Container from '../Container'
import Lottie from "react-lottie"
import LottieLoader from "../../../public/loading-gray.json"

const LoadingView = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LottieLoader
    }

    return (
        <Container>
            <div className='h-[480px] w-full flex items-center justify-center'>
                <Lottie options={defaultOptions} height={80} width={80} />
            </div>
        </Container>
    )
}

export default LoadingView