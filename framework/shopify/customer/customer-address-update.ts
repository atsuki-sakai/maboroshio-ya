
import { generateApiUrl } from '@shopify/utils/generate-api-url'
import React from 'react'

type AddressType =  {
    address: {
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
}

const customerAddressUpdate = async(address: AddressType, customerAccessToken: string, addressId: string) => {
    const addressUpdateApiUrl = generateApiUrl({type: "CUSTOMER_ADDRESS_UPDATE"});
    const response = await fetch(addressUpdateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            address: address,
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