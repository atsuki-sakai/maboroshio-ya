import { ImageEdge, Product as ShopifyProduct, ProductOption, Checkout,ProductVariantConnection, SelectedOption, CheckoutLineItemEdge } from '../shema';
import { Product } from "@shopify/types/product";
import { Cart, LineItem } from '@shopify/types/cart';


const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}): any => {
    return edges.map(({node: { url: url, ...rest }}) => ({ url: `${url}`, ...rest }))
}


const normalizeLineItem = ({node: { id, title, variant, quantity, discountAllocations, ...rest }}: CheckoutLineItemEdge): LineItem => {
    return {
        id,
        variantId: String(variant?.id),
        productId: String(variant?.id),
        name: title,
        path: variant?.product?.handle ?? "",
        discounts: discountAllocations.map((discount) => discount.allocatedAmount.amount),
        quantity,
        options: variant?.selectedOptions.map(({name, value}: SelectedOption) => {
            const option = normarizeProductOption({
                id,
                name,
                values: [value]
            })
            return option;
        }),
        variant: {
            id: String(variant?.id),
            sku: variant?.sku ?? "",
            name: variant?.title,
            image: {
                width: variant?.image?.width ?? 540,
                height: variant?.image?.height ?? 540,
                url: variant?.image?.url ?? "/public/images/product-image-placeholder.svg"
            },
            requiresShipping: variant?.requiresShipping ?? false,
            price: variant?.priceV2.amount,
            listPrice: variant?.compareAtPriceV2?.amount
        },
        ...rest
    }
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

export function normalizeCart(checkout: Checkout): Cart {

    return {
        id: checkout.id,
        createdAt: checkout.createdAt,
        currency: {
            code: checkout.currencyCode
        },
        taxesIncluded: checkout.taxesIncluded,
        lineItemsSubtotalPrice: checkout.subtotalPrice.amount,
        totalPrice: checkout.totalPrice.amount,
        lineItems: checkout.lineItems.edges.map(normalizeLineItem),
        discounts: []
    }
}


export function normalizeProduct(productNode: any): Product {
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
        totalInventory,
        ...rest
    } = productNode;

    const product: Product = {
        id,
        name,
        vendor,
        totalInventory,
        description,
        images: normalizeProductImages(imageConnection),
        path: `/${handle}`,
        priceRange,
        slug: handle.replace(/^\/+|\/+$/g,""),
        options: options ?
            options.filter((o: any) => o.name !== "Title").map((o: any) => normarizeProductOption(o)):
            [],
        variants: variants ? normarizedProductVariants(variants) : [],
        ...rest
    }
    return product;
}