import React, { useState,useEffect } from 'react'
import logo from '../../patient/assets/Logo-carepay.svg';
import UnderReviewimg from './images/UnderReviewimg.png';
import arrow from './images/dropdown-arrow.png';
import messageicon from './images/messageicon.png';
import callicon from './images/callicon.png';
import feedbackicon from './images/feedbackicon.png';
const UnderReview = () => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [prevopenAccordion, setprevOpenAccordion] = useState(null);
    const faqdata = [
        {
            question: 'How much time does it take to get loan processed?',
            answer: 'It takes less than a minute to get the loan approved. On scanning the QR code and selecting the desired payment option, patients will have to enter their PAN and Aadhar Card no. for verification; post which the loan is approved, subject to credit eligibility and terms and conditions of loan agreement with the financial institution Partner.'
        },
        {
            question: 'How much time does it take to get loan processed?',
            answer: 'It takes less than a minute to get the loan approved. On scanning the QR code and selecting the desired payment option, patients will have to enter their PAN and Aadhar Card no. for verification; post which the loan is approved, subject to credit eligibility and terms and conditions of loan agreement with the financial institution Partner.'
        },
        {
            question: 'How much time does it take to get loan processed?',
            answer: 'It takes less than a minute to get the loan approved. On scanning the QR code and selecting the desired payment option, patients will have to enter their PAN and Aadhar Card no. for verification; post which the loan is approved, subject to credit eligibility and terms and conditions of loan agreement with the financial institution Partner.'
        },
    ];
    useEffect(() => {
        let element = '';
        if(prevopenAccordion !== null && prevopenAccordion !== openAccordion){
            element = document.getElementById(prevopenAccordion);
        }
        if (element) {
            element.classList.add('slideout-aniamtion');
            element.classList.remove('slidin-animation');
        }
        return () => {
            if (element) {
                element.classList.remove('slideout-aniamtion');
                element.classList.add('slidin-animation');
            }
        };
    }, []);
    const toggleAccordion = (id) => {
        setprevOpenAccordion(openAccordion)
        setOpenAccordion(openAccordion === id ? null : id);
    };
    return (
        <>
            <div className="Under-review-form screen-width-max">
                <div className="header">
                    <img src={logo} alt="logo" width={'20%'} />
                </div>

                <div className="under-review-text">
                    <img src={UnderReviewimg} width={'50%'} alt="" />

                    <h5>Your profile is under review</h5>
                    <h6>Verification takes around 30 mins...</h6>
                    <button className='btn'>Refresh Status</button>
                </div>

                <div className="faq-section">
                    <h5>FAQs</h5>
                    <div className="FAQs">
                        {faqdata.map((item, index) => (
                            <FAQ
                                key={index}
                                id={index}
                                isOpen={openAccordion === index}
                                item={item}
                                toggleAccordion={toggleAccordion}
                            />
                        ))}
                    </div>
                    <div className='allfaqlink'>
                        <a href="" className='allfaq'>See all FAQs</a>
                    </div>
                </div>
                <div className="contact-section">
                    <h5>Need help? Stuck somewhere? <br></br>We are here for you...</h5>
                    <h3>Here to help you!</h3>
                    <div className="sub-section">
                        <button className="box">
                            <img src={messageicon} width={'15%'} alt="" />
                            <h5>Chat with us</h5>
                        </button>
                        <button className="box">
                            <img src={callicon} width={'15%'} alt="" />
                            <h5>Call support</h5>
                        </button>
                    </div>
                </div>
                <div className="feedback-section">
                <h5>We will be more than happy to receive<br></br>our customers’ valuable advices!</h5>
                <h3>Have some advice?</h3>
                <div className="sub-section">
                        <button className="box">
                            <img src={feedbackicon} width={'10%'} alt="" />
                            <h5>Send feedback</h5>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UnderReview;

function FAQ({ id, isOpen, item, toggleAccordion }) {
    return (
        <>
            <div className="accords" >
                <div className="heading" onClick={() => toggleAccordion(id)}>
                    <h5>{item.question}</h5>
                    <div className={`imgs ${isOpen ? 'animation-rotate' : ''}`}><img src={arrow} width={'50%'} alt="" /></div>
                </div>

                {/* {isOpen && ( */}
                    <div className={`bottomtext ${isOpen ? 'slidin-animation' : ''}`} id={id}>
                        <h5>{item.answer}</h5>
                    </div>
                {/* )} */}
            </div>

        </>
    )
}
