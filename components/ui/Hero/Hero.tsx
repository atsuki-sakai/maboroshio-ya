
import Image from 'next/image'
import React from 'react'
import style from "./Hero.module.css"

interface Props {
    text: string
    subTitle: string
    subText: string
    imageUrl: string
}

const Hero = ({text,subTitle, subText, imageUrl}: Props) => {
    return (
        <div className='md:flex items-center justify-center w-full py-6 md:py-12 max-w-7xl mx-auto'>
            <div className='w-full h-full relative flex-1'>
                <h3 className={style.text}>{text}</h3>
                <div className='relative h-42 w-42 '>
                    <Image src={imageUrl} width={50} height={50} layout="responsive" alt={"test"}></Image>
                </div>
            </div>
            <div className='w-full h-full px-12 flex-1'>
                <h3 className={style.subTitle}>{subTitle}</h3>
                <p className={style.subText}>{subText}</p>
            </div>
        </div>
    )
}

export default Hero