import { generateApiUrl } from "@shopify/utils/generate-api-url"



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
    },
    customerAccessToken: string
}


const customerAddressCreate = async(inputData: CustomerAddressCreateInputType) => {

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
            customerAccessToken: inputData.customerAccessToken
        })
    })

    const { error } = await response.json();
    if(error){
        throw Error(error.message);
    }

}

export default customerAddressCreate