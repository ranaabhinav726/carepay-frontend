import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header"

import axios from "axios";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment";

const DocAddressDetails = () =>{

    const navigate = useNavigate()

    const [building, setBuilding] = useState("");
    const [locality, setLocality] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [id, setId] = useState("");
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const[doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));
    

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    useEffect(()=>{
        if(doctorId){
            async function getCall(){
                showWrapper(ref.current);
                await axios.get(env.api_Url+"getAddressDetails?doctorId=" + doctorId)
                .then((response)=>{
                    console.log(response)
                    if(response.data.data != null){
                        setId(response?.data?.data?.id);
                        let building = response?.data?.data?.building;
                        setBuilding(building);
                        let locality = response?.data?.data?.locality;
                        setLocality(locality);
                        let pinCode = response?.data?.data?.pinCode;
                        setPincode(pinCode);
                        let city = response?.data?.data?.city;
                        setCity(city);
                        let state = response?.data?.data?.state;
                        setState(state);
                    }
                }).catch((error)=>{
                    console.log(error)
                })
                hideWrapper(ref.current)
            }
            getCall();
        }
    },[doctorId])

    // function showErrorOnUI(elem){
    //     elem.scrollIntoView({ behavior: "smooth", block: "center"});
    //     elem.classList.add('inputBoxError');
    //     navigator.vibrate(
    //         [100, 30, 100, 30]
    //     );

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    function handlePincode(val){
        if(val.length < 6){
            setPincode(val);
        }else if(val.length == 6){
            setPincode(val);
            axios.get(env.api_Url+"userDetails/codeDetail?code=" + val +"&type=zip")
            .then(response =>{
                console.log(response)
                let city = response?.data?.city;
                setCity(city);
                let state = response?.data?.state;
                setState(state);
                console.log()
            })
        }
    }

    async function onSubmit(){

        if(! building){
            let elem = document.getElementById('building');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! locality){
            let elem = document.getElementById('locality');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! pincode){
            let elem = document.getElementById('pincode');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! city){
            let elem = document.getElementById('city');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        axios.post(env.api_Url+"saveOrUpdateAddressDetails", {
            "id": id,
            "doctorId" : doctorId,
            "building": building,
            "locality": locality,
            "pinCode": pincode,
            "city": city,
            "state": state,
            "formStatus":""
        })
        .then(response =>{
            console.log(response);
            if(response.data.status == 200){
                navigate('/doctor/BankDetails');
            }else{
                apiErrorHandler();
            }
        }).catch(error => {
            apiErrorHandler();
            console.log(error);
        });
        setCanSubmit(true);
        hideWrapper(ref.current);
    }
    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }

    return(
        <>
        <main id="addressDetails">
        <Header progressbarDisplay="block" progress={80} canGoBack={"/doctor/PracticeDetails"} />
            <p className="heading">Address</p>

            <div className="inputGroup">
                <p className='group-title'>Building</p>
                <input
                    id="building"
                    className='group-input'
                    onChange={(e)=>setBuilding(e.target.value)}
                    value={building}
                    placeholder="Enter your building name" 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Locality</p>
                <input
                    id="locality"
                    className='group-input'
                    onChange={(e)=>setLocality(e.target.value)}
                    value={locality}
                    placeholder="Enter name of your locality" 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Pincode</p>
                <input
                    id="pincode"
                    type="number"
                    className='group-input'
                    onChange={(e)=>handlePincode(e.target.value)}
                    value={pincode}
                    placeholder="Enter pincode" 
                />
                <span className="fieldError">Please enter a correct pincode</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>City</p>
                <input
                    id="city"
                    className='group-input'
                    onChange={(e)=>setCity(e.target.value)}
                    value={city}
                    placeholder="Enter name of your city" 
                />
                <span className="fieldError">Please enter your city</span>
            </div>
            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=> onSubmit()} className="submit">Next</button>
        </main>    
        </>
    )
}

export default DocAddressDetails