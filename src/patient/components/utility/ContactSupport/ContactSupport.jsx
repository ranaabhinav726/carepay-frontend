import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export function ContactSupport(){

    return(
        <>
            <p style={{textAlign:"center"}}>For any details and enquiries, reach out to us</p>
            <div style={{width:"100%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginTop:"1rem"}}>
                <a href="tel:+918069489655" style={{width:"48%", padding:"1rem 0", display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", color:"#514C9F", background:"#ECEBFF", borderRadius:"4px"}}>
                    <FaPhoneAlt style={{fontSize:"20px"}} />
                    <span style={{fontWeight:"700"}}>Call</span>
                </a>
                <a href="https://wa.me/918810625857" target="_blank" style={{width:"48%", padding:"1rem 0", display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", color:"#149540", background:"#EBFEED", borderRadius:"4px"}}>
                    <FaWhatsapp style={{fontSize:"24px"}} />
                    <span style={{fontWeight:"700"}}>Whatsapp</span>
                </a>
            </div>
        </>
    )
}