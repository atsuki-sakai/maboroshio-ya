import React, { FC, ReactNode, useEffect } from 'react'
import { Cart, Drawer, Header } from '@components/common'
import { useLoaded } from "@components/context"
import { SplashScreen } from '@components/ui'


interface LayoutProps {
    children: ReactNode | ReactNode[]
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {

    const { isLoaded } = useLoaded()

    const handle = (e: any) => {
        e.preventDefault();
    }
    useEffect(() => {
        if(!isLoaded) {
            document.addEventListener('touchmove', handle, { passive: false })
            document.addEventListener('wheel', handle, { passive: false })
        }
        return (() => {
            if(!isLoaded){
                document.removeEventListener('touchmove', handle)
                document.removeEventListener('wheel', handle)
            }
        })
    }, [isLoaded])

    return (
        <div className='relative'>
            <Drawer/>
            <Cart/>
            <Header/>
            <main>
                { children }
            </main>
            <SplashScreen loaded={true} />
        </div>
    )
}

export default Layout