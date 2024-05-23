import Header from "../../Header/Header"
import './verificationSuccesful.scss'

import { useNavigate } from "react-router-dom"

import NumberVerified from '../../../assets/shield.png'
import routes from "../../../../layout/Routes"
import CompletedGif from "../../../../utils/loader/completegif"


const KycVerificationSuccesful = ({ data = "KYC Done Successfully!!" }) => {
    // data = 
    // "Documents Verified!"  for documents verification
    // "Bank Details Verified" from bank details verification

    const navigate = useNavigate();

    setTimeout(()=>{
        navigate(routes.WAIT_ARTH, {replace: true})
    },3000)

    return (
        <>
            <main className="verificationSuccesful">
                <div style={{marginTop:'50px'}}>
                <CompletedGif text={'KYC Done Successfully!!'}/>
                </div>
                {/* <Header progressbarDisplay="none" />
                <div className="centerSection">
                    <img src={NumberVerified} alt="" />
                    <p className="redirectionMsg">{data}</p>
                </div> */}
            </main>
        </>
    )
}


export default KycVerificationSuccesful