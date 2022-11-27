
export interface ProductImage {
    url: string
    altText?: string
    width: number
    height: number
}

export interface Money {
    amount: number
    currencyCode: "USD" | "EUR" | "JPY" | string
}

export interface PriceRange {
    minVariantPrice: Money
    maxVariantPrice: Money
}

export interface ProductOptionValues {
    label: string,
    hexColor?: string
}

export interface ProductOption {
    id: string,
    displayName: string,
    values: ProductOptionValues[]
}

export interface ProductVariant {
    id: string,
    name: string,
    sku: string,
    image?: ProductImage,
    quantityAvailable: number
    inventoryQuantity: number
    requiresShipping: boolean
    price: number
    listPrice: number
    options: ProductOption[]
}

export interface Product {
    id: string
    name: string
    description: string
    vendor: string
    totalInventory: number
    slug: string
    path: string
    images: ProductImage[]
    priceRange: PriceRange
    options: ProductOption[]
    variants: ProductVariant[]

}