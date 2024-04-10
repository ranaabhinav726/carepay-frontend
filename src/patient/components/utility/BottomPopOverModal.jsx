import { useEffect } from "react";
import lottie from "lottie-web";

//    const [showPopOver, setShowPopOver] = useState(null);
// { <BottomPopOverModal showPopOver={showPopOver}  setShowPopOver={setShowPopOver} />}
// let details = {
//     "clinicName" : clinicName,
//     "doctorId" : doctorId
// }
//setShowPopOver(details)
export default function BottomPopOverModal({popUpMsg, searchAnimation, showPopOver, setShowPopOver, checkAndNavigate, yesBtnText="", NoBtnText=""}){

    // const [doctorId, setDoctorId] = useState(showPopOver?.doctorId)
    useEffect(() => {
        if(!! searchAnimation){
            lottie.loadAnimation({
                container: document.querySelector("#searchAnimation"),
                animationData: searchAnimation,
                renderer: "canvas"
            });
        }
        
    }, []);

    return(
        <div 
        className={'bottomPopOverModal ' + (showPopOver ? "open" : "")}
        onClick={()=>{setShowPopOver(false)}}
        style={{
            height:"100%",
            width:"100%",
            background:"rgba(0,0,0,0.2)",
            position:"absolute",
            top:"0",
            left:"0",
            zIndex:5,
            display:"flex",
            alignItems:"center",
            padding:"0"
        }}>
            <div 
                className="popUpCard-custom"
                style={{
                    width: "100%",
                    background:"white",
                    boxShadow:"0px 0px 10px #ccc",
                    borderRadius:"8px 8px 0px 0px",
                    padding:"10px",
                    paddingBottom:"48px",
                    position:"absolute",
                    margin:"0"
                }}
                onClick={(e)=>e.stopPropagation()}
            >
                <div style={{padding:"0px 24px", marginBottom:"0px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    {popUpMsg && <p style={{color:"#514C9F", textAlign:"center", lineHeight:"24px", margin:"10px 0"}}>{popUpMsg}</p>}
                    {searchAnimation && 
                    <>
                        <div style={{height:"120px", aspectRatio:"2/1"}} id="searchAnimation"></div>
                        <p style={{color:"#514C9F", fontWeight:"700", marginBottom:"12px"}}>Account statement collected!</p>
                    </>}
                </div>
                <button 
                    className='submit'
                    onClick={()=>checkAndNavigate()}
                >
                    {yesBtnText!=="" ? yesBtnText : "Yes, proceed"}
                </button>

                {popUpMsg && 
                    <button 
                        className='submit lite' 
                        onClick={()=>{setShowPopOver(false)}}
                        style={{
                            marginTop:"0"
                        }}
                    >
                        {NoBtnText!=="" ? NoBtnText : "No, I want to change the details"}
                    </button>
                }
            </div>
        </div>
    )
}