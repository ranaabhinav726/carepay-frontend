import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";

export default function Screen10(){

    const navigate = useNavigate();
    setTimeout(() => {
        
    }, 3000);
    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{display:"flex", placeContent:"center", marginTop:"3rem"}}>
                <img src={SearchingDoc} alt="" style={{width:"50%"}} />
            </div>
            <NoteText text="We are assessing your credit application." styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
            <NoteText text="This might take 15-20 minutes." styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
            <div style={{background:"#FAE1CD", textAlign:"center", padding:"16px 12px", fontSize:"16px", lineHeight:"22px", borderRadius:"4px", marginTop:"1rem"}}>
                You will be notified on your registered contact number <strong style={{whiteSpace:"nowrap"}}>+91 772 182 3857</strong> once the application is reviewed.
            </div>
            <button onClick={()=>navigate('/patient/screen11')} className="submit" style={{margin:"2rem 0 12px 0"}}>Refresh status</button>
            <NoteText text="For more details and enquiries, reach out to us" styles={{textAlign:"center", color:"#000000C", fontSize:"16px", lineHeight:"20px"}} />
            <div style={{textAlign:"center", margin:"1rem 0 2rem 0"}}>
                <Link to={"tel:+918069489655"} style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline", textAlign:"center"}}>Contact Support</Link>
            </div>
        </main>
    )
}