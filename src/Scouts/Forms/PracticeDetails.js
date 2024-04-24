import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import logo from '../../patient/assets/Logo-carepay.svg';
import headphone from './images/headphone.png';
import {PracticeDetailsValidation} from './Validation';
export default function PracticeDetails() {
    const [message, setMessage] = useState('');
    const [Data, setData] = useState({
        licensenumber: '',
        specialty: '',
        clinicname: '',
        DateOfEstablishment: '',
        nameOfBusinessEntity: '',
        typeOfEntity: '',
        CINnumber: '',
        GSTINnumber: '',
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        setData({
            ...Data,
            [name]: value
        });
    };

    const handlenext = () => {
        let validationMsg = PracticeDetailsValidation(Data)
        if (message?.status) {
            setMessage(validationMsg)
        } else {
            setMessage(validationMsg)
        }

    }
    return (
        <>
            <div className="Scout-Details-form screen-width-max">
                <div className="header">
                    <span><FaArrowLeft /></span>
                    <img src={logo} alt="logo" width={'19%'} />
                </div>

                <div className="Merchantform">
                    <div className="heading">
                        <h3>Sign Up</h3>
                        <div className="square">
                            <img src={headphone} width={'50%'} alt="" />
                        </div>
                    </div>

                    <div className="detailsform">
                        <h4>Practice details</h4>

                        <div className="inputtags">
                            <div className="inputsgrps">
                                <label htmlFor="licensenumber" className='input-label'>License number</label>
                                <input type="number" name="licensenumber" value={Data.licensenumber} className='form-control input-tag' id='licensenumber' placeholder='Enter License Number' onChange={(e) => handlechange(e)} />
                                <div id="licensenumberHelp" className="form-text error-msg">{message.field === 'licensenumber' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="Specialty" className='input-label'>Specialty </label>
                                <select name="specialty" value={Data.specialty} className='form-select input-tag' id='Specialty' onChange={(e) => handlechange(e)} >
                                    <option value=''>Select from Below</option>
                                    <option value='option1'>option1</option>
                                </select>
                                <div id="SpecialtyHelp" className="form-text error-msg">{message.field === 'Specialty' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="clinicname" className='input-label'>Clinic Name</label>
                                <input type="text" name="clinicname" value={Data.clinicname} className='form-control input-tag' id='clinicname' placeholder='Enter Clinic Name' onChange={(e) => handlechange(e)} />
                                <div id="clinicnameHelp" className="form-text error-msg">{message.field === 'clinicname' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="DateOfEstablishment" className='input-label'>Date of establishment of clinic/hospital</label>
                                <input type="date" name="DateOfEstablishment" value={Data.DateOfEstablishment} className='form-control input-tag' id='DateOfEstablishment' placeholder='Select Date' onChange={(e) => handlechange(e)} />
                                <div id="DateOfEstablishmentHelp" className="form-text error-msg">{message.field === 'DateOfEstablishment' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="nameOfBusinessEntity" className='input-label'>Full name of business entity</label>
                                <input type="text" name="nameOfBusinessEntity" value={Data.nameOfBusinessEntity} className='form-control input-tag' id='nameOfBusinessEntity' placeholder='Enter full Name of Business Entity' onChange={(e) => handlechange(e)} />
                                <div id="nameOfBusinessEntityHelp" className="form-text error-msg">{message.field === 'nameOfBusinessEntity' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="typeOfEntity" className='input-label'>Type of entity</label>
                                <select name="typeOfEntity" value={Data.typeOfEntity} className='form-select input-tag' id='typeOfEntity' onChange={(e) => handlechange(e)} >
                                    <option value=''>Select from Below</option>
                                    <option value='option2'>option2</option>
                                </select>
                                <div id="typeOfEntityHelp" className="form-text error-msg">{message.field === 'typeOfEntity' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="CINnumber" className='input-label'>CIN/LLPIN</label>
                                <input type="text" name="CINnumber" value={Data.CINnumber} className='form-control input-tag' id='CINnumber' placeholder='Enter CIN/LLPIN' onChange={(e) => handlechange(e)} />
                                <div id="CINnumberHelp" className="form-text error-msg">{message.field === 'CINnumber' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="GSTINnumber" className='input-label'>GSTIN</label>
                                <input type="text" name="GSTINnumber" value={Data.GSTINnumber} className='form-control input-tag' id='GSTINnumber' placeholder='Enter GSTIN' onChange={(e) => handlechange(e)} />
                                <div id="GSTINnumberHelp" className="form-text error-msg">{message.field === 'GSTINnumber' ? message.msg : ""}</div>
                            </div>

                            <button className='btn' onClick={() => handlenext()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
