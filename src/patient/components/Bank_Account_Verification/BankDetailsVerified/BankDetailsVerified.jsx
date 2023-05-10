import Header from "../../Header/Header"
import './bankDetailsVerified.scss'

import NumberVerified from '../../../assets/shield.png'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const BankDetailsVerified = ({data = "Bank Details Verified!"}) =>{

    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/patient/LoanAgreement', {replace:true})
        },3000)
    },[])

   return(
    <>
    <main className="bankDetailsVerified">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={NumberVerified} alt="" />
            <p className="redirectionMsg">{data}</p>
        </div>
    </main>
    </>
   )
}


export default BankDetailsVerified