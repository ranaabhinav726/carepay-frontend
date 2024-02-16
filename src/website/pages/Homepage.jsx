import './css/section.scss'
import PrimaryButton from '../Components/PrimaryButton'
import HeroImg from '../assets/Hero animation 2-min.gif'
import FinanceImg from '../assets/Finance.webp'
import FloatingButton from '../Components/FloatingButton'

import { handleContactScroll } from '../Components/utility'


import RevenueImg from '../assets/revenue.webp'
import OperationsImg from '../assets/operations.webp'
import { useEffect, useRef, useState } from 'react'

import Step1Gif from '../assets/GIFs/Step 1.gif'
import Step2Gif from '../assets/GIFs/Step 2.gif'
import Step3Gif from '../assets/GIFs/Step 3.gif'
import Step4Gif from '../assets/GIFs/Step 4.gif'
import Step5Gif from '../assets/GIFs/Step 5.gif'

import FutureHealthcare from '../assets/healthcare finance.webp'
import TrustedBy1 from '../assets/trustedBy-1.webp'
import TrustedBy2 from '../assets/trustedBy-2.webp'
import TrustedBy3 from '../assets/trustedBy-3.webp'
import { Link } from 'react-router-dom'

import FooterLogo from '../assets/footerLogo.png'
import CallIcon from '../assets/call.webp'
import EmailIcon from '../assets/email.webp'
import LocationIcon from '../assets/location.webp'
import LinkedinIcon from '../assets/linkedIn.webp'
import InstaIcon from '../assets/instaIcon.webp'
import axios from 'axios'
import CustomNavbar from '../Components/Navbar'

import MidDayLogo from '../assets/Mid day logo.png'
import FinExpLogo from '../assets/financialexpress logo.png'
import PharmaBizLogo from '../assets/PharmaBiz logo.png'

import Aos from 'aos';
import 'aos/dist/aos.css'

function WebHomepage(){

    useEffect(()=>{
        Aos.init({
            anchorPlacement: "bottom-bottom"
        });
        // window.scrollTo(0, 0);
    }, []) 

    return(
        <div className='website-container'>
            <CustomNavbar />
            <Hero />
            <PatientFinancing />
            <BoostRevenue />
            <Operations />
            <HowItWorks />
            <HealthcareFinance />
            {/* <Reviews /> */}
            <Articles />
            <Branding />
            <HomepageFAQs />
            <Contact />
            <Footer />
        </div>
    )
}

export default WebHomepage


function Hero(){
    return(
        <section className='hero'>
            <div className="container">
                <div className="flex-content-wrapper" style={{margin:"2rem 0"}}>
                    <div className="section-content hero-container-content">
                        {/* <h1>Increase your <br />Revenue <br/>by 50 <div className="percent-wrapper" style={{font:"inherit", fontSize:"0.6em"}}>%</div></h1> */}
                        <h1>Increase your <br />Revenue <br/>by 50 <sup style={{font:"inherit", fontSize:"0.5em", marginLeft:"-5px"}}>%</sup></h1>
                        <p className="text-content">Empower your journey with CarePay’s cutting-edge <br/>financial solutions for healthcare.</p>
                        <PrimaryButton content={"Partner up with us"} to={"javascript:void(0)"} variant='dark' vanishOnCollapse callback={handleContactScroll} />
                        <FloatingButton content={"Partner up"} to={"javascript:void(0)"} callback={handleContactScroll} />
                    </div>
                    <div className="section-content hero-container-image">
                        <img src={HeroImg}
                        style={{
                            maxWidth: "90%",
                            display: "block",
                            margin: "unset auto"
                        }}
                        alt="" />
                    </div>
                </div>
                <div className="container" style={{marginTop:"100px"}}>
                    <h2>Holistic <span className='highlight' style={{font:"inherit"}}>Solutions</span> for Progressive Healthcare</h2>
                    <p className="text-content" style={{textAlign:"center"}}>Harness the synergy of patient financing and intelligent healthcare solutions.</p>
                </div>
            </div>
        </section>
    )
}

