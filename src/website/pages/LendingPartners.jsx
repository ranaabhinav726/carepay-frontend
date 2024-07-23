import CustomNavbar from "../Components/Navbar";
import I2ILogo from '../assets/i2i logo.svg'
import CreditFairLogo from '../assets/Creditfair logo 1.svg'
import LiquiLoanLogo from '../assets/Liquiloans logo 1.svg'
import Globe from '../assets/globe.svg'
import IncredLogo from '../assets/Incred Finance logo 1.svg'
import FibeLogo from '../assets/fibe logo 1.svg'

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
                    mailId={"nishant.gupta@i2ifunding.co.in"}
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
                    <LendingPartnerCardIncred 
                    bgColor={"#ECEBFF"} 
                    logo={IncredLogo}
                    lenderName={"Incred Financial Services Limited"} 
                    policyLink={"https://www.incred.com/grievance-bee-secure.html"}
                    officerTitle="Grievance redressal officer: " 
                    officerName={"Mr. Vaidyanathan Ramamoorthy"}
                    phoneNum={"022-42117799"}
                    mailId={"incred.grievance@incred.com"}
                    address={"Incred Financial Services Limited, 1203, 12th Floor, B Wing, The Capital, Bandra Kurla Complex, Mumbai - 400 051"}
                />
                    <LendingPartnerCard 
                    bgColor={"#CAE4CB"} 
                    logo={FibeLogo}
                    lenderName={"Social Worth Technologies Pvt. Ltd."} 
                    policyLink={"https://www.fibe.in/grievance-redressal/"}
                    officerTitle="Grievance redressal officer: " 
                    officerName={"Mr. Abhiroop Khairnar"}
                    phoneNum={"020-67639797"}
                    mailId={"grievance@fibe.in"}
                    address={"404, The Chambers, Viman Nagar,Pune, 411014"}
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
        <div className="lenderCard" style={{background:bgColor, borderRadius:"4px", padding:"12px 8px",minHeight:'580px'}}>
            <img src={logo} style={{padding:"6px",  aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
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
function LendingPartnerCardIncred(
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
    <div className="lenderCard" style={{background:bgColor, borderRadius:"4px", padding:"12px 8px",minHeight:'580px'}}>
        <img src={logo} style={{padding:"6px",  aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
        <h4 style={{fontSize:"24px", margin:"1rem 0"}}>{lenderName}</h4>
        <p style={{fontSize:"14px", fontWeight:"700", margin:"1rem 0 0.8rem 0"}}>Details of InCred Personal loans </p>
        <div>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <img src={Globe} style={{padding:"6px", height:"34px", aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
                <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                    <a target="_blank" href={'https://personal-loans.incred.com/personal-loan'}>{'https://personal-loans.incred.com/personal-loan'}</a>
                </span>
            </div>
        </div>
        <p style={{fontSize:"14px", fontWeight:"700", margin:"1rem 0 0.8rem 0"}}>Policy</p>
        <div>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <img src={Globe} style={{padding:"6px", height:"34px", aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
                <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                    <a target="_blank" href={policyLink}>{policyLink}</a>
                </span>
            </div>
        </div>
        <p style={{fontSize:"14px", fontWeight:"700", margin:"1rem 0 0.8rem 0"}}>Partnership</p>
        <div>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <img src={Globe} style={{padding:"6px", height:"34px", aspectRatio:"1/1", background:"white", borderRadius:"4px"}} alt="" />
                <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                    <a target="_blank" href={'https://www.incred.com/home/partnership/ '}>{'https://www.incred.com/home/partnership/ '}</a>
                </span>
            </div>
        </div>
        <p style={{fontSize:"14px", fontWeight:"700", margin:"1rem 0 0.8rem 0"}}>Customer Service Department</p>
        <div style={{display:"flex", alignItems:"center", gap:"10px",marginBottom:"12px"}}>
            <div style={{width:"34px"}}><MdPhone style={{padding:"4px", height:"34px", width:"34px", color:"#514C9F", background:"white", borderRadius:"4px"}} /></div>
            <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                <a href={"tel:1800 10 22 192"}>{'1800 10 22 192'}</a>
            </span>
        </div>

        <div style={{display:"flex", alignItems:"center", gap:"10px",marginBottom:"12px"}}>
            <div style={{width:"34px"}}><MdMail style={{padding:"4px", height:"34px", width:"34px", color:"#514C9F", background:"white", borderRadius:"4px"}} /></div>
            <span style={{fontSize:"14px", color:"rgba(0,0,0,0.8"}}>
                <a href={"mailto:care@incred.com"}>{'care@incred.com'}</a>
            </span>
        </div>
        <p style={{fontSize:'12px',color:'#000000'}}>Customers are requested to first raise their concerns through any of the channels mentioned above. And if the same is not resolved within 5 days or if the customer is not satisfied with the solution provided by the customer care service, then the customer may follow below escalations for resolving their grievances,</p>

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