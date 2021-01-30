// form validation logic
const validate = (value, validationRules) =>{
    let isValid = true;

    for (const rule in validationRules) {
        switch(rule){
            case 'minLength':
                isValid = isValid && minLengthValidator(value, validationRules[rule]);
                break;
            case 'isRequired':
                isValid = isValid && isRequiredValidator(value);
                break;
            case 'isEmail':
                isValid = isValid && emailValidator(value)
                break;
            default:
                isValid = true
                break;
        }
    }

    return isValid;
}

const minLengthValidator = (value, minLegth) => {
    return value.length >= minLegth;
}

const isRequiredValidator = (value) => {
    return value.trim() !== "";
}

const emailValidator = value => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

export default validate;