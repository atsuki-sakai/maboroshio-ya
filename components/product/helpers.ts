import { Product } from "@shopify/types/product";


type AvailableChoices = "default title" | "内容量/g" | "size" | "color" | "price" |  string

export type Choices = {
    [P in AvailableChoices]: string
}


export const getVariant = (product: Product, choices: Choices) => {
    if(product.options.length === 0){
        return product.variants[0];
    }
    return product.variants.find(variant =>
        variant.options.every(variantOption => {
            const optionName = variantOption.displayName.toLocaleLowerCase()
            return optionName in choices &&
                choices[optionName] === variantOption.values[0].label.toLocaleLowerCase()
        })
)}