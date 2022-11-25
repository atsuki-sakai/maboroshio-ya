import React, { FC, ReactNode } from 'react'
import { Cart, Drawer, Footer, Header } from '@components/common'

interface LayoutProps {
    children: ReactNode | ReactNode[]
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {

    return (
        <>
            <Header/>
            <main>
                { children }
            </main>
            <Footer/>
            <Drawer/>
            <Cart/>
        </>
    )
}

export default Layout