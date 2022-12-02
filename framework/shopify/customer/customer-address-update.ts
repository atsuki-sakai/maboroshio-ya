
import { generateApiUrl } from '@shopify/utils/generate-api-url'
import React from 'react'

type AddressType =  {
    address1: string
    address2: string
    city: string
    company: string
    country: string
    firstName: string
    lastName: string
    phone: string
    province: string
    zip: string
}


const customerAddressUpdate = async(newAddress: AddressType, customerAccessToken: string, addressId: string) => {
    const addressUpdateApiUrl = generateApiUrl({type: "CUSTOMER_ADDRESS_UPDATE"});
    const response = await fetch(addressUpdateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            address: {
                address1: newAddress.address1,
                address2: newAddress.address2,
                city: newAddress.city,
                company: newAddress.company,
                country: newAddress.country,
                firstName: newAddress.firstName,
                lastName: newAddress.lastName,
                phone: newAddress.phone,
                province: newAddress.province,
                zip: newAddress.zip
            },
            customerAccessToken: customerAccessToken,
            addressId: addressId
        })
    })

    const { error } = await response.json()
    if(error){
        throw Error(error.message)
    }
}

export default customerAddressUpdate