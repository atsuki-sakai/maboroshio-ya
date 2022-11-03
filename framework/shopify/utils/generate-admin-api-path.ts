
export type ApiPathType = {
    type: "CREATE_CUSTOMER"
}

const hostingUrl = process.env.NEXT_PUBLIC_HOSTING_DOMAIN_URL as string

export const generateAdminApiPath = (apitype: ApiPathType) => {
    switch(apitype.type){
        case "CREATE_CUSTOMER": {
            return `${hostingUrl} + "/api/create-customer"`
        }
    }
}