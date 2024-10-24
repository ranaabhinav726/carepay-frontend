import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { getAllClinicName, getLeadsByStatusForScoutsdApi, getLeadsCountBYparentScoutId, getLeadsCountByScoutIdApi, getScoutsByParenScoutId, getactivePercentageApi, searchDetailsApi } from '../actioncreator';
import { IoMdClose } from 'react-icons/io';
import DoctorLogo from '../Forms/images/Vector (3).svg'
import MSG from '../Forms/images/msg.svg'
import Call from '../Forms/images/call.svg'
import { ArrowBack } from '@mui/icons-material';
import routes from '../../layout/Routes';
import { useNavigate } from 'react-router-dom';

const OnboardingLeads = () => {
    const [tabType, settabType] = useState('txn')
    const [filter, setfilter] = useState('');
    const [allClinics, setAllClinic] = useState([]);
    const [clinicValue, setClinicValue] = useState('');
    const [filterType, setfilterType] = useState('month');
    const [clinic, setClinic] = useState('');
    const [typeData, setTypeData] = useState('count');
    const [statusData, setCountData] = useState('');
    const [viewType, setViewType] = useState('count');
    const [leadData, setleadData] = useState([]);
    const [dataType, setDataType] = useState('');
    const [serachData, setSearchData] = useState('');
    const [percentageData, setPercentageData] = useState('');

    let navigate = useNavigate()

    const handlefilters = (type) => {
        setfilter((prevFilter) => (prevFilter === type ? '' : type));
    }
    useEffect(() => {


    }, [])
    useEffect(() => {
        if (window.sessionStorage.getItem('scoutMobile') === 'null' || window.sessionStorage.getItem('scoutMobile') === null) {
            navigate(routes.SCOUTS_MAIN)

        } else {
            if (window.sessionStorage.getItem('role') === 'SCOUT') {
                getLeadsCountByScoutIdApi(window.sessionStorage.getItem('scoutId'), 'count', callBack => {
                    console.log(callBack)
                    setCountData(callBack.data)
                })
                getactivePercentageApi(window.sessionStorage.getItem('scoutId'), callBack => {
                    console.log(callBack)
                    setPercentageData(callBack.data)
                })
            }

        }
    }, [])
    const clinicHandler = (e) => {

        setClinic(encodeURIComponent(e.target.value))
        setClinicValue(e.target.value)
        if (e.target.value === '') {
            applyFilter('')
        }

    }
    const applyFilter = (data) => {


    }
    const getStatusWiseData = (type) => {
        setDataType(type)
        getLeadsByStatusForScoutsdApi(window.sessionStorage.getItem('scoutId'), 'detail', type, callBack => {
            console.log(callBack)
            if (callBack.data.length > 0) {
                setleadData(callBack.data)
                setViewType('details')
            }

        })
    }
    const searchHandler = (e) => {
        setSearchData(e.target.value)
        searchDetailsApi(e.target.value, window.sessionStorage.getItem('scoutId'), callBack => {
            console.log(callBack.data)
            setleadData(callBack.data)
        })
        if (e.target.value === '') {
            getStatusWiseData(dataType)
        }


    }
    return (
        <>
            <div className=" over-view-component px-2 " style={{ zIndex: 1, position: 'sticky', top: '51px', width: '100%', background: '#fff', borderBottom: '5px solid #f2f2f2', paddingBottom: '10px' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '100%', fontSize: '20px', marginTop: '20px', marginLeft: '18px', display: 'flex' }}>{viewType === 'details' ? <div> <ArrowBack style={{}} onClick={() => setViewType('count')} /> </div> : ""}&nbsp;&nbsp; Clinics leads</div>
                    {/* <div style={{ width: '60%', fontSize: '20px', marginTop: '5px', marginLeft: '18px' }}>


                    </div> */}



                </div>

                {filter === 'clinics' ?
                    <div className="over-view-component background-blur">
                        <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'clinics' ? 'show' : ''}`}>
                            <div className="filterscout">
                                <div className="filterbox">
                                    <h5>Clinics</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                                </div>
                                <div className="checkboxes detailsform">

                                    <select value={clinicValue} onChange={(e) => clinicHandler(e)} style={{ background: 'rgb(236, 235, 255)', width: '100%', padding: '10px', borderRadius: '5px', border: 'none' }}>

                                        <option value={''}>Select All</option>
                                        {allClinics !== '' && allClinics !== undefined && allClinics.length > 0 ? allClinics.map((data, i) => {
                                            return (
                                                <option value={data}>{data}</option>
                                            )
                                        }) : ""}
                                    </select>

                                </div>
                                <div className="row filter-btn">
                                    <button className='apply-filter' onClick={() => applyFilter()}>Apply Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}



            </div >
            {viewType === 'count' ?
                <div className="" style={{ padding: '10px' }}>


                    <div className='scout-loan-div-blue' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f0f4ff' }}>
                        <h4 style={{ fontWeight: '100', marginBottom: '20px' }}>
                            <b>Average lead approval rate</b>
                        </h4>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div>CarePay’s</div>
                            <div><b>{percentageData.averageLeadApproveCarePay}%</b></div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div>Yours</div>
                            <div><b>{percentageData.averageLeadApprove}%</b></div>
                        </div>


                        <div style={{ width: '100%', backgroundColor: '#ddd', height: '10px', borderRadius: '5px', marginTop: '20px', position: 'relative', display: 'flex' }}>
                            <div style={{ width: percentageData.averageLeadApproveCarePay ? percentageData.averageLeadApproveCarePay + '%' : '0px', height: '100%', backgroundColor: '#1C8769', borderRadius: '5px 0 0 5px' }}></div>
                            <div style={{ width: percentageData.averageLeadApprove ? percentageData.averageLeadApprove + '%' : '0px', height: '100%', backgroundColor: '#38C09A', borderRadius: '0 5px 5px 0', position: 'absolute', left: percentageData.averageLeadApproveCarePay ? percentageData.averageLeadApproveCarePay + '%' : '10%' }}></div>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                        <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }} onClick={() => getStatusWiseData('NEW_LEAD')}>
                            <h4 style={{ fontWeight: '100' }}>New leads</h4>
                            <br />
                            <h3 style={{ fontWeight: '100', fontWeight: '700' }}>{statusData !== '' && statusData.NEW_LEAD ? statusData.NEW_LEAD : ""}</h3>
                        </div>

                        <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }} onClick={() => getStatusWiseData('IN_PROCESS')}>
                            <h4 style={{ fontWeight: '100' }}>Under review</h4>
                            <br />
                            <h3 style={{ fontWeight: '100', fontWeight: '700' }}>{statusData !== '' && statusData.IN_PROCESS ? statusData.IN_PROCESS : ""}</h3>
                        </div>

                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }} onClick={() => getStatusWiseData('HOLD')}>
                            <h4 style={{ fontWeight: '100' }}>On Hold</h4>
                            <br />
                            <h3 style={{ fontWeight: '100', fontWeight: '700' }}>{statusData !== '' && statusData.HOLD ? statusData.HOLD : ""}</h3>
                        </div>
                        <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }} onClick={() => getStatusWiseData('REJECT')}>
                            <h4 style={{ fontWeight: '100' }}>Rejected</h4>
                            <br />
                            <h3 style={{ fontWeight: '100', fontWeight: '700' }}>{statusData !== '' && statusData.REJECT ? statusData.REJECT : ""}</h3>
                        </div>

                    </div>
                </div>
                : ""}
            {viewType === 'details' ?
                <>
                    <div style={{ padding: '10px 23px' }}>
                        <input
                            onChange={(e) => searchHandler(e)}
                            className="scout-search"
                            style={{ width: '100%', marginTop: '5px' }}
                            placeholder="Search clinic by name" />
                    </div>
                    {leadData && leadData.length > 0 ? (
                        leadData.map((carddata, i) => (
                            <div className="txn-card" key={i}>
                                <div className="" style={{ fontSize: '14px', display: 'flex' }}>
                                    <img src={DoctorLogo} />&nbsp;&nbsp;{carddata.clinicName}
                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex', width: '100%', marginTop: "20px" }}>
                                    <div className='' style={{ width: '50%' }}>
                                        Monthly potential
                                    </div>
                                    <div className='' style={{ width: '50%' }}>
                                        {carddata.monthlyPotential}
                                    </div>

                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex', width: '100%', marginTop: "20px" }}>
                                    <div className='' style={{ width: '50%' }}>
                                        Comment - BD
                                    </div>
                                    <div className='' style={{ width: '50%' }}>
                                        {carddata.comment}
                                    </div>

                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex', width: '100%', marginTop: "20px" }}>
                                    <div className='' style={{ width: '50%' }}>
                                        Monthly potential
                                    </div>
                                    <div className='' style={{ width: '50%' }}>
                                        {carddata.monthlyPotential}
                                    </div>

                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex', width: '100%', marginTop: "20px" }}>
                                    <div className='' style={{ width: '50%' }}>
                                        {carddata.doctorName}

                                    </div>
                                    <div className='' style={{ width: '50%', display: 'flex' }}>
                                        <a href={`tel:${carddata.phoneNumber}`}>
                                            <img src={Call} alt="Call" />
                                        </a>
                                        &nbsp;&nbsp;
                                        <a href={`https://wa.me/${carddata.phoneNumber}`}>
                                            <img src={MSG} alt="Message" />
                                        </a>
                                    </div>

                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex', width: '100%', marginTop: "20px" }}>
                                    <div className='' style={{ width: '50%' }}>
                                        Scout :  {carddata.scoutName}
                                    </div>


                                </div>
                            </div>
                        ))
                    ) : (
                        ''
                    )}
                </>

                : ""}
        </>
    )
}
export default OnboardingLeads
