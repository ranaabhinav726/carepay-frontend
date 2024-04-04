const numericOnlyRegex = new RegExp('^[0-9]*$');
export function onlyNumbers(val, setter){
    if(val === null || val === undefined) return;

    if(setter === undefined){
        return numericOnlyRegex.test(val)
    }

    if(numericOnlyRegex.test(val)){
        setter(val);
    }
}

const onlyCharRegex = /^[a-zA-Z\s]*$/;
export function onlyCharacters(val, setter){
    if(val === null || val === undefined) return;

    if(setter === undefined){
        return onlyCharRegex.test(val)
    }
    
    if(onlyCharRegex.test(val)){
        setter(val);
    }
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function validateEmail(val, setter){
    if(val === null || val === undefined) return;

    if(setter === undefined){
        return emailRegex.test(val)
    }
    
    if(emailRegex.test(val)){
        setter(val);
    }
}
