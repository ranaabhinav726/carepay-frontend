import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Star from './images/star.svg'
import SmallLogo from './images/image 2.svg'
import CallIcon from './images/callicon.svg'
import Logo2 from './images/downloadbutton.svg'
import { Call } from "@mui/icons-material";
import axios from "axios";
import { env } from "../../environment/environment";
const DownloadIncred = () => {
    let userId = localStorage.getItem('userId')
    const apiUrl = env.api_Url;

    const [reportData, setReportData] = useState('')
    useEffect(() => {
        axios.get(`${apiUrl}getIncredCalculation?userId=${userId}`)
            .then((response) => {
                if (response.data.message === 'success') {
                    setReportData(response.data)
                }
            })
    }, [])
    return (
        <main className=''>
            <Header progressbarDisplay="none" />
            <div style={{ background: '#ECEBFF', padding: '10px', width: '100%', borderRadius: '5px' }}>

                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '10%' }}><img src={Star} /></div>
                    <div style={{ width: '90%', marginTop: '6px', fontSize: '14px' }}><span style={{ color: "#514C9F" }}><b>Please note:</b></span>
                        {/* <p style={{ marginTop: '10px', marginBottom: '10px' }}><b>Doctor will only collect the settlement amount.</b></p> */}
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0", fontSize: '14px' }}>
                <p style={{ marginLeft: '1%' }}>
                    Amount to be paid to the clinic -
                </p>
                <p style={{ alignSelf: "end", whiteSpace: "pre", marginTop: '30px', fontSize: '24px', color: '#514C9F', fontWeight: '700' }}>    ₹ {reportData !== '' && reportData.data.amountPaidToClinic ? reportData.data.amountPaidToClinic : ''}</p>

            </div>
            <hr />
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0", fontSize: '14px' }}>
                <p style={{ marginLeft: '1%' }}>
                    Treatment amount
                </p>
                <p style={{ alignSelf: "end", whiteSpace: "pre" }}>    ₹ {reportData !== '' && reportData.data.TreatmentAmount ? reportData.data.TreatmentAmount : ''}</p>
            </div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0", fontSize: '14px' }}>
                <p style={{ marginLeft: '1%' }}>
                    Advance cashback
                </p>
                <p style={{ alignSelf: "end", whiteSpace: "pre", color: '#149540' }}>    ₹ {reportData !== '' && reportData.data.advanceCashBackMinRange ? reportData.data.advanceCashBackMinRange : ''}{reportData !== '' && reportData.data.advanceCashBackMaxRange && reportData.data.advanceCashBackMaxRange !== reportData.data.advanceCashBackMinRange ? '-₹' : ''}{reportData !== '' && reportData.data.advanceCashBackMaxRange && reportData.data.advanceCashBackMaxRange !== reportData.data.advanceCashBackMinRange ? reportData.data.advanceCashBackMaxRange : ''}</p>
            </div>
            {/* <p style={{ marginLeft: '1%', fontSize: '12px' }}>Doctor will not collect the total amount due to the subvention charges borne by them.</p> */}

            <div style={{ background: '#ECEBFF', textAlign: 'center', width: '100%', marginTop: '10px', borderRadius: '5px', padding: '10px', fontSize: '14pxS' }}>
                <p>
                    Kindly pay Rs.
                    <b>&nbsp;{reportData && reportData.data && reportData.data.amountPaidToClinic ? reportData.data.amountPaidToClinic : ''}</b>
                    &nbsp;to
                    <b>&nbsp;{reportData && reportData.data && reportData.data.clinicName ? reportData.data.clinicName : ''}</b>
                    &nbsp;after the disbursal of your loan. The doctor will also be notified about this final payment amount.
                </p>            </div>

            <div style={{ background: '#ECEBFF', paddingBottom: '10px', borderRadius: '5px', marginTop: '20px' }} >
                <a target="_blank" style={{ cursor: 'pointer' }} href='https://play.google.com/store/apps/details?id=com.incred.customer' ><img src={Logo2} style={{ width: '100%', }} /></a>
                <p style={{ fontSize: '12px', textAlign: 'center' }}>A support executive from Incred Finance<br />
                    will reach out to you for completion of<br />
                    your loan application process.</p>
            </div>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '20px' }}>Need further help? </p>
            <div style={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
                <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}><div style={{display:'flex'}}><img src={CallIcon} />&nbsp;<div style={{ marginTop: '-2px' }}>Contact CarePay Support</div></div></button>
            </div>
        </main>
    )
}
export default DownloadIncred