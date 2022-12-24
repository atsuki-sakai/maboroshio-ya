import { CustomerAddressCreatePayload, MailingAddress } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"



type CustomerAddressCreateInputType = {
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


const customerAddressCreate = async(inputData: CustomerAddressCreateInputType, customerAccessToken: string): Promise<MailingAddress> => {

    const customerAddressCreateApiUrl = generateApiUrl({type: "CUSTOMER_ADDRESS_CREATE"})
    const response = await fetch(customerAddressCreateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            address: {
                address1: inputData.address.address1,
                address2: inputData.address.address2,
                city: inputData.address.city,
                company: inputData.address.company,
                country: inputData.address.country,
                firstName: inputData.address.firstName,
                lastName: inputData.address.lastName,
                phone: inputData.address.phone,
                province: inputData.address.province,
                zip: inputData.address.zip
            },
            customerAccessToken: customerAccessToken
        })
    })

    const { data,error } = await response.json();
    if(error){
        throw Error(error.message);
    }

    const { customerAddress, customerUserErrors } = data.customerAddressCreate as CustomerAddressCreatePayload
    if(customerUserErrors[0]){
        throw Error(customerUserErrors[0].message)
    }
    return customerAddress as MailingAddress
}

export default customerAddressCreate