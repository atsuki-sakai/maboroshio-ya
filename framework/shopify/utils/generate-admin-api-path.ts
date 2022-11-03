
export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT"
}

const hostingUrl = process.env.NEXT_PUBLIC_HOSTING_URL!

export const generateAdminApiPath = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${hostingUrl}/api/create-customer`
        }
        case "CREATE_CHECKOUT": {
            return `${hostingUrl}/api/create-checkout`
        }
    }
}