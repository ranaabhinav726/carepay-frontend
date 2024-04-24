import React , { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import logo from '../../patient/assets/Logo-carepay.svg';
import headphone from './images/headphone.png';
import {PersonalDetailsValidation} from './Validation';
export default function PersonalDetails() {
    const [message, setMessage] = useState('');
    const [Data, setData] = useState({
        phonenumber: '',
        fullname: '',
        pan: '',
        emailid: '',
        dob: '',
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        if (name === 'phonenumber' && value.length > 10) {
            return;
        }
        setData({
            ...Data,
            [name]: value
        });
    };

    const handlenext = () => {
           let validationMsg= PersonalDetailsValidation(Data)
           if(message?.status){
               setMessage(validationMsg)
        }else{
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
                        <h4>Personal details</h4>

                        <div className="inputtags">
                            <div className="inputsgrps">
                                <label htmlFor="phonenumber" className='input-label'>Phone Number</label>
                                <input type="number" name="phonenumber" value={Data.phonenumber} className='form-control input-tag' id='phonenumber' placeholder='Enter Phone Number' onChange={(e) => handlechange(e)} />
                                <div id="phoneNumberHelp" className="form-text error-msg">{message.field === 'phoneNumber' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="fullname" className='input-label'>Full Name</label>
                                <input type="text" name="fullname" value={Data.fullname} className='form-control input-tag' id='fullname' placeholder='Enter Full Name' onChange={(e) => handlechange(e)} />
                                <div id="fullnameHelp" className="form-text error-msg">{message.field === 'fullname' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="pan" className='input-label'>PAN</label>
                                <input type="text" name="pan" value={Data.pan} className='form-control input-tag' id='pan' placeholder='Enter PAN Number' onChange={(e) => handlechange(e)} />
                                <div id="panHelp" className="form-text error-msg">{message.field === 'pan' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="emailid" className='input-label'>E-mail id</label>
                                <input type="email" name="emailid" value={Data.emailid} className='form-control input-tag' id='emailid' placeholder='Enter E-mail id' onChange={(e) => handlechange(e)} />
                                <div id="emailHelp" className="form-text error-msg">{message.field === 'email' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="dateofbirth" className='input-label'>Date of birth</label>
                                <input type="date" name="dob" value={Data.dob} className='form-control input-tag' id='dateofbirth' placeholder='Select Date' onChange={(e) => handlechange(e)} />
                                <div id="dateofbirthHelp" className="form-text error-msg">{message.field === 'dateofbirth' ? message.msg : ""}</div>
                            </div>

                            <button className='btn' onClick={() => handlenext()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
