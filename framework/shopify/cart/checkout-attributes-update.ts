import { generateApiUrl } from "@shopify/utils/generate-api-url"


const checkoutAttributesUpdate = async(chekcoutId: string, attributes: Array<{key:string, value: any }>, allowPartialAddresses?: boolean, note?: string) => {

    const checkoutAttributesUpdateApiUrl = generateApiUrl({type: "CHECKOUT_ATTRIBUTES_UPDATE"})
    const response = await fetch(checkoutAttributesUpdateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: chekcoutId,
            input: {
                allowPartialAddresses: allowPartialAddresses ?? true,
                customAttributes: [
                    attributes.map((atrribute) => {
                        return {
                            key: atrribute.key,
                            value: atrribute.value
                        }
                    })
                ],
                note: note ?? ""
            }
        })
    })

    const _input = {
        checkoutId: chekcoutId,
        input: {
            allowPartialAddresses: true,
            customAttributes: [
                attributes.map((atrribute) => {
                    return {
                        key: atrribute.key,
                        value: atrribute.value
                    }
                })
            ],
            note: note ?? ""
        }
    }

    console.log('input: ', _input)

    const { data, error } = await response.json()

    if(error){
        throw Error(error.message)
    }

    console.log("data: ", data)
}

export default checkoutAttributesUpdate