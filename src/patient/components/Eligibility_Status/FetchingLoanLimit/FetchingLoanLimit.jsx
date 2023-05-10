import Header from "../../Header/Header"
import './fetchingLoanLimit.scss'

import rupeeIcon from '../../../assets/GIFs/Fetching limit.gif'
// import rupeeIcon from '../../assets/rupeeIcon.png'

import axios from "axios";

import { env } from "../../../environment/environment"
import { useEffect } from "react"
import { useData } from "../../data";
import { useNavigate } from "react-router-dom"

const FetchingLoanLimit = () =>{

    const data = useData();
    const navigate = useNavigate();

    let token = localStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(()=>{
        axios.post(env.api_Url + "update_user_stage", {
                "onboarding_stage": "FetchingLoanLimit"
            },
                config
            )
        .then((response) => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        });
    }, [])

    useEffect(()=>{
        axios
            .post(env.api_Url + "get_loan_limit", {
              },
              config )
            .then((response) => {
                let responseCode = response.status+"";
                console.log(response)
                if(responseCode[0] == '2'){
                    // console.log(response.data.data.credit_limit[0].paymeindia)
                    let refID = response.data.data.reference_id;
                    let limit = response.data.data.credit_limit[0].paymeindia;
                    data.addData({"reference_id": refID})
                    data.addData({"credit_limit": limit})
                    localStorage.setItem("reference_id", refID)
                    localStorage.setItem("limit", limit)
                    if(limit === null){
                        navigate('ApprovedLoanLimitNeg');
                    }else{
                        navigate('ApprovedLoanLimit', {replace:true});
                    }
                }
            }).catch(error => {
                console.log(error);
            });
    }, [])
   return(
    <>
    <Header progressbarDisplay="none" />

    <main className="fetchingLoanLimit">
        <div className="centerSection">
            <img src={rupeeIcon} alt="" />
            <p className="verifiedConfirmation">Fetching your pre approved credit limit...</p>
            {/* <div className="msgBox">
                <p>This will take approximately 15-20 mins</p>
                <span>Your progress is saved, you can exit and come back later by signing in with your mobile number.</span>
            </div>
            <div className="docsMsg">
                <p className="head">While you wait</p>
                <p>Kindly ready these documents for your loan application process</p>
                <ul>
                    <li>Aadhaar Card Image - Front</li>
                    <li>Aadhaar Card Image - Back</li>
                    <li>PAN Card Image - Front</li>
                    <li>Bank Statement - 3 months</li> 
                </ul>
            </div>
            <button onClick className="submit">Refresh status</button> */}
        </div>
    </main>
    </>
   )
}


export default FetchingLoanLimit