import { ImageEdge, Product as ShopifyProduct, ProductOption, ProductVariantConnection, SelectedOption } from '../shema';
import { Product } from "@shopify/types/product";



const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}): any => {
    return edges.map(({node: { originalSrc: url, ...rest }}) => ({ url: `${url}`, ...rest }))
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


export function normalizeProduct(productNode: ShopifyProduct): Product {
    const {
        id,
        title: name,
        handle,
        vendor,
        description,
        images: imageConnection,
        priceRange,
        options,
        variants,
        ...rest
    } = productNode;

    const product: Product = {
        id,
        name,
        vendor,
        description,
        images: normalizeProductImages(imageConnection),
        path: `/${handle}`,
        slug: handle.replace(/^\/+|\/+$/g,""),
        price: 900,
        options: options ?
            options.filter((o) => o.name !== "Title").map((o) => normarizeProductOption(o)):
            [],
        variants: variants ? normarizedProductVariants(variants) : [],
        ...rest
    }
    return product;
}