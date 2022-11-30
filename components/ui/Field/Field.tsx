
import React from 'react'

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: any
    label: string
    placeHolder: string
    autoComplete?: string
    type?: string
    id: string
    required?: boolean

}

const Field = ({ label, value, placeHolder, autoComplete = "", type = "text", id, required = false, onChange }: Props) => {
    return (
        <>
            <div className='flex items-end mb-1'>
                <label htmlFor={id} className='text-xs text-gray-700'>{label}</label>
                {
                    required ?  <div className='ml-4 px-1.5   border border-red-500 rounded-full'>
                                    <p className='text-red-500 text-xs scale-90'>必須</p>
                                </div>: <></>
                }
            </div>
            <input id={id} className={`w-full h-10 text-base bg-gray-50 text-gray-500 pl-2 border rounded-md focus:outline-none`} type={type} autoComplete={autoComplete} placeholder={placeHolder} value={value} onChange={onChange} />
        </>
    )
}

export default Field