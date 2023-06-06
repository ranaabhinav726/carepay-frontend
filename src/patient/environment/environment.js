
console.log(process.env.REACT_APP_BACKEND);
export const env = {
    // api_Url: "http://3.92.13.36:8075/"
    api_Url: process.env.REACT_APP_BACKEND
    // api_Url: "https://backend.carepay.money/"
}

export function showWrapper(elem){
    if(elem) elem.style.display = "flex";
}

export function hideWrapper(elem){
    if(elem) elem.style.display = "none";
}

export function showErrorOnUI(elem, errorLineDisplay=true){
    elem.scrollIntoView({ behavior: "smooth", block: "center"});
    elem.classList.add('inputBoxError');
    if(errorLineDisplay){
        let sibling = elem.nextSibling;
        if(sibling) sibling.style.display = "block"
    }

    setTimeout(()=>{
        elem.classList.remove('inputBoxError');
        if(elem.nextSibling) elem.nextSibling.style.display = "none"
    }, 3000)
}
