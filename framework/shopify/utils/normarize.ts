import { ImageEdge, Product as ShopifyProduct, ProductOption, ProductVariantConnection, SelectedOption } from '../shema';
import { Product } from "@shopify/types/product";

//TODO: -  ShopifyProductにPriceRangeV2がない

const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}): any => {
    return edges.map(({node: { url: url, ...rest }}) => ({ url: `${url}`, ...rest }))
}

const normarizeProductOption = ({ id, name: displayName, values }: ProductOption) =>  {
    const normarized = {
        id,
        displayName,
        values: values.map((value) => {

            let output: any = { label: value }
            // 正規表現: Color color Colour colourにマッチする。
            if(displayName.match(/colou?r/gi)){
                output = {
                    ...output,
                    hexColor: value
                }
            }
            return output;
        })
    }
    return normarized;
}

const normarizedProductVariants = ({ edges }: ProductVariantConnection) => {
    return edges.map(({node}) => {
        const { id, selectedOptions, sku, title, price, compareAtPrice } = node
        return {
            id,
            sku: sku || id,
            name: title,
            price: price,
            listPrice: compareAtPrice,
            requiresShipping: true,
            options: selectedOptions.map(({name, value}: SelectedOption) => {
                const option = normarizeProductOption({
                    id,
                    name,
                    values: [value]
                })
                return option;
            })
        }
    })
}


export function normalizeProduct(productNode: any): Product {
    const {
        id,
        title: name,
        handle,
        vendor,
        description,
        images: imageConnection,
        priceRangeV2,
        options,
        variants,
        totalInventory,
        ...rest
    } = productNode;
    console.log(JSON.stringify(productNode, null, 2))
    const product: Product = {
        id,
        name,
        vendor,
        totalInventory,
        description,
        images: normalizeProductImages(imageConnection),
        path: `/${handle}`,
        priceRangeV2,
        slug: handle.replace(/^\/+|\/+$/g,""),
        options: options ?
            options.filter((o: any) => o.name !== "Title").map((o: any) => normarizeProductOption(o)):
            [],
        variants: variants ? normarizedProductVariants(variants) : [],
        ...rest
    }
    return product;
}