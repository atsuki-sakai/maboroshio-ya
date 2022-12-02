import { ProductOption, ProductVariant } from "./product"

export interface Discount {
    value: number
}

export interface ShippingAddress {
    id: string
    address1: string
    address2: string
    city: string
    company?: string
    country: string
    firstName: string
    lastName: string
    phone?: string
    province: string
    zip: string
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