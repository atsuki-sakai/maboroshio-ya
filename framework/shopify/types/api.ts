
export type ApiFetchOptions = {
    query: string
    variables?: Variables
}

export type Variables = { [key: string]: string | string[] | any | undefined }

export type ApiFetchResults<T> = {
    data: T
}

export interface ApiConfig {
    fetch<T>(options: ApiFetchOptions): Promise<ApiFetchResults<T>>
    checkoutCookie: string
}


export type ApiFeacher<T = any> = (options: ApiFetchOptions) => Promise<ApiFetchResults<T>>
