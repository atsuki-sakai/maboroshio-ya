
import Image from 'next/image'
import React from 'react'
import style from "./Hero.module.css"

interface Props {
    text: string
    subText: string
}

const Hero = ({text, subText}: Props) => {
    return (
        <div className='md:flex w-full'>
            <div className='w-full relative'>
                <h3 className={style.text}>{text}</h3>
                <div className='relative h-42 w-42 '>
                    <Image src={"/images/top-bg.jpg"} width={50} height={50} layout="responsive" alt={"test"}></Image>
                </div>
            </div>
            <div className='w-full py-3'>
                <p className={style.subText}>{subText}</p>
            </div>
        </div>
    )
}

export default Hero