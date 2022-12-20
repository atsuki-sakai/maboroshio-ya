
export type Review = {
    customerId: string
    customerName: string
    postDate: string
    productId: string
    productName: string
    star: number
    title: string
    comment: string
    variantOptions?: {[key: string]: string }
}

export type PostReviewInput = {
    productId: string
    reviewerCustomerId: string
    review: Review
}

export type ReviewInfo = {
    productId: string
    totalStar: number
    reviewerCustomerIds: string[]
    numberOfTotalReview: number
    score: number
    reviews: Review[]
    isPublic: boolean
}