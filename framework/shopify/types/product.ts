
export interface ProductImage {
    url: string
    altText?: string
    width: number
    height: number
}

export interface MoneyV2 {
    amount: number
    currencyCode: "USD" | "EUR" | "JPY" | string
}

export interface PriceRangeV2 {
    minVariantPrice: MoneyV2
    maxVariantPrice: MoneyV2
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
    priceRangeV2: PriceRangeV2
    options: ProductOption[]
    variants: ProductVariant[]

}