import Header from "../../Header/Header"
import './addressDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../environment/environment"
import SelectAndVerify from "../../utility/SelectAndVerify";


const AddressDetails = () => {

    // const data = useData();
    const navigate = useNavigate();
    let fullName = localStorage.getItem('P_userName');
    let userId = localStorage.getItem('userId');
    
    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "Address_Details"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    const [addressType, setAddressType] = useState("current");
    const [firstLine, setFirstLine] = useState("");
    // const [locality, setLocality] = useState("");
    // const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [isDecentroCall, setDecentroCall] = useState(false);

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        let userId = localStorage.getItem('userId');
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getUserAddressByUserId?userId=" + userId)
            .then(response => {
                if(response.data.status === 200){
                    let data = response.data.data;
                    if(!! data){
                        setAddressType(data.addressType);
                        setFirstLine(data.address);
                        // setLocality(data.locality);
                        // setLandmark(data.landmark);
                        setPincode(data.pincode);
                        setState(data.state);
                        setCity(data.city);
                    }
                    if(data.addressType === null){
                        getDataFromDecentro();
                    }
                }else{
                    getDataFromDecentro();
                }
            }).catch(error =>{
                getDataFromDecentro();
            })
        }
    },[])

    const [addresses, setAddresses] = useState([]);

    function getDataFromDecentro(){
        setDecentroCall(true);
        axios.get(env.api_Url+"/getCibilDataDecentro?consent=true&userId="+ userId +"&name=" + fullName)
        .then(response=>{
            console.log(response);
            if(response.data.status === 200){
                const idandContactInfo = response?.data?.data?.data?.cCRResponse?.cirreportDataLst[0]?.cirreportData?.idandContactInfo;
                setAddresses(idandContactInfo?.addressInfo || []);
            }
        })
    }


    let addressOptions = addresses.map((address, idx)=>{
        return <option key={idx+1} value={idx+1}>{address.address}</option>
    })
    addressOptions.splice(0,0, <option key={0} value={0} disabled>Select address …</option>)
    addressOptions.splice(addressOptions.length,0, <option key={addressOptions.length} value={0}>Address not found, Enter new</option>)

    function selectAddress(idx){
        if(idx==0  || addresses.length===0){
            setFirstLine("");
            return;
        }
        let obj = addresses[idx-1];
        console.log(obj)
        setFirstLine(obj?.address);
        handlePincode(obj?.postal);
    }

    // function fetchCityAndState(pin){
    //     axios
    //     .get("https://api.postalpincode.in/pincode/" + pin)
    //     .then((response) => {
    //         console.log(response)
    //         let pinState = response?.data[0]?.PostOffice[0].State;
    //         // let pinDistrict = response?.data[0]?.PostOffice[0].District;
    //         // console.log(pinState)
    //         if(pinState) setState(pinState)
    //         // if(pinDistrict != null && pinDistrict != "NA") setCity(pinDistrict)
    //         // if(response.status == '201'){
    //         //     navigate('/Employment_Details');
    //         // }
    //     }).catch(error => {
    //         console.log(error);
    //         });
    // }

    // function handlePincode(e){
    //     let pin = e.target.value;
    //     if(pin.length < 6){
    //         setPincode(e.target.value)
    //         return
    //     }
    //     if(pin.length == 6){
    //         setPincode(e.target.value)
    //         fetchCityAndState(pin);
    //     }
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
            })
        }
    }

    //////////// To alert the user about wrong formatted input ////////////////////
    // function showErrorOnUI(elem){
    //     elem.classList.add('inputBoxError');

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    async function handleForm(){
        if(!(firstLine && pincode && city && state)){ 
            // All feilds must have something, if not, console log
            console.log(firstLine, pincode, city, state)
        }
        let addressWordLength = firstLine.split(" ").length;

        if(!firstLine || addressWordLength<2){
            let elem = document.getElementById('firstLine');
            if(elem) showErrorOnUI(elem);
            return;
        }

        // if(!locality){
        //     let elem = document.getElementById('locality');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        // if(!landmark){
        //     let elem = document.getElementById('landmark');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        if(!pincode){
            let elem = document.getElementById('pincode');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(!city){
            let elem = document.getElementById('city');
            if(elem) showErrorOnUI(elem);
            return;
        }

        // if(!state){
        //     let elem = document.getElementById('state');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)
        let userId = localStorage.getItem("userId");
        let submitObj = {
            "userId": userId,
            "addressType": addressType,
            "address": firstLine,
            // "locality" : locality,
            // "landmark" : landmark,
            "pincode": pincode,
            "state": state,
            "city": city,
            "formStatus":""
        };

        // if(!!landmark){
        //     submitObj.landmark = landmark;
        // }

        await axios.post(env.api_Url + "userDetails/addressDetail",
            submitObj)
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    navigate('/patient/EmploymentDetails');
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
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

    <main className="addressDetails">
    <Header progressbarDisplay="block" progress="55" canGoBack="/patient/PersonalDetails" />
    <SelectAndVerify />
        <h3>Address Details</h3>


        <div className="addressType">
            <p>Select address</p>
            <select name="selectAddress" id="selectAddress" onChange={(e)=>selectAddress(e.target.value)}>
                {addressOptions}
            </select>
        </div>
        
        <div className="addressType">
            <p>Address type</p>
            <select name="addType" id="selectAddressType" onChange={(e) => setAddressType(e.target.value)} required>
                <option value="current">Current</option>
                <option value="permanent">Permanent</option>
                {/* <option value="Owned by self">Owned by self</option>
                <option value="Owned by parents">Owned by parents</option>
                <option value="Rented by self">Rented by self</option>
                <option value="Rented by parents">Rented by parents</option>
                <option value="Rented with friends">Rented with friends</option> */}
            </select>
        </div>

        <div className="firstLine">
            <p>First line</p>
            <input type="text" 
                id="firstLine"
                value={firstLine ?? ""} 
                onChange={(e)=> setFirstLine(e.target.value)} 
                placeholder="Please enter your address" 
                required 
            />
            <span className="fieldError">Please enter your complete address</span>
        </div>

        {/* <div className="locality">
            <p>Locality</p>
            <input type="text" 
                id="locality"
                value={locality ?? ""} 
                onChange={(e)=> setLocality(e.target.value)}
                placeholder="Enter locality here" 
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div> */}

        {/* <div className="landmark">
            <p>Landmark</p>
            <input type="text" 
                id="landmark"
                value={landmark ?? ""} 
                onChange={(e)=> setLandmark(e.target.value)}
                placeholder="Enter landmark here" 
                required 
            />
        </div> */}

        <div className="pincode">
            <p>Pincode</p>
            <input type="number" 
                id="pincode"
                value={pincode ?? ""} 
                onChange={(e)=> handlePincode(e.target.value)}
                placeholder="Enter your pincode here" 
                min={0}
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <div className="city">
            <p>City</p>
            <input type="text"
                id="city"
                value={city ?? ""} 
                onChange={(e)=> setCity(e.target.value)}
                placeholder="Enter your city here" 
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        {/* <div className="state">
            <p>State</p>
            <input type="text" 
                id="state"
                value={state ?? ""} 
                onChange={(e)=> setState(e.target.value)}
                placeholder="Enter your state here" 
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div> */}

        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={()=>handleForm()} className="submit">Submit</button>
    </main>
    </>
   )
}


export default AddressDetails