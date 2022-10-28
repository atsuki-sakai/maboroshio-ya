import { ImageEdge, MoneyV2, Product as ShopifyProduct, ProductOption, ProductVariantConnection, SelectedOption } from '../shema';
import { Product ,ProductPrice } from "@shopify/types/product";



const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}): any => {
    return edges.map(({node: { originalSrc: url, ...rest }}) => ({ url: `/images/${url}`, ...rest }))
}

const normarizeProductPrice= ({currencyCode, amount}: MoneyV2) => ({
    value: +amount,
    currencyCode
})

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
        const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node
        return {
            id,
            sku: sku || id,
            name: title,
            price: +priceV2.amount,
            listPrice: compareAtPriceV2?.amount,
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
        price: normarizeProductPrice(priceRange.minVariantPrice) as ProductPrice,
        options: options ?
            options.filter((o) => o.name !== "Title").map((o) => normarizeProductOption(o)):
            [],
        variants: variants ? normarizedProductVariants(variants) : [],
        ...rest
    }
    return product;
}