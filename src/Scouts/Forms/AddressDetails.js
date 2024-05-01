import React , { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import logo from '../../patient/assets/Logo-carepay.svg';
import headphone from './images/headphone.png';
import {AddressDetailsValidation} from './Validation';
export default function AddressDetails() {
    const [message, setMessage] = useState('');
    const [Data, setData] = useState({
        building: '',
        locality: '',
        pincode: '',
        city: '',
        state: '',
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        if (name === 'pincode' && value.length > 6) {
            return;
        }
        setData({
            ...Data,
            [name]: value
        });
    };

    const handlenext = () => {
           let validationMsg= AddressDetailsValidation(Data)
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
                        <h4>Address details</h4>

                        <div className="inputtags">
                            <div className="inputsgrps">
                                <label htmlFor="building" className='input-label'>Building</label>
                                <input autoComplete="off" type="text" name="building" value={Data.building} className='form-control input-tag' id='building' placeholder='Enter your Building Name' onChange={(e) => handlechange(e)} />
                                <div id="buildingHelp" className="form-text error-msg">{message.field === 'building' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="locality" className='input-label'>Locality</label>
                                <input autoComplete="off" type="text" name="locality" value={Data.locality} className='form-control input-tag' id='locality' placeholder='Enter Locality Name' onChange={(e) => handlechange(e)} />
                                <div id="localityHelp" className="form-text error-msg">{message.field === 'locality' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="pincode" className='input-label'>Pincode</label>
                                <input autoComplete="off" type="number" name="pincode" value={Data.pincode} className='form-control input-tag' id='pincode' placeholder='Enter Pincode' onChange={(e) => handlechange(e)} />
                                <div id="pincodeHelp" className="form-text error-msg">{message.field === 'pincode' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="city" className='input-label'>City</label>
                                <input autoComplete="off" type="text" name="city" value={Data.city} className='form-control input-tag' id='city' placeholder='Enter City Name' onChange={(e) => handlechange(e)} />
                                <div id="cityHelp" className="form-text error-msg">{message.field === 'city' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="state" className='input-label'>State </label>
                                <select name="state" value={Data.state} className='form-select input-tag' id='state' onChange={(e) => handlechange(e)} >
                                    <option value=''>Select from Below</option>
                                    <option value='option1'>option1</option>
                                </select>
                                <div id="stateHelp" className="form-text error-msg">{message.field === 'state' ? message.msg : ""}</div>
                            </div>

                            <button className='btn' onClick={() => handlenext()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
