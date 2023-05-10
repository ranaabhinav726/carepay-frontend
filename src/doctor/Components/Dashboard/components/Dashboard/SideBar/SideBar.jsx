import './sideBar.scss'
import { RxCross1 } from 'react-icons/rx'
import { MdMessage } from 'react-icons/md'
import { BsShareFill, BsHeadset, BsChevronRight, BsChevronDown } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { env } from '../../../environment'

const SideBar = () =>{
    // let initials = "DJ";
    const [initials, setInitials] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [clinicName, setClinicName] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [qrLink, setQrLink] = useState('')

    // let clinicName = "Smiles club";

    let overlay = useRef(0);
    // let body = useRef(0);
    let doctorId = localStorage.getItem('doctorId') || "";

    useEffect(()=>{
        overlay.current = document.getElementById('overlay');
        // body.current = document.querySelector("body");
        axios.get(env.api_Url + "getDoctorDetailByDoctorId?doctorId=" + doctorId)
        .then(response =>{
            if(response.data.status === 200){
                console.log(response);
                setDoctorName(response.data?.data.name);
                setClinicName(response.data?.data.clinic);
                setSpeciality(response.data?.data.speciality)
                setQrLink(response.data?.data.qr_url)
                let nameArr = response.data?.data?.name?.split(' ');
                let init = "";
                for(let i=0; i<2; i++){
                    init += nameArr[i][0];
                }
                setInitials(init);
            }
        })
    },[])

    function handleSidebar(e){
        if(overlay.current) overlay.current.classList.remove('show');
        // body.current.style.overflow = "hidden";
    }

    return(
        <div id="overlay">
        <div className="sideBar">
            <RxCross1 onClick={()=>handleSidebar()} className='cross' />
            <div className="doctorDetails">
                <div className="userImage">
                    <p className="initials">{initials}</p>
                </div>
                <div className="doctorCred">
                    <p className="docName">Dr. {doctorName}</p>
                    <p className="docQualification">{speciality}</p>
                </div>
                <BsChevronRight className='arrow' />
            </div>
            <div className="clinicName center">{clinicName} <BsChevronDown /></div>
            <div className="qrCode">
                <img src={qrLink} alt="" />
            </div>
            <a href={qrLink} className="downloadQR" target='_blank' download="qrCode">Download QR</a>
            <a href="" className="shareLink center">Share Link <BsShareFill /></a>
            <hr />

            <div className="support">
                <p className="head">Support</p>
                <p className="way1"><MdMessage className='icon' /> Chat with us</p>
                <p className="way2"><BsHeadset className='icon' /> Help</p>
            </div>
        </div>
        </div>
    )
}

export default SideBar