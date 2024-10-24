import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { getAllClinicName, getInactiveCountApi, getInactivedetailApi, getLeadsCountBYparentScoutId, getLiveClinicsApi, getScoutsByParenScoutId, getqrInstalledApiCount, getqrInstalledApidetail, productNotMappedCountApi, productNotMappeddetailApi, searchDetailsApi } from '../actioncreator';
import { IoMdClose } from 'react-icons/io';
import DoctorLogo from '../Forms/images/Vector (3).svg'
import MSG from '../Forms/images/msg.svg'
import Call from '../Forms/images/call.svg'
import { ArrowBack } from '@mui/icons-material';
const OnboardingLeads = () => {
    const [tabType, settabType] = useState('txn')
    const [filter, setfilter] = useState('');
    const [allClinics, setAllClinic] = useState([]);
    const [clinicValue, setClinicValue] = useState('');
    const [filterType, setfilterType] = useState('month');
    const [clinic, setClinic] = useState('');
    const [typeData, setTypeData] = useState('count');
    const [objectData, setobjectData] = useState({});
    const [qrDataCount, setQrCountData] = useState('');
    const [productNotMappedCount, setProductNotMappedApi] = useState('');
    const [inactiveCount, setINactiveData] = useState('');
    const [qrDatadetail, setQrdetailData] = useState('');
    const [productNotMappeddetail, setProductDetails] = useState('');
    const [inactivedetail, setInactiveDetails] = useState('');
    const [detailsData, setDetailsData] = useState('');
    const [viewType, setViewType] = useState('count');
    const [serachData, setSearchData] = useState('');
    const [dataType, setDataType] = useState('');

    const handlefilters = (type) => {
        setfilter((prevFilter) => (prevFilter === type ? '' : type));
    }
    useEffect(() => {
        getLiveClinicsApi(window.sessionStorage.getItem('scoutId'), callBack => {
            console.log(callBack)
            setobjectData(callBack.data)
        })
        getqrInstalledApiCount(window.sessionStorage.getItem('scoutId'), callBack => {
            console.log(callBack)
            setQrCountData(callBack.data)
        })

        productNotMappedCountApi(window.sessionStorage.getItem('scoutId'), callBack => {
            console.log(callBack)
            setProductNotMappedApi(callBack.data)
        })
        getInactiveCountApi(window.sessionStorage.getItem('scoutId'), callBack => {
            console.log(callBack)
            setINactiveData(callBack.data)
        })
    }, [])
    const clinicHandler = (e) => {

        setClinic(encodeURIComponent(e.target.value))
        setClinicValue(e.target.value)
        if (e.target.value === '') {
            applyFilter('')
        }

    }
    const applyFilter = (data) => {
        getLiveClinicsApi(window.sessionStorage.getItem('scoutId'), callBack => {

            setobjectData(callBack.data)
        })
        getqrInstalledApiCount(window.sessionStorage.getItem('scoutId'), callBack => {

            setDetailsData(callBack.data)
        })

        productNotMappedCountApi(window.sessionStorage.getItem('scoutId'), callBack => {

            setDetailsData(callBack.data)
        })
        getInactiveCountApi(window.sessionStorage.getItem('scoutId'), callBack => {

            setDetailsData(callBack.data)
        })

    }
    const getData = (data) => {
        setDataType(data)
        if (data === 'qr') {
            getqrInstalledApidetail(window.sessionStorage.getItem('scoutId'), callBack => {
                console.log(callBack)
                setDetailsData(callBack.data)
                setViewType('details')
            })
        }
        if (data === 'product') {
            productNotMappeddetailApi(window.sessionStorage.getItem('scoutId'), callBack => {
                console.log(callBack)
                setDetailsData(callBack.data)
                setViewType('details')

            })
        }
        if (data === 'inactive') {
            getInactivedetailApi(window.sessionStorage.getItem('scoutId'), callBack => {
                console.log(callBack)
                setDetailsData(callBack.data)
                setViewType('details')

            })
        }

    }
    const searchHandler=(e)=>{
        setSearchData(e.target.value)
        searchDetailsApi(e.target.value,window.sessionStorage.getItem('scoutId'),callBack=>{
            console.log(callBack.data)
            setDetailsData(callBack.data)
        })
        if(e.target.value===''){
            getData(dataType)
        }


    }
    return (
        <>
            <div className=" over-view-component px-2 " style={{ zIndex: 1, position: 'sticky', top: '51px', width: '100%', background: '#fff', borderBottom: '5px solid #f2f2f2', paddingBottom: '10px' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '100%', fontSize: '20px', marginTop: '20px', marginLeft: '18px', display: 'flex' }}>{viewType === 'details' ? <ArrowBack style={{ cursor: 'pointer' }} onClick={() => setViewType('count')} /> : ""}&nbsp; &nbsp;Live clinics</div>
                    {/* <div style={{ width: '60%', fontSize: '20px', marginTop: '5px', marginLeft: '18px' }}> */}

                        {/* <div className="dashboard">
                            <div className="filters" style={{ float: 'right' }}>

                                <div style={{ background: '#ECEBFF' }} className={`box ${filter === 'Date' ? 'active' : ''}`} onClick={() => handlefilters('Date')}>
                                    <h5>Scouts (All)</h5> &nbsp;
                                    <span style={{ marginTop: '-4px' }}><FaAngleDown /></span>
                                </div>

                            </div>
                        </div> */}
                    {/* </div>/ */}



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
                    <div className='scout-loan-div-blue'>

                        <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '50%' }}>
                                Active clinics

                                <h3>{objectData.activeMerchant}</h3>
                            </div>
                            <div style={{ width: '50%', textAlign: 'right', marginTop: '10px' }}>
                                <h5>{objectData.activeMerchant}/{objectData.totalMerchant} Active</h5 >
                            </div>

                        </div>

                    </div>



                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div className='scout-loan-div-blue' onClick={(e) => getData('qr')} style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', }}>
                            <h4 style={{ fontWeight: '100' }}>QR not installed</h4>
                            <br />
                            <h3 style={{ fontWeight: '100' }}>{qrDataCount}</h3>
                        </div>
                        <div className='scout-loan-div-blue' onClick={(e) => getData('inactive')} style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}>
                            <h4 style={{ fontWeight: '100' }}>Inactive clinics</h4>
                            <br />
                            <h3 style={{ fontWeight: '100' }}>{inactiveCount}</h3>
                        </div>

                    </div>
                    <div onClick={(e) => getData('productNotMap')} style={{ width: '100%', display: 'flex', cursor: 'pointer' }}>
                        <div className='scout-loan-div-blue' style={{ width: '48%' }}>
                            <h4 style={{ fontWeight: '100' }}>Products not mapped</h4>
                            <br />
                            <h3 style={{ fontWeight: '100' }}>{productNotMappedCount}</h3>
                        </div>


                    </div>
                </div>
                : ""}
            {viewType === 'details' ?
                <>
                    <div style={{ padding: '10px 23px' }}>

                        <input
                        onChange={(e)=>searchHandler(e)}
                            className="scout-search"
                            style={{ width: '100%', marginTop: '5px' }}
                            placeholder="Search clinic by name" />
                    </div>
                    {detailsData && detailsData.length > 0 ? (
                        detailsData.map((carddata, i) => (
                            <div className="txn-card" key={i}>
                                {console.log(carddata)}
                                <div className="" style={{ fontSize: '14px', display: 'flex' }}>
                                    <img src={DoctorLogo} />&nbsp;&nbsp;{carddata.clinicName}
                                </div>
                                <div className="" style={{ fontSize: '14px', display: 'flex', width: '100%', marginTop: "20px" }}>
                                    <div className='' style={{ width: '50%', marginTop: '14px' }}>
                                        Dr. {carddata.doctorName}
                                    </div>
                                    <div className='' style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
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
                                        Lead count this month: {carddata.leadCount}
                                    </div>
                                    <div className='' style={{ width: '50%' }}>
                                        {carddata.comment}
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
