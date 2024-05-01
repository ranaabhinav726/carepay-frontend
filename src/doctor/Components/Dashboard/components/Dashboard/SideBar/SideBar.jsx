import './sideBar.scss'
import { RxCross1 } from 'react-icons/rx'
import { MdMessage, MdContentCopy, MdCheck } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { BsHeadset, BsChevronRight, BsChevronDown } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { env } from '../../../environment'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    // let initials = "DJ";
    const [initials, setInitials] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [clinicName, setClinicName] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [qrLink, setQrLink] = useState('')

    const [isCopied, setIsCopied] = useState(false);

    // let clinicName = "Smiles club";

    let overlay = useRef(0);
    let sidebar = useRef(0);
    // let body = useRef(0);
    const [doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));

    const navigate = useNavigate();

    useEffect(() => {
        overlay.current = document.getElementById('overlay');
        sidebar.current = document.getElementById('sideBar');
        // body.current = document.querySelector("body");
        if (doctorId) {
            axios.get(env.api_Url + "getDoctorDetailByDoctorId?doctorId=" + doctorId)
                .then(response => {
                    if (response.data.status === 200) {
                        console.log(response);
                        setDoctorName(response.data?.data.name);
                        setClinicName(response.data?.data.clinic);
                        setSpeciality(response.data?.data.speciality)
                        setQrLink(response.data?.data.qr_url)
                        let nameArr = response.data?.data?.name?.split(' ');
                        let init = "";
                        for (let i = 0; i < 2; i++) {
                            // Check if nameArr is defined and not null
                            if (nameArr && Array.isArray(nameArr)) {
                                for (let i = 0; i < nameArr.length; i++) {
                                    // Check if i is within bounds of nameArr
                                    if (nameArr[i]) {
                                        // Check if nameArr[i] is an array and has at least one element
                                        if (Array.isArray(nameArr[i]) && nameArr[i].length > 0) {
                                            // Access the first character of the first element of nameArr[i]
                                            init += nameArr[i][0];
                                        } else {
                                            console.error(`nameArr[${i}] is not a valid array or is empty`);
                                        }
                                    } else {
                                        console.error(`nameArr[${i}] is undefined`);
                                    }
                                }
                            } else {
                                console.error("nameArr is not defined or is not an array");
                            }

                        }
                        setInitials(init);
                    }
                })
        }
    }, [doctorId])

    function handleSidebar(e) {
        if (overlay.current) overlay.current.classList.remove('show');
        if (sidebar.current) sidebar.current.classList.remove('show');
        // body.current.style.overflow = "hidden";
    }

    function downloadQR() {
        fetch(qrLink)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // the filename you want
                a.download = 'My-QR.png';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                alert('your file has downloaded!'); // or you know, something with better UX...
            })
            .catch(() => alert('oh no!'));
    }

    function copyQRLinktoClipboard() {
        if (!!navigator.clipboard) {
            navigator.clipboard.writeText(qrLink);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000)
        }
    }

    function doctorLogout() {
        localStorage.removeItem('D-doctorId');
        navigate('/doctor');
    }

    return (
        <>
            <div id="overlay" onClick={() => handleSidebar()}>
            </div>
            <div id='sideBar' className="sideBar">
                <RxCross1 onClick={() => handleSidebar()} className='cross' />
                <div className="doctorDetails">
                    <div className="userImage">
                        <p className="initials">{initials}</p>
                    </div>
                    <div className="doctorCred">
                        <p className="docName">Dr. {doctorName}</p>
                        <p className="docQualification">{speciality}</p>
                    </div>
                    <div onClick={() => doctorLogout()} className="doctor-logout">
                        <FiLogOut />
                        <span>Logout</span>
                    </div>
                </div>
                <div className="clinicName center">{clinicName} <BsChevronDown /></div>
                <div className="qrCode">
                    <img src={qrLink} alt="" />
                </div>
                <p onClick={() => downloadQR()} className="downloadQR">Download QR</p>
                <p onClick={() => copyQRLinktoClipboard()} className={isCopied ? "copyLink center copied" : "copyLink center"}>{isCopied ? <MdCheck /> : <MdContentCopy />} {isCopied ? "Copied" : "Copy Link"} </p>
                <hr />

                <div className="support">
                    <p className="head">Support</p>
                    <a href="mailto:connect@carepay.money" className="way1"><MdMessage className='icon' /> Email to us</a >
                    <a href="tel:+918069489655" className="way2"><BsHeadset className='icon' /> Help</a >
                </div>
            </div>
        </>
    )
}

export default SideBar