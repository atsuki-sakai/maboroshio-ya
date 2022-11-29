
import provinceToJP from '@lib/province-to-jp'
import { MailingAddress } from '@shopify/shema'
import React from 'react'

interface Props {
    address: MailingAddress
}

const ShippingAddressCard = ({address}: Props) => {
    return (
        <div className="text-xs text-gray-500 p-3">
            <p className="text-black text-sm">{address.lastName}{address.firstName}</p>
            <p>{address.company}</p>
            <p>{address.phone}</p>
            <p>{address.country}</p>
            <p>{provinceToJP(address.province!)}</p>
            <p>{address.city}</p>
            <p>{address.address1}</p>
            <p>{address.address2}</p>
            {/* <div className='w-full mt-2 bg-green-100 rounded-md'>
                <p className='text-center py-1 px-3 text-green-500'>住所を編集</p>
            </div> */}
        </div>
    )
}

export default ShippingAddressCard