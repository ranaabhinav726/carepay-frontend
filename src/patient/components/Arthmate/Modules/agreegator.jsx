import React, { useEffect, useState } from "react";
import { Header } from "../../Fibe flow/Comps/Header";
import Faster from '../assets/fasterprocess.svg'
import BankLogo from '../assets/banklogo.svg'
import axios from "axios";
import { env } from "../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../layout/Routes";
import { Call } from "@mui/icons-material";
let userId = localStorage.getItem('userId')
const BankstatementShare = () => {
    let navigate = useNavigate()
    const [digitTapData, setDigitapData] = useState('')
    const [accept, setAccept] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {

        axios.get(env.api_Url + "checkDigitapInstituteAvailable?userId=" + userId)
            .then(response => {
                if (response.data.message === "success") {
                    let data = response.data.data;
                    if (!!data) {
                        setDigitapData(data)


                    }
                } else {
                    if (response.data.message === "failure") {
                        navigate(routes.FILE_UPLOAD)
                    }

                }
            }).catch(() => {
                console.log("Error fetching data");
            })


    }, [])
    const submitData = (type, instituteId) => {
        if (accept) {
            // if (type !== 'statement') {
            setErrorMsg('')
            axios.post(env.api_Url + "generateURL" + '?userId=' + userId + '&type=' + type + '&instituteId=' + instituteId, {

            })
                .then((response) => {
                    console.log(response)
                    if (response.data.message === "success") {
                        window.open(response.data.data.url)
                    }
                })
            // } else {
            //     if (type === 'statement') {
            //         navigate(routes.FILE_UPLOAD)
            //     }
            // }
        } else {
            setErrorMsg('Please tick to proceed !')
        }
    }
    return (
        <>
            <main className="bankDetails personalDetails" style={{ position: "relative" }}>
                <Header progress={80} />
                <div style={{ padding: '5px' }}>
                    <h4><b>Share bank statement</b></h4>
                    <p style={{ marginTop: '20px' }}>Select method for sharing bank data:</p>
                    <div style={{ display: 'flex' }}><img src={BankLogo} />&nbsp;&nbsp;<div style={{ marginTop: '12px' }}>{digitTapData !== '' ? digitTapData.BankName : ""}</div></div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '5%', marginTop: '-10px' }}>
                            <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                        </div>&nbsp;
                        <div style={{ width: '90%' }}><p style={{ fontSize: '12px' }}>I allow CareCoin Technologies Pvt Ltd and its partners to be<br /> my authorised representative for fetching my transactions <br />data from my bank.</p></div>
                    </div>
                    <p className="" style={{ color: 'red' }}>{errorMsg}</p>
                    {digitTapData !== '' && digitTapData.AccountAggregator ?
                        <>
                            <button onClick={() => submitData('accountAggregator', digitTapData.instituteIdForAccountAggregator)} style={{ background: '#ecebfd', padding: '10px', borderRadius: '5px' ,border:'none',width:'100%',textAlign:'left'}}>
                                <p style={{ color: '#504c9a' }}><b>Proceed with Account Aggregator</b></p>
                                <p style={{ color: '#8e8d98' }}>Faster and secure financial data transfer via<br />
                                    RBI regulated entity</p>
                                    <div style={{ marginTop: '' }}>
                                <img src={Faster} />
                            </div>
                            </button>
                           
                        </> : ""}
                       
                    {digitTapData !== '' && digitTapData.NetBanking ?
                        <>
                            <button onClick={() => submitData('netBanking', digitTapData.instituteIdForNetBanking)} style={{ background: '#ecebfd', padding: '10px', borderRadius: '5px',marginTop:'20px',border:'none',width:'100%',textAlign:'left' }}>
                                <p style={{ color: '#504c9a' }}><b>Proceed with Net banking</b></p>
                                <div style={{ marginTop: '' }}>
                                <img src={Faster} />
                            </div>
                            </button>
                           
                        </>
                        : ""}
                        <br/>

                    {digitTapData !== '' && digitTapData.Statement ?

                        <button onClick={() => submitData('statement', digitTapData.instituteIdForStatement)} style={{ background: '#ecebfd', padding: '10px', borderRadius: '5px',marginTop:'20px',border:'none',width:'100%',textAlign:'left' }}>
                            <p style={{ color: '#504c9a' }}><b>Upload bank account statement PDF</b></p>

                        </button>
                        : ""}
                    {/* <div style={{ marginTop: '24px', textAlign: 'center' }}> <img src={ImageBank} /></div> */}
                    {/* <button onClick={() => onSubmit()} className="submit">Continue</button> */}
                    <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '20px', marginTop: '120px' }}>Need help? Reach out to us.</p>
                    <a style={{ color: '#000', textDecoration: 'none', width: '100%' }} href={"tel:+91 806 948 9655"}>
                        <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>
                            Contact Support
                        </button>
                    </a>
                </div>

            </main>
        </>
    )
}
export default BankstatementShare