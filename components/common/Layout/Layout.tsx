import React, { FC, ReactNode } from 'react'
import { Cart, Drawer, Header } from '@components/common'
import style from "./Layout.module.css"

interface LayoutProps {
    children: ReactNode | ReactNode[]
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div className='relative'>
            <Drawer/>
            <Cart/>
            <Header/>
            <main>
                { children }
            </main>
        </div>
    )
}

export default Layout