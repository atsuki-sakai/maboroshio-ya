
export type ApiPath = {
    type: "CREATE_CUSTOMER" | "CREATE_CHECKOUT"
}

const hostingUrl = process.env.NEXT_PUBLIC_HOSTING_DOMAIN as string

export const generateAdminApiPath = (apiPath: ApiPath) => {
    switch(apiPath.type){
        case "CREATE_CUSTOMER": {
            return `${hostingUrl}/api/create-customer`
        }
    }
}