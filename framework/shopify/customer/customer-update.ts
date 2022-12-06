import { Customer, CustomerAccessToken, CustomerUpdatePayload, Maybe } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"

type ReturnType = {
    customer: Maybe<Customer> | undefined
    customerAccessToken: Maybe<CustomerAccessToken> | undefined
}


const customerUpdate = async(newCustomer: {[key: string]: any}, accessToken: string): Promise<ReturnType> => {

    const customerUpdateApiUrl = generateApiUrl({type: "CUSTOMER_UPDATE"})
    const response = await fetch(customerUpdateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            customer: {
                acceptsMarketing: newCustomer.acceptsMarketing,
                email: newCustomer.email,
                firstName: newCustomer.firstName,
                lastName: newCustomer.lastName,
            },
            customerAccessToken: accessToken
        })
    })

    const { data, error } = await response.json()

    if(error) {
        throw Error(error.message)
    }
    const { customer, customerUserErrors, customerAccessToken } = data.customerUpdate as CustomerUpdatePayload
    if(customerUserErrors[0]){
        throw Error(customerUserErrors[0].message)
    }
    return { customer, customerAccessToken }
}

export default customerUpdate