import React, { FC, ReactNode } from 'react'
import style from "./Layout.module.css"

interface LayoutProps {
    children: ReactNode | ReactNode[]
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div className={style.root}>
            <main>
                { children }
            </main>
        </div>
    )
}

export default Layout