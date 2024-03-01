const numericOnlyRegex = new RegExp('^[0-9]*$');
export function onlyNumbers(val, setter){
    if(!val) return;

    if(setter === undefined){
        return numericOnlyRegex.test(val)
    }

    if(numericOnlyRegex.test(val)){
        setter(val);
    }
}

const onlyCharRegex = /^[a-zA-Z\s]*$/;
export function onlyCharacters(val, setter){
    if(!val) return;

    if(setter === undefined){
        return onlyCharRegex.test(val)
    }
    
    if(onlyCharRegex.test(val)){
        setter(val);
    }
}