import React, { useEffect, useState } from "react";
import Amount from './imagesscouts/rupee.svg'
import Person from './imagesscouts/person.svg'
import Treatment from './imagesscouts/treatment.svg'
import Doctor from './imagesscouts/doctor.svg'
import { Call, CopyAll, CurrencyRupeeSharp, DescriptionRounded, Download, Share, WarningAmberRounded, WhatsApp } from "@mui/icons-material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";
import routes from "../layout/Routes";
import { getDoctorDataById, getLoanDataByUserId, getParentDoctorDataById, getParentSCoutDataById, getScoutDataById, getAllClinicName } from "./actioncreator";
import OverviewUi from './overview'
import { FaAngleDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Alertimage from './imagesscouts/Vector (31).png'
import GREY1 from './imagesscouts/greyrupee.svg'
import GREY2 from './imagesscouts/grey1.svg'
import GREY3 from './imagesscouts/grey2.svg'
import GREY4 from './imagesscouts/grey3.svg'
import Dots from './imagesscouts/threedots.png'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
const MainScout = () => {

    const [tabType, settabType] = useState('txn')
    const [objectData, setOjectData] = useState([])
    const [filter, setfilter] = useState('');
    const [sharelink, setShareLink] = useState(false);
    const [userData, setUserData] = useState('');
    const [loanData, setLoanData] = useState('');
    const [loanDatastate, setLoanState] = useState(false);
    const [allClinics, setAllClinic] = useState('');
    const [clinic, setClinic] = useState('');
    const [clinicValue, setClinicValue] = useState('');

    const handlefilters = (type) => {
        setfilter((prevFilter) => (prevFilter === type ? '' : type));
    }
    let navigate = useNavigate()
    useEffect(() => {
        if (window.sessionStorage.getItem('scoutMobile') === 'null' || window.sessionStorage.getItem('scoutMobile') === null) {
            navigate(routes.SCOUTS_MAIN)

        } else {
            if (window.sessionStorage.getItem('role') === 'SCOUT') {
                getScoutDataById(window.sessionStorage.getItem('scoutId'),clinic, callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
                getAllClinicName('', window.sessionStorage.getItem('scoutId'), '', callback => {
                    setAllClinic(callback.data)
                })
            }
            if (window.sessionStorage.getItem('role') === 'DOCTOR') {
                getDoctorDataById(window.sessionStorage.getItem('doctorId'),clinic, callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })

            }
            if (window.sessionStorage.getItem('role') === 'PARENT_DOCTOR') {
                getParentDoctorDataById(window.sessionStorage.getItem('parentDoctorId'),clinic, callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
                getAllClinicName('', '', window.sessionStorage.getItem('parentDoctorId'), callback => {
                    setAllClinic(callback.data)
                })
            }
            if (window.sessionStorage.getItem('role') === 'PARENT_SCOUT') {
                getParentSCoutDataById(window.sessionStorage.getItem('parentScoutId'),clinic, callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
                getAllClinicName(window.sessionStorage.getItem('parentScoutId'), '', '', callback => {
                    setAllClinic(callback.data)
                })
            }
        }
    }, [])

    const copyText = (data) => {
        const textToCopy = data
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard');
                alert('Text copied to clipboard')
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

    const generateWhatsAppLink = (mobileNumber, messageText) => {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${mobileNumber}&text=${encodeURIComponent(messageText)}`;
        window.open(whatsappUrl, '_blank');
    }
    const shareLinkTab = (data) => {
        setUserData(data)
        setShareLink(true)
    }
    const sendlink = (type, data) => {
        if (type === 'call') {
            const phoneNumber = data;
            window.open(`tel:${phoneNumber}`);
        }
        if (type === 'link') {
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${userData.patientPhoneNo}&text=${encodeURIComponent(data)}`;
            window.open(whatsappUrl, '_blank');
        }
    }
    const getLoanData = (userId) => {
        getLoanDataByUserId(userId, callback => {
            console.log(callback)

            if (callback !== 'notfound') {
                setLoanData(callback.data)
                setShareLink(false)
                setLoanState(true)
            } else {
                alert('No Data Found !')
            }

        })
    }
    const clinicHandler = (e) => {
        
        setClinic(encodeURIComponent(e.target.value))
        setClinicValue(e.target.value)
        if(e.target.value===''){
            applyFilter('')
        }
        
    }
    const applyFilter=(data)=>{
        if (window.sessionStorage.getItem('role') === 'SCOUT') {
            getScoutDataById(window.sessionStorage.getItem('scoutId'),data!==undefined?data:clinic, callback => {
                console.log(callback)
                if (callback.message === 'success') {
                    setOjectData(callback.data)
                }
            })
         
        }
        if (window.sessionStorage.getItem('role') === 'DOCTOR') {
            getDoctorDataById(window.sessionStorage.getItem('doctorId'),data!==undefined?data:clinic, callback => {
                console.log(callback)
                if (callback.message === 'success') {
                    setOjectData(callback.data)
                }
            })

        }
        if (window.sessionStorage.getItem('role') === 'PARENT_DOCTOR') {
            getParentDoctorDataById(window.sessionStorage.getItem('parentDoctorId'),data!==undefined?data:clinic, callback => {
                console.log(callback)
                if (callback.message === 'success') {
                    setOjectData(callback.data)
                }
            })
          
        }
        if (window.sessionStorage.getItem('role') === 'PARENT_SCOUT') {
            getParentSCoutDataById(window.sessionStorage.getItem('parentScoutId'),data!==undefined?data:clinic, callback => {
                console.log(callback)
                if (callback.message === 'success') {
                    setOjectData(callback.data)
                }
            })
          
        }
    }
    return (
        <>
            <div className=" over-view-component px-2 " style={{ zIndex: 1, position: 'sticky', top: '51px', width: '100%', background: '#fff', borderBottom: '5px solid #f2f2f2', paddingBottom: '10px' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '40%', fontSize: '20px', marginTop: '5px', marginLeft: '18px' }}>All loans</div>
                    <div className="text-center" style={{ width: '60%', background: '#ECEBFF', borderRadius: '5px', padding: '5px', marginRight: '10px' }}>
                        <div style={{ width: '100%', display: 'flex' }}>
                            <div style={{ width: '50%' }}><button onClick={() => settabType('overview')} style={{ width: '100%', background: tabType === 'overview' ? '#fff' : 'transparent', outline: 'none', padding: '5px 4px', border: 'none', borderRadius: '5px', color: tabType === 'overview' ? '#8f8dbd' : '#000', fontSize: '12px' }} className="">Overview</button></div>
                            <div style={{ width: '50%' }}><button onClick={() => settabType('txn')} style={{ width: '100%', background: tabType === 'txn' ? '#fff' : 'transparent', outline: 'none', padding: '5px 4px', border: 'none', borderRadius: '5px', color: tabType === 'txn' ? '#8f8dbd' : '#000', fontSize: '12px' }} className="">Transactions</button></div>
                        </div>
                    </div>


                </div>
                {console.log(filter)}
                <div className="dashboard">
                    <div className="filters">
                        {/* <div className={`box ${filter === 'scouts' ? 'active' : ''}`} onClick={() => handlefilters('scouts')}>
                            <h5>Scouts (5)</h5> &nbsp;
                            <span><FaAngleDown /></span>
                        </div> */}
                        {/* <div className={`box ${filter === 'amount' ? 'active' : ''}`} onClick={() => handlefilters('amount')}>
                            <h5>Amount</h5> &nbsp;
                            <span><FaAngleDown /></span>
                        </div> */}
                        {allClinics.length > 0 ?
                            <div className={`box ${filter === 'clinics' ? 'active' : ''}`} onClick={() => handlefilters('clinics')}>
                                <h5>Clinics</h5> &nbsp;
                                <span><FaAngleDown /></span>
                            </div>
                            : ""}
                    </div>
                </div>

            </div>
            {tabType === 'txn' ?
                <div style={{ marginTop: '20px' }}>
                    {objectData.length > 0 && objectData && (objectData).map((carddata, i) => {
                        return (
                            <div className="txn-card">
                                <img className="three-dots" src={Dots} onClick={() => shareLinkTab(carddata)} />
                                <div className="" style={{ fontSize: '14px', display: 'flex' }}>
                                    <img src={carddata.type == 'Rejected' || carddata.type === 'Expired' || carddata.type === 'Aborted' ? GREY1 : Amount} style={{ marginTop: '5px', width: '25px' }} />&nbsp;<div style={{ marginTop: '8px' }}>{Number(carddata.loanAmount).toLocaleString("en-IN")}</div>
                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex' }}>
                                    <img src={carddata.type == 'Rejected' || carddata.type === 'Expired' || carddata.type === 'Aborted' ? GREY2 : Person} style={{ marginTop: '5px', width: '25px' }} />&nbsp;<div style={{ marginTop: '8px' }}>{carddata.patientName}</div>
                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex' }}>
                                    <img src={carddata.type == 'Rejected' || carddata.type === 'Expired' || carddata.type === 'Aborted' ? GREY3 : Treatment} style={{ marginTop: '5px', width: '25px' }} />&nbsp;<div style={{ marginTop: '8px' }}>{carddata.loanReason}</div>
                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex' }}>
                                    <img src={carddata.type == 'Rejected' || carddata.type === 'Expired' || carddata.type === 'Aborted' ? GREY4 : Doctor} style={{ marginTop: '5px', width: '25px' }} />&nbsp;<div style={{ marginTop: '8px' }}>{carddata.clinicName}</div>
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '10px' }}>Applied on&nbsp; {carddata.loanPushedDate ? carddata.loanPushedDate : carddata.loanApplyDate}</p>
                                <div>

                                    {carddata.type === 'Approved' ?
                                        <>
                                            <div style={{ marginTop: '10px', fontSize: '12px', marginBottom: '4px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#E0FFEB', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                Approved
                                            </div>
                                            {carddata.esignUrl ?
                                                <div className="text-center">
                                                    <a target="_blank"
                                                    >
                                                        <button onClick={() => generateWhatsAppLink(carddata.patientPhoneNo, carddata.esignUrl)} className="carepay-button-card">&nbsp;
                                                            <div className="share-btn" style={{fontSize:'14px'}}> <WhatsApp />&nbsp;&nbsp;&nbsp; Share link</div>
                                                        </button>
                                                    </a>
                                                </div>
                                                : ""}
                                            <div className="approved-div"><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Approved on {carddata.loanStatusDate}</div>
                                        </>
                                        : ""}
                                    {carddata.type === 'Application' ?
                                        <>

                                            <div style={{ marginTop: '10px', fontSize: '12px', marginBottom: '4px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#D6F5FF', color: '#217EB2', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                Application
                                            </div>
                                        </>
                                        : ""}
                                    {carddata.type === 'Under Review' ?
                                        <>

                                            <div className="d-flex w-100" style={{ width: '100%', display: 'flex' }}>
                                                <div style={{ width: '50%' }}>
                                                    <div style={{ marginTop: '10px', fontSize: '12px', marginBottom: '4px' }}>Status:</div>
                                                    <div className="text-center" style={{ width: '50%', background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                        Under Review
                                                    </div>
                                                </div>

                                                &nbsp;&nbsp;
                                                <div style={{ width: '50%', textAlign: 'center' }}>
                                                    <div style={{ marginTop: '10px', fontSize: '12px', marginLeft: '10px', marginBottom: '4px' }}>Expect decision by:</div>
                                                    <div className="text-center" style={{ float: 'right', background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                        {carddata.estimateTime}&nbsp;minutes
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="approved-div" style={{
                                                background: carddata.chanceOfApproval <= 20 ? '#EE6E6E' :
                                                    (carddata.chanceOfApproval > 20 && carddata.chanceOfApproval <= 50 ? '#E4900A' : '')
                                            }}>
                                                {carddata.chanceOfApproval == 0 || carddata.chanceOfApproval === null ? '10' : carddata.chanceOfApproval}% Chance of approval
                                            </div>
                                        </>
                                        : ""}
                                    {carddata.type === 'Document Required' ?
                                        <>
                                            {/* <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>

                                        <div className="text-center" style={{ background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '160px', borderRadius: '5px', fontSize: '12px' }}>
                                            Document Required
                                        </div> */}
                                            <div className="d-flex w-100 mt-3" style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                                                <div style={{ width: '50%' }}>
                                                    <div style={{ marginTop: '10px', fontSize: '12px', marginBottom: '4px' }}>Status:</div>
                                                    <div className="text-center" style={{ background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '160px', borderRadius: '5px', fontSize: '12px',fontWeight:'700' }}>
                                                        Documents Required
                                                    </div>
                                                </div>

                                                &nbsp;&nbsp;
                                                <div style={{ width: '50%', textAlign: 'center' }}>
                                                    <div style={{ marginTop: '10px', fontSize: '12px', marginLeft: '10px', marginBottom: '4px' }}>Expect decision by:</div>
                                                    <div className="text-center" style={{ float: 'right', background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                        {carddata.estimateTime}&nbsp;minutes
                                                    </div>
                                                </div>
                                            </div>
                                            {carddata.docsRequired !== '' && carddata.docsRequired !== null ?

                                                <div style={{ background: '#FFEEE4', borderRadius: '5px', borderLeft: '4px solid #E4900A', fontSize: '12px', padding: '8px', marginTop: '10px' }}>{carddata.docsRequired}</div>
                                                : ""}
                                            <div className="approved-div" style={{
                                                background: carddata.chanceOfApproval <= 20 ? '#EE6E6E' :
                                                    (carddata.chanceOfApproval > 20 && carddata.chanceOfApproval <= 50 ? '#E4900A' : '')
                                            }}>
                                                {carddata.chanceOfApproval}% Chances of approval
                                            </div>
                                        </>
                                        : ""}
                                    {carddata.type === 'eSign & eMandate' ?
                                        <>
                                            <div style={{ marginTop: '10px', fontSize: '12px', marginBottom: '4px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#E0FFEB', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                eSign & eMandate
                                            </div>
                                            <div className="approved-div"><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Approved</div>

                                        </>
                                        : ""}
                                    {carddata.type === 'Pending disbursal' ?
                                        <>
                                            <div style={{ marginTop: '10px', fontSize: '12px', marginBottom: '4px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#E0FFEB', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px', fontWeight: '700' }}>
                                                Pending disbursal
                                            </div>
                                            {/* <div className="text-center">
                                                <a target="_blank" href={carddata.onboardingUrl}>
                                                    <button className="carepay-button-card">
                                                        <div className="share-btn">  <Download />&nbsp;Download D.A.</div>
                                                    </button></a>
                                            </div> */}
                                            <div className="text-center">
                                                <a target="_blank" href={carddata.onboardingUrl}>
                                                    <button className="carepay-button-card">&nbsp;
                                                        <div className="share-btn"> <Download />&nbsp;Download D.A.</div>
                                                    </button>
                                                </a>
                                            </div>
                                            <div className="approved-div"><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Approved</div>

                                        </>
                                        : ""}
                                    {carddata.type === 'Disbursed' ?
                                        <>
                                            {carddata.utrNo ?
                                                <div className="w-100 d-flex" style={{ width: '100%', display: 'flex' }}>
                                                    <div style={{ color: '#00000066', fontSize: '12px' }} className="w-50">
                                                        UTR : {carddata.utrNo}
                                                    </div>

                                                    <div className="w-50" style={{ color: '#00000066', fontSize: '12px', textAlign: 'right' }}>
                                                        <CopyAll onClick={() => copyText(carddata.utrNo)} />&nbsp;Copy
                                                    </div>
                                                </div>
                                                : ""}
                                            <div className="approved-div" style={{ background: '#857FC2' }}><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Disbursed on {carddata.disberseDate}</div>
                                        </>
                                        : ""}
                                    {carddata.type == 'Rejected' || carddata.type == 'Rejected' ?
                                        <>
                                            <div className="approved-div" style={{ background: '#a0a0a0' }}><img src={Alertimage} style={{ width: '14px' }} />&nbsp;Rejected on {carddata.loanStatusDate}</div>
                                        </>
                                        : ""}
                                    {carddata.type == 'Expired' || carddata.type == 'Expired' ?
                                        <>
                                            <div className="approved-div" style={{ background: '#a0a0a0' }}><img src={Alertimage} style={{ width: '14px' }} />&nbsp;Expired on {carddata.loanStatusDate} </div>
                                        </>
                                        : ""}
                                    {carddata.type == 'Aborted' || carddata.type == 'Aborted' ?
                                        <>
                                            <div className="approved-div" style={{ background: '#a0a0a0' }}><img src={Alertimage} style={{ width: '14px' }} />&nbsp;Aborted on {carddata.loanStatusDate} </div>
                                        </>
                                        : ""}



                                </div>

                            </div>
                        )
                    })}


                </div>
                : ""}
            {tabType === 'overview' ?
                <OverviewUi clinic={clinic} handlefilters={handlefilters} filter={filter} setfilter={setfilter} />
                : ""}
            {
                filter === 'scouts' ?

                    <div className="over-view-component background-blur">
                        <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'scouts' ? 'show' : ''}`}>
                            <div className="filterscout">
                                <div className="filterbox">
                                    <h5>Scouts</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                                </div>
                                <div className="checkboxes">
                                    <div class="mb-3 form-check checkboxgrp">
                                        <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                                        <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                                    </div>
                                    <div class="mb-3 form-check checkboxgrp">
                                        <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                                        <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                                    </div>
                                </div>
                                <div className="row filter-btn">
                                    <button className='apply-filter'>Apply Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : filter === 'amount' ?
                        <div className="over-view-component background-blur">

                            <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'amount' ? 'show' : ''}`}>
                                <div className="filterscout">
                                    <div className="filterbox">
                                        <h5>Amount</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                                    </div>
                                    <div className="inputsamount">
                                        <div className="inputboxes">
                                            <label htmlFor="minamount" className='iconruppee'>₹</label>
                                            <input type="number" name="" className='amount' id='minamount' placeholder='Minimum amount' min='0' />
                                        </div>
                                        <h5>TO</h5>
                                        <div className="inputboxes">
                                            <label htmlFor="maxamount" className='iconruppee'>₹</label>
                                            <input type="number" name="" className='amount' id='maxamount' placeholder='Maximum amount' min='0' />
                                        </div>
                                    </div>
                                    <div className="row filter-btn">
                                        <button className='apply-filter'>Apply Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''}
            {filter === 'clinics' ?
                <div className="over-view-component background-blur">
                    <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'clinics' ? 'show' : ''}`}>
                        <div className="filterscout">
                            <div className="filterbox">
                                <h5>Clinics</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                            </div>
                            <div className="checkboxes detailsform">
                                {/* <div class="mb-3 form-check checkboxgrp">
                                    <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                                    <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                                </div> */}
                                <select value={clinicValue} onChange={(e) => clinicHandler(e)} style={{ background: 'rgb(236, 235, 255)', width: '100%', padding: '10px', borderRadius: '5px', border: 'none' }}>

                                    <option value={''}>Select All</option>
                                    {allClinics !== '' &&allClinics !== undefined&& allClinics.length > 0 ? allClinics.map((data, i) => {
                                        return (
                                            <option value={data}>{data}</option>
                                        )
                                    }) : ""}
                                </select>

                            </div>
                            <div className="row filter-btn">
                                <button className='apply-filter' onClick={()=>applyFilter()}>Apply Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                : ""}
            {sharelink ?
                <div className="over-view-component background-blur">

                    <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'amount' ? 'show' : ''}`}>
                        <div className="filterscout">
                            <div className="filterbox">
                                <h5>Loan Actions For &nbsp;<span style={{ textTransform: 'capitalize' }}>{userData.patientName}</span></h5>&nbsp;<span><IoMdClose onClick={() => setShareLink(false)} className="closeicon" /></span>
                            </div>
                            <hr />

                        </div>
                        <div style={{ marginBottom: '20px', marginTop: '20px' }} >
                            {userData.patientPhoneNo !== undefined && userData.patientPhoneNo !== '' ? <div onClick={() => sendlink('call', userData.patientPhoneNo)} style={{ textAlign: 'justify', display: 'flex', cursor: 'pointer',width:'100%' }}><div style={{width:'50%',display:'flex'}}><Call style={{ color: '#504c9a' }} /> &nbsp; &nbsp;<div style={{  }}>Call Patient</div></div><div style={{width:'50%',color:'rgb(183, 181, 181)',textAlign: 'end'}}>{userData.patientPhoneNo}</div></div> : ""}
                            {userData.userId !== undefined && userData.userId !== '' ? <div onClick={() => getLoanData(userData.userId)} style={{ textAlign: 'justify', display: 'flex', marginTop: '10px', cursor: 'pointer' }}><DescriptionRounded style={{ color: '#504c9a' }} /> &nbsp; &nbsp;<div style={{ marginTop: '0px' }}>View loan details</div></div> : ""}

                            {userData.type !== 'Disbursed'?<div onClick={() => sendlink('link', userData.type === 'Approved' ? userData.esignUrl : userData.onboardingUrl)} style={{ textAlign: 'justify', display: 'flex', marginTop: '10px', cursor: 'pointer' }}><Share style={{ color: '#504c9a' }} /> &nbsp; &nbsp;<div style={{ marginTop: '0px' }}>Share link</div></div>:""}
                            {userData.type !== 'Disbursed'?<div onClick={() => copyText(userData.type === 'Approved' ? userData.esignUrl : userData.onboardingUrl)} style={{ textAlign: 'justify', display: 'flex', marginTop: '10px', cursor: 'pointer' }}><CopyAll style={{ color: '#504c9a' }} /> &nbsp; &nbsp;<div style={{ marginTop: '0px' }}>Copy Link</div></div>:""}
                            {/* {userData.esignUrl !== '' && userData.type !== 'Approved'  &&userData.type !== 'Disbursed'? <div onClick={() => copyText(userData.esignUrl)} style={{ textAlign: 'justify', display: 'flex', marginTop: '10px', cursor: 'pointer' }}><CopyAll style={{ color: '#504c9a' }} /> &nbsp; &nbsp;<div style={{ marginTop: '0px' }}>E-Sign link</div></div> : ""} */}
                            <div onClick={() => sendlink('call', ' +918069489655')} style={{ textAlign: 'justify', display: 'flex', marginTop: '10px', cursor: 'pointer' }}><SupportAgentIcon style={{ color: '#504c9a' }} /> &nbsp; &nbsp;<div style={{ marginTop: '0px' }}>Support</div></div>
                        </div>
                    </div>
                </div>
                : ""}
            {loanDatastate && loanData !== '' ?
                <div className="over-view-component background-blur">

                    <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'amount' ? 'show' : ''}`}>
                        <div className="filterscout">
                            <div className="filterbox">
                                <h5>Loan Details For &nbsp;<span style={{ textTransform: 'capitalize' }}>{userData.patientName}</span></h5>&nbsp;<span><IoMdClose onClick={() => setLoanState(false)} className="closeicon" /></span>
                            </div>

                        </div>
                        <div style={{ marginBottom: '20px', marginTop: '20px' }} >
                            <div style={{ display: 'flex', borderBottom: '1px solid #00000033', paddingBottom: '10px' }}>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>Effective tenure</p>
                                    <div style={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', marginTop: '5px' }}>{Number(loanData.totalEMI) - Number(loanData.advanceEMI)} &nbsp;months</div>
                                </div>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>EMI amount</p>
                                    <div style={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', marginTop: '5px', display: 'flex' }}>₹&nbsp; <div style={{  }}>{loanData.emiAmount}</div></div>
                                </div>

                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>Processing fees</p>

                                </div>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC',fontWeight: '700', }}>{loanData.processingFees}</p>
                                </div>

                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>Interest rate</p>

                                </div>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>{loanData.interest}%</p>
                                </div>

                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>Advance payment</p>

                                </div>
                                <div style={{ width: '50%' }}>
                                    <div style={{ textAlign: 'left', fontSize: '12px', fontWeight: '700', display: 'flex' }}>₹&nbsp; <div style={{  }}>{loanData.advancePayment}</div></div>

                                </div>

                            </div>
                            {/* <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>Subvention</p>

                                </div>
                                <div style={{ width: '50%' }}><p style={{ textAlign: 'left', fontSize: '12px', color: '#000000CC' }}>{loanData.subventionRate}%</p>
                                </div>

                            </div> */}

                        </div>
                    </div>
                </div>
                : ""}

        </>
    )
}
export default MainScout