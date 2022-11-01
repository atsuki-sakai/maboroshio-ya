import React, { FC, ReactNode, useEffect } from 'react'
import { Cart, Drawer, Footer, Header } from '@components/common'
import { SplashScreen } from '@components/ui'


interface LayoutProps {
    children: ReactNode | ReactNode[]
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {

    return (
        <>
            <Drawer/>
            <Cart/>
            <Header/>
            <main>
                { children }
            </main>
            <Footer/>
            <SplashScreen />
        </>
    )
}

export default Layout