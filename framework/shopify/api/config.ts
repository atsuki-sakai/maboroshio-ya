
import { fetchApi } from "@shopify/utils";
import { ApiConfig } from '@shopify/types/api';
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@shopify/const";

class Config {

    private config: ApiConfig

    constructor(config: ApiConfig){
        this.config = config
    }

    getConfig(): ApiConfig {
        return this.config;
    }

}

const configWarapper = new Config({
    fetch: fetchApi,
    checkoutCookie: SHOPIFY_CHECKOUT_ID_COOKIE!
})

export function getConfig() {
    return configWarapper.getConfig()
}