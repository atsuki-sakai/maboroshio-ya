

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
            <div className='h-screen w-full md:mt-12'>
                <Lottie options={defaultOptions} height={65} width={65} />
            </div>
        </Container>
    )
}

export default LoadingView