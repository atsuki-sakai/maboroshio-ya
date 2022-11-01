
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode | ReactNode[]
}

const Container = ({ children }: Props) => {
    return (
        <div className='pt-24 md:pt-40 lg:pt-48'>
            { children }
        </div>
    )
}

export default Container