export const env = {
    // api_Url: "http://3.92.13.36:8075/"
    api_Url: process.env.BACKEND
    // api_Url: "https://backend.carepay.money/"
}

export function showWrapper(elem){
    // console.log("show")
    // if(elem) elem.classList.add('show');
    if(elem) elem.style.display = "flex";
}

export function hideWrapper(elem){
    // console.log("hide")
    // if(elem) elem.classList?.remove('show');
    if(elem) elem.style.display = "none";
}

export function showErrorOnUI(elem, errorLineDisplay=true){
    elem.scrollIntoView({ behavior: "smooth", block: "center"});
    elem.classList.add('inputBoxError');
    // console.log(elem.nextSibling.style.display)
    if(errorLineDisplay){
        let sibling = elem.nextSibling;
        if(sibling) sibling.style.display = "block"
    }

    setTimeout(()=>{
        elem.classList.remove('inputBoxError');
        if(elem.nextSibling) elem.nextSibling.style.display = "none"
    }, 3000)
}