import { ADMIN_ACCESS_TOKEN, ADMIN_API_KEY, ADMIN_API_SECLET_KEY, API_URL } from "@shopify/const"

interface Props {
    query: any,
    input?: any
}

export default async function adminGraphqlApi( query: any, input: any){
    const headers = {
        Authorization: 'Basic ' + Buffer.from( ADMIN_API_KEY! + ':' + ADMIN_API_SECLET_KEY!).toString('base64'),
        'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    } as any

    const r = await fetch(API_URL!,{
        mode: "no-cors",
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables: input
        }),
    })

    const { data, errors } = await r.json()
    if(errors){
        throw Error(errors[0]?.message ?? errors?.message)
    }
    return data
}