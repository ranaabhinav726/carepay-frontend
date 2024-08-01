import { useEffect } from "react";
import lottie from "lottie-web";
import PanImage from '../../assets/Mockp PAN 2.png'
//    const [showPopOver, setShowPopOver] = useState(null);
// { <BottomPopOverModal showPopOver={showPopOver}  setShowPopOver={setShowPopOver} />}
// let details = {
//     "clinicName" : clinicName,
//     "doctorId" : doctorId
// }
//setShowPopOver(details)
export default function BottomPopOverModal({firstName, popUpMsg, searchAnimation, showPopOver, setShowPopOver, checkAndNavigate, yesBtnText = "", noBtnText = "", noBtnClick = () => { } }) {

    // const [doctorId, setDoctorId] = useState(showPopOver?.doctorId)
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
    return (
        <div
            className={'bottomPopOverModal ' + (showPopOver ? "open" : "")}
            onClick={() => { setShowPopOver(false) }}
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
                <div className="text-center">
                    <img src={PanImage} />
                    <div style={{border:'2px solid #FF6969',width:'73%',marginLeft:'auto',marginRight:'auto',padding:'10px',borderRadius:'5px'}}>
                        {firstName}
                    </div>
                </div>
                <div style={{ padding: "0px 24px", marginBottom: "0px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    {popUpMsg && <p style={{ color: "#514C9F", textAlign: "center", lineHeight: "24px", margin: "10px 0" }}>{popUpMsg}</p>}

                </div>
                <button
                    className='submit'
                    onClick={() => checkAndNavigate()}
                >
                    {yesBtnText !== "" ? yesBtnText : "Yes, proceed"}
                </button>

                {popUpMsg &&
                    <button
                        className='submit lite'
                        onClick={() => { noBtnWrapperFunction() }}
                        style={{
                            marginTop: "0"
                        }}
                    >
                        {noBtnText !== "" ? noBtnText : "No, I want to change the details"}
                    </button>
                }
            </div>
        </div>
    )
}