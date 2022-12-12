
export const financialStatusToJp = (states: string ) => {

    switch(states){
        case "AUTHORIZED": {
            return "認可済み"
        }
        case "PAID": {
            return "支払い済み"
        }
        case "PARTIALLY_PAID": {
            return "一部支払い済み"
        }
        case "PARTIALLY_REFUNDED": {
            return "一部返金済み"
        }
        case "PENDING": {
            return "未払い"
        }
        case "REFUNDED": {
            return "返金済み"
        }
        case "VOIDED": {
            return "無効"
        }
        default : {
            return "ERROR"
        }
    }
}