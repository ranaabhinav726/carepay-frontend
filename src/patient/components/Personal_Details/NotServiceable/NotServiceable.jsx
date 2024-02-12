import Header from "../../Header/Header";
import SadFace from "../../../assets/SadFace.svg"

import { ContactSupport } from "../../utility/ContactSupport/ContactSupport";

export function NotServiceable(){
 
    return(
        <main style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Header />
            <img src={SadFace} alt="" style={{width:"30%", margin:"3rem 0 2rem 0"}} />
            <p style={{marginBottom:"5rem", textAlign:"center", lineHeight:"140%"}}>We are extremely sorry!<br />Currently, we are not able to finance<br/> this particular treatment.</p>
            <ContactSupport />
        </main>
    )
}