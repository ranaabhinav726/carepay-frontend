import CustomNavbar from "../Components/Navbar";
import I2ILogo from '../assets/i2i logo.svg'
import CreditFairLogo from '../assets/Creditfair logo 1.svg'
import LiquiLoanLogo from '../assets/Liquiloans logo 1.svg'
import Globe from '../assets/globe.svg'

import { MdPhone } from "react-icons/md";
import { MdMail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

import './css/lendingPartner.scss'
import { Footer } from "./WebHomepage";
import { useEffect } from "react";

export default function LendingPartners(){

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div className='website-container'>
            <CustomNavbar />
            <h1>Our lending partners</h1>
            <div className="lendingCardWrapper">
                <LendingPartnerCard 
                    bgColor={"#ECEBFF"} 
                    logo={I2ILogo}
                    lenderName={"i2i Funding (RNVP Technology Pvt. Ltd.)"} 
                    policyLink={"https://www.i2ifunding.com/grievance-redressal-policy"} 
                    officerName={"Nishant Gupta"}
                    phoneNum={"+919717420307"}
                    mailId={"investment@i2ifunding.com"}
                    address={"i2iFunding, Ground Floor, A-217, Sector 69, Noida, 201301"}
                />
                <LendingPartnerCard 
                    bgColor={"#CAE4CB"} 
                    logo={CreditFairLogo}
                    lenderName={"Credit Fair Capital (K.M. Global Credit Pvt. Ltd.)"} 
                    policyLink={"https://creditfair.in/grievance-policy"}
                    officerTitle="KMCG grievance redressal officer: " 
                    officerName={"Shraddha Mandlik"}
                    phoneNum={"+919137504870"}
                    mailId={"grievance@creditfair.in"}
                    address={"Credit Fair (K. M. Global Credit Private Limited) 9, 902, Tower A, Naman Midtown, Senapati Bapat Marg, Dadar West, Mumbai, Maharashtra 400028"}
                />
                <LendingPartnerCard 
                    bgColor={"#F6E1D7"} 
                    logo={LiquiLoanLogo}
                    lenderName={"Liquiloans (NDX P2P Pvt. Ltd.)"} 
                    policyLink={"https://www.liquiloans.com/customer-grievances-redressal-mechanism"}
                    officerTitle="Grievance redressal officer: " 
                    officerName={"Mr. V. Balamurugan"}
                    phoneNum={"02247779519"}
                    mailId={"grievances@liquiloans.com"}
                    address={"2nd Floor, Office No. 203 and 204, Mittal Commercia, Saki Naka, Off Andheri Kurla Road, Andheri (East), Mumbai - 400059."}
                />
            </div>
            <Footer />
        </div>
    )
}

function LendingPartnerCard(
        {
            bgColor,
            logo, 
            lenderName, 
            policyLink, 
            officerTitle="Grievance Redressal Officer: ", 
            officerName, 
            phoneNum,
            mailId,
            address
        }
    ){

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div className="lenderCard" style={{background:bgColor, borderRadius:"4px", padding:"12px 8px"}}>
            <img src={logo} style={{padding:"6px", height:"100px", aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
            <h4 style={{fontSize:"24px", margin:"1rem 0"}}>{lenderName}</h4>
            <p style={{fontSize:"14px", fontWeight:"700", margin:"1rem 0 0.8rem 0"}}>Policy</p>
            <div>
                <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <img src={Globe} style={{padding:"6px", height:"34px", aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
                    <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                        <a target="_blank" href={policyLink}>{policyLink}</a>
                    </span>
                </div>
            </div>
            <p style={{fontSize:"14px", opacity:"0.8", margin:"1.5rem 0 0.3rem 0"}}>{officerTitle}</p>
            <p style={{fontSize:"14px", fontWeight:"700", marginBottom:"1rem"}}>{officerName}</p>

            <div style={{display:"flex", alignItems:"center", gap:"10px",marginBottom:"12px"}}>
                <div style={{width:"34px"}}><MdPhone style={{padding:"4px", height:"34px", width:"34px", color:"#514C9F", background:"white", borderRadius:"4px"}} /></div>
                <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                    <a href={"tel:"+{phoneNum}}>{phoneNum}</a>
                </span>
            </div>

            <div style={{display:"flex", alignItems:"center", gap:"10px",marginBottom:"12px"}}>
                <div style={{width:"34px"}}><MdMail style={{padding:"4px", height:"34px", width:"34px", color:"#514C9F", background:"white", borderRadius:"4px"}} /></div>
                <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                    <a href={"mailto:"+{mailId}}>{mailId}</a>
                </span>
            </div>

            <div style={{display:"flex", alignItems:"center", gap:"10px",marginBottom:"12px"}}>
                <div style={{width:"34px", alignSelf:"flex-start"}}><MdLocationOn style={{padding:"4px", height:"34px", width:"34px", color:"#514C9F", background:"white", borderRadius:"4px"}} /></div>
                <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>{address}</span>
            </div>
        </div>
    )
}