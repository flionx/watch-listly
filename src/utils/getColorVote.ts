export default function getColor(vote: number) {
    if(vote >= 7) {
        return '#009E2A'
    } else if (vote >= 5) {
        return '#F2BC1A'
    } else {
        return '#A10000'
    }
}