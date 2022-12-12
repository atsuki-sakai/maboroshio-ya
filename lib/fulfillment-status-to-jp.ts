
export const fulfillmentToJp = (status: string) => {

    switch(status){
        case "FULFILLED" : {
            return "発送済み"
        }
        case "IN_PROGRESS" : {
            return "処理中"
        }
        case "ON_HOLD" || "PENDING_FULFILLMENT" : {
            return "保留中"
        }
        case "PARTIALLY_FULFILLED" : {
            return "一部発送済み"
        }
        case "SCHEDULED" : {
            return "発送予定"
        }
        case "UNFULFILLED" || "RESTOCKD" || "OPEN" : {
            return "未発送"
        }
        default : {
            return "ERROR"
        }
    }
}