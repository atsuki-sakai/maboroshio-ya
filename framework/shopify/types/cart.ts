import { ProductOption, ProductVariant } from "./product"

export interface Discount {
    value: number
}

export interface LineItem {
    id: string
    variantId: string
    productId: string
    name: string
    path: string | undefined
    quantity: number
    discounts: Discount[]
    options?: ProductOption[]
    variant: Partial<ProductVariant>
}

export interface Cart {
    id: string,
    createdAt: string
    currency: {
        code: string
    }
    taxesIncluded: boolean,
    lineItemsSubtotalPrice: number,
    totalPrice: number,
    lineItems: any[],
    discounts: Discount[]
}