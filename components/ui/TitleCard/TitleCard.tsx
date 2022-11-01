
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from "./TitleCard.module.css"


const TitleCard = () => {

    return (
        <div className={style.title_container}>
            <Link href={"/"} passHref>
                <a>
                    <div className={style.title_wrapper}>
                        <h1 className={style.title}>
                            まぼろし屋
                        </h1>
                        <div className='absolute rotate-120 right-0 top-0 -z-10'>
                            <Image src={"/images/gouka.png"} className="object-cover"  width="100%" height="100%" alt={"background image"} />
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default TitleCard