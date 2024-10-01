import React, { useEffect, useState } from "react";
import { Header } from "../../Fibe flow/Comps/Header";
import ImageBank from '../assets/statemnetimg.svg'
import { useNavigate } from "react-router-dom";
import routes from "../../../../layout/Routes";
import axios from "axios";
import { APIS } from "../../../../utils/apifactory";
import { env } from "../../../environment/environment";
import Loadinggif from '../../../../utils/loader/loadergif'
let userId = localStorage.getItem('userId')

const BankstatementShare = () => {
    const [haveReport, setHaveReport] = useState(false)
    const [url, setUrl] = useState('')
    const [loaderState, setloaderState] = useState(false)

    let navigate = useNavigate()
    const onSubmit = () => {
        if (url !== '') {
            window.open(url)
            navigate(routes.MVREFRESH)
        }


    }
    useEffect(() => {
        setloaderState(true)
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                axios.get(env.api_Url + 'moneyViewActivityStatus?loanId=' + loanData.data.data.loanId)
                    .then((res) => {
                        setloaderState(false)

                        if (res.data.data.leadStatus === 'DOCS_REQUIRED') {
                            setUrl(res.data.data.statementUploadUrl)
                        } else {
                            navigate(routes.MV_CONGRATULATIONS)
                        }

                    })
            })


    }, [])

    return (
        <>
            <main className="bankDetails personalDetails" style={{ position: "relative" }}>

                <Header progress={80} />
                {loaderState ?
                    <Loadinggif />
                    : ""}
                {loaderState === false ?
                    <div style={{ padding: '5px' }}>
                        <h4><b>Share bank statement</b></h4>
                        <p style={{ marginTop: '20px' }}>To verify your income, we need to access your<br /> latest bank statement. This data sharing is <br />completely secured and encrypted.  </p>
                        <div style={{ marginTop: '40px', textAlign: 'center' }}> <img src={ImageBank} /></div>
                        <div style={{ background: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '30px' }}>
                            <p className="text-center">You will be redirected to our partner platform for income verification.</p>
                            {url !== '' ? <button onClick={() => onSubmit()} className="submit">Continue to share bank statement</button> : ""}
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '20px', marginTop: '120px' }}>Need help? Reach out to us.</p>
                        <a style={{ color: '#000', textDecoration: 'none', width: '100%' }} href={"tel:+91 806 948 9655"}>
                            <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>
                                Contact Support
                            </button>
                        </a>
                    </div>
                    : ""}

            </main>
        </>
    )
}
export default BankstatementShare