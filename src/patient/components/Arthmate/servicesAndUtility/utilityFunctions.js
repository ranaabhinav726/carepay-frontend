const numericOnlyRegex = new RegExp('^[0-9]*$');
export function onlyNumbers(val, setter){
    if(numericOnlyRegex.test(val)){
        setter(val);
    }
}

const onlyCharRegex = /^[a-zA-Z\s]*$/;
export function onlyCharacters(val, setter){
    if(onlyCharRegex.test(val)){
        setter(val);
    }
}