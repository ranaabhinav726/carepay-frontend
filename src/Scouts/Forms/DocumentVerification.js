import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import logo from '../../patient/assets/Logo-carepay.svg';
import headphone from './images/headphone.png';
import { DocumentDetailsValidation } from './Validation';
import { MdCloudUpload } from 'react-icons/md'
export default function DocumentVerification() {
    const [message, setMessage] = useState('');
    const [Data, setData] = useState({
        pan: '',
        medicalLicense: '',
        gstin: '',
        documentName: '',
        optionalDocument: '',
        termsCondition: false,
    });
    const handlechange = (e) => {
        const { name, value, checked } = e.target;
        setData({
            ...Data,
            [name]: name === 'documentName' ? value : name === 'termsCondition' ? checked : e.target.files[0]
        });
    };

    const handleSubmit = () => {
        let validationMsg = DocumentDetailsValidation(Data)
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
                        <h4>Document Verification</h4>

                        <div className="inputtags">
                            <div className="inputsgrps">
                                <label className='input-label'>PAN</label>
                                <input autoComplete="off" type="file" name="pan" className='form-control input-tag' id='pan' onChange={(e) => handlechange(e)} />
                                <label htmlFor="pan" className='form-control input-tag input-file-label'>
                                    {Data?.pan !== '' ? Data?.pan?.name : (<>                                    <span><MdCloudUpload /></span> Upload file from device
                                </>)}
                                </label>
                                <div id="panHelp" className="form-text error-msg">{message.field === 'pan' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label className='input-label'>Medical License</label>
                                <input autoComplete="off" type="file" name="medicalLicense" className='form-control input-tag' id='medicalLicense' onChange={(e) => handlechange(e)} />
                                <label htmlFor="medicalLicense" className='form-control input-tag input-file-label'>
                                {Data?.medicalLicense !== '' ? Data?.medicalLicense?.name : (<>                                    <span><MdCloudUpload /></span> Upload file from device
                                </>)}
                                    </label>
                                <div id="medicalLicenseHelp" className="form-text error-msg">{message.field === 'medicalLicense' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label className='input-label'>GSTIN Document</label>
                                <input autoComplete="off" type="file" name="gstin" className='form-control input-tag' id='gstin' onChange={(e) => handlechange(e)} />
                                <label htmlFor="gstin" className='form-control input-tag input-file-label'>
                                {Data?.gstin !== '' ? Data?.gstin?.name : (<>                                    <span><MdCloudUpload /></span> Upload file from device
                                </>)}
                                    </label>
                                <div id="gstinHelp" className="form-text error-msg">{message.field === 'gstin' ? message.msg : ""}</div>
                            </div>
                            <div className="inputsgrps">
                                <label className='input-label'>Other Document (optional)</label>
                                <input autoComplete="off" type="text" name="documentName" value={Data.documentName} className='form-control input-tag' id='documentName' placeholder='Enter Document Name' onChange={(e) => handlechange(e)} />
                                <input autoComplete="off" type="file" name="optionalDocument" className='form-control input-tag' id='optionalDocument' onChange={(e) => handlechange(e)} />
                                <label htmlFor="optionalDocument" className='form-control input-tag input-file-label'>
                                {Data?.optionalDocument !== '' ? Data?.optionalDocument?.name : (<>                                    <span><MdCloudUpload /></span> Upload file from device
                                </>)}
                                    </label>
                                    
                            </div>

                            <div className="inputsgrps">
                                <div className="checkbox-grp">
                                    <input autoComplete="off" type="checkbox" name="termsCondition" checked={Data.termsCondition} className='input-checkbox' id='termsCondition' onChange={(e) => handlechange(e)} />
                                    <label className='input-label' htmlFor="termsCondition">I accept the <a>Terms & Conditions</a></label>
                                </div>

                                <div id="termsCondition" className="form-text error-msg">{message.field === 'termsCondition' ? message.msg : ""}</div>
                            </div>

                            <button className='btn' onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
