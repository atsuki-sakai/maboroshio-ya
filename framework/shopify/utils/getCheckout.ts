import { generateApiUrl } from "./generate-api-url";

const getCheckout = async(id: string) => {

    const getCheckoutApiUrl = generateApiUrl({type: "GET_CHECKOUT"})

    const response = await fetch(getCheckoutApiUrl, {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
            id: id
        })
    });
    
    const data = await response.json();

    console.log(data.node)

    return data.node;
}

export default getCheckout