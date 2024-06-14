import { useEffect } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import routes from "../../../layout/Routes";


export default function ExploreOffer({ popUpMsg, searchAnimation, showPopOver, setShowPopOver, checkAndNavigate, yesBtnText = "", noBtnText = "", noBtnClick = () => { } }) {

    // const [doctorId, setDoctorId] = useState(showPopOver?.doctorId)
    let navigate=useNavigate()
    useEffect(() => {
    
        if (!!searchAnimation) {
            lottie.loadAnimation({
                container: document.querySelector("#searchAnimation"),
                animationData: searchAnimation,
                renderer: "canvas"
            });
        }

    }, []);

    function noBtnWrapperFunction() {
        setShowPopOver(false);
        noBtnClick();
    }
    const navigaateTopersonal=()=>{
        navigate(routes.ARTH_PERSONAL_DETAILS)
    }
    return (
        <div
            className={'bottomPopOverModal ' + (showPopOver ? "open" : "")}

            style={{
                height: "100%",
                width: "100%",
                background: "rgba(0,0,0,0.2)",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                padding: "0"
            }}>
            <div
                className="popUpCard-custom"
                style={{
                    width: "100%",
                    background: "white",
                    boxShadow: "0px 0px 10px #ccc",
                    borderRadius: "8px 8px 0px 0px",
                    padding: "10px",
                    paddingBottom: "48px",
                    position: "absolute",
                    margin: "0"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ padding: "0px 24px", marginBottom: "0px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "#514C9F", textAlign: "center", lineHeight: "24px", margin: "10px 0" }}>
                        This offer was curated by<br />
                        your bank for you.
                    </p>

                </div>
                <div style={{ backgroundColor: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '10px', marginBottom: '10px' }}>

                    <p style={{ textAlign: "center" }}>For more offers, we will have to check with other banks and NBFCs,
                        for which we require more data and
                        might require more time.</p>
                </div>
                <p className="text-center"><b className="text-center">Are you sure you want to
                    explore more options?</b></p>
                <div style={{display:'flex',width:'100%',textAlign:'center',marginTop:'20px'}}> <button className='submit' style={{ background: '#ECEBFF', color: '#504c9a', marginTop: '-2px',width:'43%',marginLeft:'auto',marginRight:'auto' }} onClick={() => setShowPopOver('')}>No</button>
                <button className='submit' style={{   marginTop: '-2px',width:'43%' ,marginLeft:'auto',marginRight:'auto'}} onClick={()=>navigaateTopersonal()}> Yes</button>
                </div>
            </div>

        </div>
    )
}