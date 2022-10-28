
export interface ProductImage {
    url: string
    altText?: string
}

export interface ProductPrice {
    value: number
    currencyCode: "USD" | "EUR" | "JPY" | string
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
    slug: string
    path: string
    images: ProductImage[]
    price: ProductPrice
    options: ProductOption[]
    variants: ProductVariant[]

}