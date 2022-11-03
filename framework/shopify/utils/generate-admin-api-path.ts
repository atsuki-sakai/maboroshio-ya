
export type ApiPathType = {
    type: "CREATE_CHECKOUT"
}

const hostingUrl = process.env.NEXT_PUBLIC_HOSTTING_URL

export const generateAdminApiPath = (apitype: ApiPathType) => {
    switch(apitype.type){
        case "CREATE_CHECKOUT": {
            return hostingUrl + "/api/create-checkout";
        }
    }
}