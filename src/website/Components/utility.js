export function handleContactScroll(){
    let contact = document.getElementById('contact');

    if(contact){
        contact.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
    }
}

export function handleFooterScroll(){
    let footer = document.getElementById('footer');

    if(footer){
        footer.scrollIntoView({ behavior: 'smooth', block: "start" });
    }
}