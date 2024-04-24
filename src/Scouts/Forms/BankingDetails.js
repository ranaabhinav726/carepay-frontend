import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import logo from '../../patient/assets/Logo-carepay.svg';
import headphone from './images/headphone.png';
import {BankDetailsValidation} from './Validation';
export default function BankingDetails() {
    const [message, setMessage] = useState('');
    const [Data, setData] = useState({
        accountNumber: '',
        confirmaccountNumber: '',
        accountHolderName: '',
        IFSC: '',
        accountType: '',
        bankName: '',
        branchName: '',
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        setData({
            ...Data,
            [name]: value
        });
    };

    const handlenext = () => {
        let validationMsg = BankDetailsValidation(Data)
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
                        <h4>Banking details</h4>

                        <div className="inputtags">
                            <div className="inputsgrps">
                                <label htmlFor="accountNumber" className='input-label'>Account number</label>
                                <input type="number" name="accountNumber" value={Data.accountNumber} className='form-control input-tag' id='accountNumber' placeholder='Enter your Account Number' onChange={(e) => handlechange(e)} />
                                <div id="accountNumberHelp" className="form-text error-msg">{message.field === 'accountNumber' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="confirmaccountNumber" className='input-label'>Confirm Account number</label>
                                <input type="number" name="confirmaccountNumber" value={Data.confirmaccountNumber} className='form-control input-tag' id='confirmaccountNumber' placeholder='Confirm your Account Number' onChange={(e) => handlechange(e)} />
                                <div id="confirmaccountNumberHelp" className="form-text error-msg">{message.field === 'confirmaccountNumber' ? message.msg : ""}</div>
                            </div>
                            
                            <div className="inputsgrps">
                                <label htmlFor="accountHolderName" className='input-label'>Account Holder's Name</label>
                                <input type="text" name="accountHolderName" value={Data.accountHolderName} className='form-control input-tag' id='accountHolderName' placeholder="Enter Account Holder's Name" onChange={(e) => handlechange(e)} />
                                <div id="accountHolderNameHelp" className="form-text error-msg">{message.field === 'accountHolderName' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="IFSC" className='input-label'>IFSC</label>
                                <input type="text" name="IFSC" value={Data.IFSC} className='form-control input-tag' id='IFSC' placeholder='Enter IFSC Code' onChange={(e) => handlechange(e)} />
                                <div id="IFSCHelp" className="form-text error-msg">{message.field === 'IFSC' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="accountType" className='input-label'>Account Type</label>
                                <select name="accountType" value={Data.accountType} className='form-select input-tag' id='accountType' onChange={(e) => handlechange(e)} >
                                    <option value=''>Select from Below</option>
                                    <option value='option2'>option2</option>
                                </select>
                                <div id="accountTypeHelp" className="form-text error-msg">{message.field === 'accountType' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="bankName" className='input-label'>Bank Name</label>
                                <input type="text" name="bankName" value={Data.bankName} className='form-control input-tag' id='bankName' placeholder='Enter Bank Name' onChange={(e) => handlechange(e)} />
                                <div id="bankNameHelp" className="form-text error-msg">{message.field === 'bankName' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label htmlFor="branchName" className='input-label'>Branch Name</label>
                                <input type="text" name="branchName" value={Data.branchName} className='form-control input-tag' id='branchName' placeholder='Enter Branch Name' onChange={(e) => handlechange(e)} />
                                <div id="branchNameHelp" className="form-text error-msg">{message.field === 'branchName' ? message.msg : ""}</div>
                            </div>

                            <button className='btn' onClick={() => handlenext()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
