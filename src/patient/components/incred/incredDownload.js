import React from "react";
import Header from "../Header/Header";
import Star from './images/star.svg'
import SmallLogo from './images/image 2.svg'
import Logo1 from './images/logo1.svg'
import Logo2 from './images/logo2.svg'
const DownloadIncred = () => {
    return (
        <main className=''>
            <Header progressbarDisplay="none" />
            <div style={{ background: '#ECEBFF', padding: '10px', width: '100%', borderRadius: '5px' }}>

                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '10%' }}><img src={Star} /></div>
                    <div style={{ width: '90%', marginTop: '6px', fontSize: '14px' }}><span style={{ color: "#514C9F" }}><b>Important:</b></span>
                        <p style={{ marginTop: '10px', marginBottom: '10px' }}><b>Doctor will only collect the settlement amount.</b></p>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0", fontSize: '14px' }}>
                    <p style={{ marginLeft: '10%' }}>
                        Net Disbursal amount
                    </p>
                    <p style={{ alignSelf: "end", whiteSpace: "pre" }}>    ₹ 90000</p>
                </div>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0", fontSize: '14px' }}>
                    <p style={{ marginLeft: '10%' }}>
                        Final Settlement amount
                    </p>
                    <p style={{ alignSelf: "end", whiteSpace: "pre" }}>    ₹ 88000</p>
                </div>
                <p style={{ marginLeft: '10%', fontSize: '12px' }}>Doctor will not collect the total amount due to the subvention charges borne by them.</p>
            </div>
            <div style={{ background: '#EBFEED', textAlign: 'center', width: '100%', marginTop: '10px', borderRadius: '5px', padding: '10px', fontSize: '14pxS' }}>
                <p>To complete the rest of the process,</p>
                <p>download the<img src={SmallLogo} style={{ marginBottom: '-20px' }} /> app now!</p>
                <div style={{ marginBottom: '10px' }}></div>
            </div>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px' }}>Click on the options below to download app -</p>
            <div style={{ width:'100%', textAlign: 'center' }}>
                {/* <div style={{ width: '50%' }}> */}
                <a target="_blank" style={{cursor:'pointer'}} href='https://play.google.com/store/apps/details?id=com.incred.customer' >  <img style={{ width: '30%'}} src={Logo1} /></a>
                {/* </div> */}
                {/* <div style={{ width: '50%' }}>
                    <img  style={{width:'96%'}} src={Logo2} />
                </div> */}
            </div>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '20px' }}>Need help? Reach out to us.-</p>

            <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>Contact Support</button>
        </main>
    )
}
export default DownloadIncred