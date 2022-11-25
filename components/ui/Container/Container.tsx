
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
    children: ReactNode | ReactNode[]
}

const Container = ({ children }: Props) => {
    return (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}transition={{ duration: 0.7 }} className='pt-24 md:pt-40 lg:pt-48'>
            { children }
        </motion.div>
    )
}

export default Container