export default function getIconNameByAlertType(alertType) {
    switch(alertType) {
        case 'Medical':
            return 'plus';
        case 'Crime':
            return 'exclamation-circle';
        default:
            return 'exclamation-circle';
    }
}