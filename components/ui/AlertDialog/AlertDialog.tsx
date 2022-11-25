
import React, { useEffect } from 'react'
import { Warning } from '@components/icon'
import { motion } from 'framer-motion'

interface Props {
    title: string
    message: string
    onClose: () => void
    onSuccess?: () => void
}

const AlertDialog = ({title, message, onClose, onSuccess}: Props) => {

    const handle = (e: any) => {
        e.preventDefault()
    }

    useEffect(() => {
        document.addEventListener('touchmove', handle,{passive: false})
        document.addEventListener('wheel', handle, { passive: false })
        return () => {
            document.removeEventListener('touchmove', handle)
            document.removeEventListener('wheel', handle)
        }
    })

    return (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{duration: 0.3}} className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-700 bg-opacity-50'>
            <div className='fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[340px] '>
                <div className='bg-gray-50 shadow-md rounded-md border px-4 pb-2 pt-3 w-full h-full '>
                    <div className='flex items-center justify-start mb-2'>
                        <Warning className='text-red-500 w-6 h-6'/>
                        <h3 className="ml-1 text-red-600 text-lg md:text-xl">{title}</h3>
                    </div>
                <p className="text-gray-500 bg-white p-2 rounded-md text-sm md:text-base">{message}</p>
                <div className={`flex items-center mt-1  ${ onSuccess ? "justify-between": "justify-end" } py-2 w-full`}>
                    {
                        onSuccess && <button onClick={onSuccess} className="bg-green-100 rounded-md px-4 py-1">
                                        <p className='text-green-500'>確認</p>
                                    </button>
                    }
                    <button onClick={onClose} className="bg-red-100 rounded-md px-4 py-1">
                        <p className='text-red-500 text-sm'>閉じる</p>
                    </button>
                </div>
                </div>
            </div>
        </motion.div>
    )
}

export default AlertDialog