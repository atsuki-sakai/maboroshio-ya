export const numberToStar = (score: number) => {
    const formatScore = Math.floor(score)
    switch(formatScore){
        case 1: {
            return "★☆☆☆☆";
        }
        case 2: {
            return "★★☆☆☆"
        }
        case 3: {
            return "★★★☆☆"
        }
        case 4: {
            return "★★★★☆"
        }
        case 5: {
            return "★★★★★"
        }
    }

    return score
}