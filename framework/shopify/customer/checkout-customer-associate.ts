import { Customer, CheckoutCustomerAssociateV2Payload } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils"



const checkoutCustomerAssociate = async(checkoutId: string, customerAccessToken: string): Promise<Customer> => {
    const checkoutCustomerAssociateApiUrl = generateApiUrl({type:"CHECKOUT_CUSTOMER_ASSOCIATE"})
    const response = await fetch(checkoutCustomerAssociateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId,
            customerAccessToken: customerAccessToken
        })
    })

    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }

    const { customer } = data.checkoutCustomerAssociateV2 as CheckoutCustomerAssociateV2Payload
    if(!customer){
        throw Error('Customer is not fined...')
    }

    return customer as Customer
}

export default checkoutCustomerAssociate