function PatientFinancing(){
    return(
        <section className="patient-financing">
            <div className="container">
                <div className="flex-content-wrapper">
                    <div className="section-content financing-container-content">
                        <div className="section-content-wrapper">
                            <h3>Patient <br/>Financing</h3>
                            <p className="text-content">Partner with CarePay to empower your patients with flexible EMI options and real-time credit approval, enhancing their access to quality healthcare</p>
                            <p className="text-content" style={{fontSize:"90%"}}>Available EMI tenures are of 3 to 18 months.</p>
                        </div>
                    </div>
                    <div className="section-content financing-container-image" data-aos="zoom-in">
                        <img src={FinanceImg}
                        style={{
                            maxWidth: "90%",
                            display: "block"
                        }}
                        alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

function BoostRevenue(){
    return(
        <section className="boost-revenue">
            <div className="container">
                <div className="flex-content-wrapper">
                    <div className="section-content revenue-container-image" data-aos="zoom-in">
                        <img src={RevenueImg}
                        style={{
                            maxWidth: "90%",
                            display: "block",
                            margin: "auto"
                        }}
                        alt="" />
                    </div>
                    <div className="section-content revenue-container-content">
                        <div className="section-content-wrapper">
                            <h3>Boost your <br/>Revenue</h3>
                            <p className="text-content">Convert and retain more patients, <br/>elevate patient satisfaction and maximize your revenue.</p>
                            {/* <p className="text-content">Available EMI tenures are of 3 to 18 months.</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Operations(){
    return(
        <section className="operations">
            <div className="container">
                <div className="flex-content-wrapper">
                    <div className="section-content operations-container-content">
                        <div className="section-content-wrapper">
                            <h3>Streamlined <br/>Operations</h3>
                            <p className="text-content">Maximize your operational efficiency with CarePay’s instant credit approvals and payouts.</p>
                            {/* <p className="text-content" style={{fontWeight:600}}>Available EMI tenures are of 3 to 18 months.</p> */}
                        </div>
                    </div>
                    <div className="section-content operations-container-image" data-aos="zoom-in">
                        <img src={OperationsImg}
                        style={{
                            maxWidth: "90%",
                            display: "block"
                        }}
                        alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

function HowItWorks(){

    const [active, setActive] = useState("tab-1");
    const refGif = useRef();
    const refCaption = useRef();
    
    useEffect(()=>{
        switch(active){
            case "tab-1":
                refGif.current.src = Step1Gif;
                refCaption.current.innerText = "Patient scans the QR placed at doctor’s clinic and applies for the credit.";
                break;
            case "tab-2":
                refGif.current.src = Step2Gif;
                refCaption.current.innerText = "Patient enters relevant data to check eligibility.";
                break;
            case "tab-3":
                refGif.current.src = Step3Gif;
                refCaption.current.innerText = "Patient enters treatment amount, selects EMI plan and submits relevant information to get credit approval.";
                break;
            case "tab-4":
                refGif.current.src = Step4Gif;
                refCaption.current.innerText = "After approval, patient submits the necessary documents for disbursal.";
                break;
            case "tab-5":
                refGif.current.src = Step5Gif;
                refCaption.current.innerText = "Patient pays the 1st EMI to you and rest amount is disbursed directly in your account.";
                break;
        }
    }, [active])
    return(
        <>
            <section className="how-it-works">
                <div className="container">
                    <div className="flex-content-wrapper">
                        <div className="section-content how-it-works-content">
                            <h2>How it works</h2>
                            <div className="tabs-bar">
                                <div className={active==="tab-1"?"tab active":"tab"} onClick={()=>setActive("tab-1")}>Step 1</div>
                                <div className={active==="tab-2"?"tab active":"tab"} onClick={()=>setActive("tab-2")}>Step 2</div>
                                <div className={active==="tab-3"?"tab active":"tab"} onClick={()=>setActive("tab-3")}>Step 3</div>
                                <div className={active==="tab-4"?"tab active":"tab"} onClick={()=>setActive("tab-4")}>Step 4</div>
                                <div className={active==="tab-5"?"tab active":"tab"} onClick={()=>setActive("tab-5")}>Step 5</div>
                            </div>
                            <p ref={refCaption} className="text-content"></p>
                            {active==="tab-3" && <p style={{marginTop:0, fontSize:"12px"}}>Available EMI tenures are of 3/6/10/12/15/18 months.</p>}
                        </div>
                        <div className="section-content how-it-works-image">
                            <div className="gif-wrapper">
                                <img ref={refGif} src={Step1Gif} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function HealthcareFinance(){

    return(
        <>
        <section className="future-healthcare">
            <div className="container">
                <h2><span className='clr-purple'>Shaping the Future</span> of Healthcare Finance</h2>
                <p className="text-content">Revolutionizing the landscape with integrated financial services</p>

                <img src={FutureHealthcare} data-aos="zoom-in" style={{margin:"2rem auto"}} alt="" />

                <p className="text-content">At CarePay, we envisage a future where financial services are seamlessly integrated into healthcare, creating a harmonious ecosystem that benefits both healthcare providers and patients. Our cutting-edge solutions aim at the bigger picture, evolving to serve the ever-growing demands of India’s healthcare sector.</p>

                <h4 style={{fontSize:"42px", marginTop:"3rem"}}>Trusted by</h4>
                <div className="trustedBy-wrapper">
                    <div className="trustedBy">
                        <img src={TrustedBy1} alt="" />
                    </div>
                    <div className="trustedBy">
                        <img src={TrustedBy2} alt="" />
                    </div>
                    <div className="trustedBy">
                        <img src={TrustedBy3} alt="" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

function Reviews(){
    
    return(
        <>
            <section className="reviews">
                <div className="container">
                    <h4>Approved by <br />registered clinicians</h4>

                    <div className="review-wrapper">
                        <Review starCount={3} clinicName={"Smiles clinic"} reviewContent={"Partnering up with CarePay has been one of the best decisions for my business and my patients have loved their service."} doctorName={"Dr. Raj Sharma"} />
                        <Review starCount={3} clinicName={"Smiles clinic"} reviewContent={"Partnering up with CarePay has been one of the eir service."} doctorName={"Dr. Raj Sharma"} />
                        <Review starCount={4} clinicName={"Smiles clinic"} reviewContent={"Partnering up with CarePay has been one of the best decisions for my business and my patients have loved their service."} doctorName={"Dr. Raj Sharma"} />
                    </div>
                </div>
            </section>
        </>
    )
}

function Review({starCount, clinicName, reviewContent, doctorName}){
    const star = "★";
    const unstar = "☆";

    let stars = "";
    for(let i=0; i<5; i++){
        if(i<starCount){
            stars += star + " ";
        }else{
            stars += unstar + " ";
        }
    }
    return(
        <div className="review">
            <div className="star-rating" style={{color:"gold"}}>{stars}</div>
            <h5>{clinicName}</h5>
            <p>{reviewContent}</p>
            <h6>{doctorName}</h6>
        </div>
    )
}

function Branding(){

    return(
        <>
            <section className="branding">
                <div className="container">
                    <h2>don't delay, just <span className='clr-purple'>carepay!</span></h2>
                    <p className="text-content">The sooner you join, the more patients you'll convert. So, say goodbye to payment delays and seize the opportunity to supercharge your revenue growth. Join CarePay today!</p>
                    <PrimaryButton content={"Partner up with us"} to={"javascript:void(0)"} variant='dark' callback={handleContactScroll} />
                </div>
            </section>
        </>
    )
}

function Articles(){

    return(
        <>
            <section className="articles" style={{background:"#ECEBFF"}}>
                <div className="container" style={{textAlign:"center"}}>
                    <h4 style={{fontSize:"42px", padding:"0 12px"}}>Insights & Innovations</h4>
                    <p className='text-content' style={{textAlign:"center", marginBottom:"1.5rem"}}>Stay updated with the latest trends, insights, <br/>and innovations in healthcare financing</p>
                </div>
                <div
                    className="scrollable-container"
                    // style={{
                    //     overflowX: "auto",
                    //     scrollbarWidth: "thin",
                    //     scrollbarColor: "#514C9F",
                    //     scrollbarGutter: "stable",
                    //     // userSelect: "none",
                    //     minWidth: "100%", // Set a minimum width
                    //     padding:"1%"
                    // }}
                >
                    <div className="wrapper" 
                        // style={{
                        //     padding: "30px",
                        //     display: "flex",
                        //     flexDirection: "row",
                        //     alignContent: "flex-start",
                        //     justifyContent: "space-between",
                        //     gap: "3rem",
                        // }}
                    >
                        <Article 
                            width={"25%"} 
                            as="480/320" 
                            imgWidth='40%' 
                            logo={MidDayLogo} content={"How CarePay is Changing the Face of Healthcare Financing"} link={"https://www.mid-day.com/brand-media/article/how-carepay-is-changing-the-face-of-healthcare-financing--gaurav-gupta-23317470"}
                        />
                        <Article 
                            width={"30%"} 
                            as="580/320" 
                            imgWidth='70%' 
                            logo={FinExpLogo} content={"The convergence of finance and healthcare: How fintech is bridging the gap"} link={"https://www.financialexpress.com/business/industry-the-convergence-of-finance-and-healthcare-how-fintech-is-bridging-the-gap-3283633/"}
                        />
                        <Article 
                            width={"30%"} 
                            as="580/320" 
                            imgWidth='45%' 
                            logo={PharmaBizLogo} content={"India’s digitally empowered fintech companies working to address optimal financial protection for patients"} link={"http://www.pharmabiz.com/NewsDetails.aspx?aid=163303&sid=1"}
                        />
                        <div className="spacer"
                        style={{
                            height:"100%",
                            width:"0.5rem",
                            opacity:"0",
                            userSelect:"none"
                        }}>....</div>
                    </div>
                </div>
            </section>
        </>
    )
}

function Article({ logo, content, link, width, imgWidth="50%", as }){
    return(
        <>
            <article 
                style={{width:`${width}`, aspectRatio:`${as}`, 
                        // minWidth:"30ch", padding:"30px", paddingBottom:"45px", 
                        // position:"relative", display:"flex", flexDirection:"column", 
                        // background:"#fff", borderRadius:"8px", border:"2px solid #263238", 
                        // boxShadow:"-16px 24px 0px 0px #504C9E"
                    }}
                className='article-content-container'    
            >
                <div style={{height:"20%", display:"flex", alignItems:"flex-start"}}><img src={logo} alt="" style={{width:`${imgWidth}`}} /></div>
                <p className='text-content' style={{fontWeight:"700"}}>{content}</p>
                <Link to={link} target='_blank' style={{color:"#5149CF", textDecoration:"underline", fontWeight:"700", position:"absolute", bottom:'25px'}}>View article</Link>
            </article>
        </>
    )
}

function HomepageFAQs(){

    // const [activeFaq, setActiveFaq] = useState('');

    function clickHandler(e){
        // console.log(e.target)
        let panel = e.target.nextElementSibling;
        if(panel === null) return;
        
        if(e?.target?.classList?.contains('active')){
            e.target.classList.remove('active');
            panel.style.maxHeight = null;
            return;
        }
        closeAllFaq();
        e.target.classList.toggle('active');
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    }

    function closeAllFaq(){
        let faqs = document.getElementsByClassName('FAQs-content');
        // console.log(faqs[0]);
        for(let i=0; i<faqs.length; i++){
            let btn = faqs[i].children[0];
            let panel = faqs[i].children[1];

            if(btn && btn.classList.contains('active')){
                btn.classList.remove('active');
            }

            if(panel){
                panel.style.maxHeight = null;
            }
        }
    }
    return(
        <>
            <section className="homepage-FAQs">
                <div className="container">
                    <h3 style={{fontSize:"42px", fontWeight:"700"}}>FAQs</h3>
                    <div className="faq-wrapper" onClick={(e)=>clickHandler(e)}>
                        <FAQ question={"How much time does it take to get loan processed?"} answer={"It takes less than a minute to get the loan approved. On scanning the QR code and selecting the desired payment option, patients will have to enter their PAN and Aadhar Card no. for verification; post which the loan is approved, subject to credit eligibility and terms and conditions of loan agreement with the financial institution Partner."} />
                        <FAQ question={"What are the steps involved for making this option available at my hospital/clinic?"} answer={"You have to sign an agreement (shared digitally by our team) and fill a simple on-boarding form for getting started. Our team will reach out to you shortly after that for installing the QR code and training your receptionist."} />
                        <FAQ question={"Is the loan sanctioned/offered by CarePay?"} answer={"We work with various financial institutions/NBFCs (that are registered with RBI to offer loans) to be make the credit available to your patients."} />
                        <FAQ question={"Are there any charges involved?"} answer={"We are flexible about subvention and charges as per the preference of the hospital/clinic."} />
                        <FAQ question={"Is the loan available for all patients?"} answer={"It depends if the patient is eligible or not as per the Financial Institution Partner. Eligibility is communicated post the PAN and Aadhar verification."} />
                        <FAQ question={"How does the repayment process work?"} answer={"Repayment process and communication is entirely done by CarePay’s registered (RBI-registered) financial institution Partner. Hospital/Clinic has no role to play in this."} />
                        <FAQ question={"What is the maximum amount for which this option can be availed?"} answer={"Patients can avail instant credit for procedures/consultation/medicine purchase/lab tests amounting to ₹900 to ₹5,00,000."} />
                        <FAQ question={"Is there any liability on hospital/clinic for repayment of the loan?"} answer={"Neither the hospital nor the clinic is responsible to recover the loan. Disbursement/recovery shall be done by the registered financial institution Partner. At no point will CarePay or any of its partners reach out to the hospital/clinic for repayment."} />
                    </div>
                </div>
            </section>
        </>
    )
}

function FAQ({question, answer}){

    return(
        <>
            <div className={"FAQs-content"}>
                <button className="accordion">{question} <div className="circle"></div></button>
                <div className="panel">
                    <p className='answer'>{answer}</p>
                </div>
            </div>
        </>
    )
}

export function Contact(){

    const [name, setName] =     useState("");
    const [email, setEmail] =   useState("");
    const [number, setNumber] = useState("");
    const [query, setQuery] =   useState("");

    const [isSubmitted, setSubmitted] = useState(false);
    const [switchComp, setSwitchComp] = useState(false)

    const containerRef = useRef(null);

    function formSubmitted(){
        setSwitchComp(true)
        setTimeout(() => {
            setSubmitted(true);
            if(containerRef.current){
                containerRef.current.scrollIntoView({ behavior: "smooth", block: "start"});
            }
        }, 1000);
    }

    function handleSubmit(){
        // console.log(name, email, number, query);
        // formSubmitted(); return;
        if(! (name && email && number && query)){
            return;
        }
        axios.post(process.env.REACT_APP_BACKEND + "saveOrUpdateQuery", {
            "name" : name,
            "emailId" : email,
            "mobileNumber" : number,
            "query" : query
        }).then(response => {
            if(response.data.message === "success"){
                formSubmitted();
                setName("");
                setEmail("");
                setNumber("");
                setQuery("");
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    function handleNumber(val){
        if(val.length > 10){
            return;
        }
        setNumber(val);
    }

    return(
        <>
            <section className="contact" id='contact'>
                <div ref={containerRef} className="container">
                    {!isSubmitted ? 
                        <div className={"flex-content-wrapper"+ (switchComp?" hide":"")}>
                            <div className="contact-container-heading">
                                <h3 style={{fontFamily: 'sigmundpro-semibold'}}>Let's take your practice to the next level</h3>
                                <p className="text-content">Reach out to discover how CarePay can revolutionize your healthcare services</p>
                            </div>
                            <div className="contact-container-form">
                                <label htmlFor="name">
                                    Your name
                                </label>
                                <input 
                                    id='name' 
                                    type='text' 
                                    placeholder='Enter your name here'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)} />

                                <label htmlFor="email">
                                    E-mail ID
                                </label>
                                <input 
                                    id='email' 
                                    type='email' 
                                    placeholder='E-mail ID'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)} />

                                <label htmlFor="number">
                                    Contact number
                                </label>
                                <input 
                                    id='number' 
                                    type='number' 
                                    placeholder='Contact number'
                                    value={number}
                                    onChange={(e)=>handleNumber(e.target.value)} />

                                <label htmlFor="query">
                                    Query
                                </label>
                                <input 
                                    id='query' 
                                    type='text' 
                                    placeholder='Your query'
                                    value={query}
                                    onChange={(e)=>setQuery(e.target.value)} />

                                <div className="submit-button-wrapper" onClick={()=>handleSubmit()}>
                                    <PrimaryButton content={"Request a callback"} variant='dark' />
                                </div>
                            </div>
                        </div>
                    :
                        <div className={"thankYouFormSubmission container" + (isSubmitted?" show":"")}>
                            <h2 style={{fontSize:"40px", lineHeight:"44px", fontFamily:"sigmundpro-semibold"}}>Thank you</h2>
                            <p className='text-content'>We will contact you soon on your given mobile number and mail ID</p>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export function Footer(){

    return(
        <>
            <section className="footer" id='footer'>
                <div className="container">
                    <div className="logo">
                        <img src={FooterLogo} alt="" />
                    </div>
                    <div className="footer-flex-wrapper">
                        <div className="partner-up">
                            <h4>Get CarePay <br/>for your practice!</h4>
                            <PrimaryButton content={"Partner up with us"} to={"javascript:void(0)"} variant='light' callback={handleContactScroll} />
                        </div>
                        <div className="quick-links">
                            <h5>Quick links</h5>
                            <Link to={"/about"}>About Us</Link>
                            <Link to={"/privacyPolicy"}>Privacy Policy</Link>
                            <Link to={"/patient"}>For Patients</Link>
                            <Link to={"/doctor"}>For Doctors</Link>
                        </div>
                        <div className="contact-us">
                            <h5>Contact us</h5>
                            <div className="contact">
                                <img src={CallIcon} alt="" />
                                <a href="tel:+918069489655">+91 806 948 9655</a>
                            </div>
                            <div className="contact">
                                <img src={EmailIcon} alt="" />
                                <a href="mailto:connect@carepay.money">connect@carepay.money</a>
                            </div>
                            <div className="contact address">
                                <img src={LocationIcon} alt="" />
                                <div className='addresses'>
                                    <p className='addressHeading'>Gurugram Address</p>
                                    <hr />
                                    <p className="addressLine">5th Floor, DLF Two Horizon Centre, <br />DLF Phase 5, Gurugram, <br/>Haryana, 122002</p>
                                    <p className='addressHeading'>Registered Address</p>
                                    <hr/>
                                    <p className="addressLine">BNP Paribas Bank, FLAT NO. 408,<br/> 27, New Delhi House, Barakhamba<br/> Road, Connaught Lane, Connaught<br/> Place, New Delhi, Delhi, 110001</p>
                                </div>
                            </div>
                            <div className="socials">
                                <Link to={"https://www.instagram.com/care_pay/"} target='_blank'><img src={InstaIcon} alt="" /></Link>
                                <Link to={"https://www.linkedin.com/company/carepayin/"} target='_blank'><img src={LinkedinIcon} alt="" /></Link>
                            </div>
                        </div>
                    </div>
                    <p className="text-content">The website is designed to primarily appeal to doctors and clinics, with a focus on their aspirations, growth, and operational efficiency. <br />The transformative impact section subtly addresses potential investors by showcasing the visionary and transformative nature of CarePay’s offerings.</p>
                    <div className="credits-for-graphics">Illustrations made by <a href='https://storyset.com/bro'>Bro</a> from <a href='https://storyset.com/'>storyset.com</a></div>
                    <div className="copyright">© 2023 by CareCoin Technologies Pvt Ltd</div>
                </div>
            </section>
        </>
    )
}