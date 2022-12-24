
type SplitType = {
    type: "PRODUCT" | "CUSTOMER"
}

const idConverter = ({ type }: SplitType, id: string) => {
    if(id === "" || id === undefined) return "";
    return id.split(type === "PRODUCT" ? "Product/" : "Customer/")[1]
}

export default idConverter