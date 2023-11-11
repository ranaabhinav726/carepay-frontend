import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { useNavigate } from "react-router-dom";

export default function Screen11(){

    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/patient/screen12')
    }, 3000);
    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{display:"flex", placeContent:"center", marginTop:"3rem"}}>
                <img src={SearchingDoc} alt="" style={{width:"50%"}} />
            </div>
            <NoteText text="Sit back and relax!" styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
            <NoteText text="while we assess your credit application..." styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
        </main>
    )
}