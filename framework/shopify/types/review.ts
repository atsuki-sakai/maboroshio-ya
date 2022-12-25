
export type Review = {
    customerId: string
    customerName: string
    postDate?: any
    productId: string
    productName: string
    star: number
    title: string
    comment: string
    isPublic: boolean
    variantOptions?: {[key: string]: string }
}

export type ProductReviewInfo = {
    productId: string
    totalStar: number
    numberOfTotalReview: number
    score: number
}


export type PostReviewInput = {
    productId: string
    productName: string
    reviewerCustomerId: string
    review: Review
}

