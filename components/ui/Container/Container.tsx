
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode | ReactNode[]
}

const Container = ({ children }: Props) => {
    return (
        <div className='overflow-hidden'>
            { children }
        </div>
    )
}

export default Container