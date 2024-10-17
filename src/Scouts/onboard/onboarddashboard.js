import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { getAllClinicName, getLeadsCountBYparentScoutId, getScoutsByParenScoutId } from '../actioncreator';
import { IoMdClose } from 'react-icons/io';

const OnboardingLeads = () => {
    const [tabType, settabType] = useState('txn')
    const [filter, setfilter] = useState('');
    const [allClinics, setAllClinic] = useState([]);
    const [clinicValue, setClinicValue] = useState('');
    const [filterType, setfilterType] = useState('month');
    const [clinic, setClinic] = useState('');
    const [typeData, setTypeData] = useState('count');

    const handlefilters = (type) => {
        setfilter((prevFilter) => (prevFilter === type ? '' : type));
    }
    useEffect(() => {
        getScoutsByParenScoutId(window.sessionStorage.getItem('parentDoctorId'),callBack=>{
            console.log(callBack)
        })
        getLeadsCountBYparentScoutId(window.sessionStorage.getItem('parentDoctorId'),typeData,callBack=>{
            console.log(callBack,'parentDoctorId')
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


    }
    return (
        <>
            <div className=" over-view-component px-2 " style={{ zIndex: 1, position: 'sticky', top: '51px', width: '100%', background: '#fff', borderBottom: '5px solid #f2f2f2', paddingBottom: '10px' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '40%', fontSize: '20px', marginTop: '20px', marginLeft: '18px' }}>Onboarding leads</div>
                    <div style={{ width: '60%', fontSize: '20px', marginTop: '5px', marginLeft: '18px' }}>

                        <div className="dashboard">
                            <div className="filters" style={{ float: 'right' }}>

                                <div style={{ background: '#ECEBFF' }} className={`box ${filter === 'Date' ? 'active' : ''}`} onClick={() => handlefilters('Date')}>
                                    <h5>Scouts (All)</h5> &nbsp;
                                    <span style={{ marginTop: '-4px' }}><FaAngleDown /></span>
                                </div>

                            </div>
                        </div>
                    </div>



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
            <div className="" style={{ padding: '10px' }}>
                <input
                    className="scout-search"
                    style={{ width: '100%', marginTop: '5px' }}
                    placeholder="Search clinic by name" />

                <div className='scout-loan-div-blue'>
                    <h4 style={{ fontWeight: '100' }}><b>Average lead approval rate</b></h4>

                    <div style={{ width: '100%', display: 'flex', marginTop: '30px' }}>
                        <div style={{ width: '50%' }}>
                            CarePay’s
                        </div>
                        <div style={{ width: '50%', textAlign: 'right' }}>
                            56%
                        </div>

                    </div>
                    <div style={{ width: '100%', display: 'flex', marginTop: '20px' }}>
                        <div style={{ width: '50%' }}>
                            Yours
                        </div>
                        <div style={{ width: '50%', textAlign: 'right' }}>
                            56%
                        </div>

                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h4 style={{ fontWeight: '100' }}>New leads</h4>
                        <br />
                        <h3 style={{ fontWeight: '100' }}>12</h3>
                    </div>
                    <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h4 style={{ fontWeight: '100' }}>Under review</h4>
                        <br />
                        <h3 style={{ fontWeight: '100' }}>12</h3>
                    </div>

                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h4 style={{ fontWeight: '100' }}>On Hold</h4>
                        <br />
                        <h3 style={{ fontWeight: '100' }}>12</h3>
                    </div>
                    <div className='scout-loan-div-blue' style={{ width: '48%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h4 style={{ fontWeight: '100' }}>Rejected</h4>
                        <br />
                        <h3 style={{ fontWeight: '100' }}>12</h3>
                    </div>

                </div>
            </div>
        </>
    )
}
export default OnboardingLeads
