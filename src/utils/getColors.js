export default function getColorsByAlertType(alertType) {
    switch(alertType) {
        case 'Medical':
            return ["#d01212", "#F3534A"];
        case 'Crime':
            return ["#3624ad", "#3d57ff"];
        case 'Accident':
                return ["green", "#36b53c"];
        default:
            return ["#3624ad", "#3d57ff"];
    }
}