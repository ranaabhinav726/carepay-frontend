import { Header } from '../../comps/Header';

import './addressDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../../environment/environment"


const ArthAddressDetails = () => {

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
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("Select state");
    const [otherState, setOtherState] = useState("");

    const [firstLineP, setFirstLineP] = useState("");
    const [pincodeP, setPincodeP] = useState("");
    const [cityP, setCityP] = useState("");
    const [stateP, setStateP] = useState("Select state");
    const [otherStateP, setOtherStateP] = useState("");

    const [fetching, setFetching] = useState(false);

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [errorMsg, setErrorMsg] = useState("This field can't be empty.")

    const [isPermAddrSame, setIsPermAddrSame] = useState(false);

    const [isDecentroCall, setDecentroCall] = useState(false);

    let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~]/;

    let states = [
                    "Select state", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chattisgarh", "Chandigarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep Islands", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"
                ];

    let stateOptions = states.map((state, idx)=>{
        if(idx > 0) return <option key={idx} value={state}>{state}</option>;

        return <option disabled key={idx} value={state}>{state}</option>
    })

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
                        handlePincode(data?.pincode?.toString());
                        setState(data.state ?? "Select state");
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
    function handlePincode(val, type){
        if(val.length < 6){
            setPincode(val);
        }else if(val.length == 6){
            setFetching(true);
            setPincode(val);
            axios.get(env.api_Url+"userDetails/codeDetail?code=" + val +"&type=zip")
            .then(response =>{
                console.log(response)
                let city = response?.data?.city || "";
                let state = response?.data?.state || "Select state";
                if(type === "current"){
                    setCity(city); 
                    setState(state);
                }else{
                    setCityP(city); 
                    setStateP(state);
                }
                setFetching(false);
            }).catch(()=>{
                setFetching(false);
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
        if(specialChars.test(city)){
            let elem = document.getElementById('city');
            setErrorMsg("Special characters are not allowed.");
            setTimeout(() => {
                setErrorMsg("This field can't be empty.");
            }, 3000);
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(state === "Select state"){
            let elem = document.getElementById('state');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(state === "Other" && !otherState){
            let elem = document.getElementById('otherState');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)
        let userId = localStorage.getItem("userId");
        let submitObj = {
            "userId": userId,
            "addressType": addressType,
            "address": firstLine.trim(),
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
        <h3>Address Details</h3>
        <div style={{width:"100%", background:"#FAE1CD", padding:"12px", borderRadius:"4px", textAlign:"center", marginBottom:"2rem"}}>
            Please select and verify your address.
        </div>

        <p className='sectionHead'>Current address</p>

        <div className="addressType">
            <p>Select address</p>
            <select name="selectAddress" id="selectAddress" onChange={(e)=>selectAddress(e.target.value)}>
                {addressOptions}
            </select>
        </div>

        <div className="firstLine">
            <p>Address line 1</p>
            <input type="text" 
                id="firstLine"
                value={firstLine ?? ""} 
                onChange={(e)=> setFirstLine(e.target.value)} 
                placeholder="Please enter your address" 
                required 
            />
            <span className="fieldError">Please enter your complete address</span>
        </div>

        <div className="pincode">
            <p>Address pincode</p>
            <input type="number" 
                id="pincode"
                value={pincode ?? ""} 
                onChange={(e)=> handlePincode(e.target.value, "current")}
                placeholder="Enter your pincode here" 
                min={0}
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div className="city" style={{width:"49%"}}>
                <p>City</p>
                <input type="text"
                    id="city"
                    className={fetching === true ? "dynamicFetching" : ""}
                    value={city ?? ""}
                    disabled={fetching === true}
                    onChange={(e)=> setCity(e.target.value)}
                    placeholder={fetching ? "fetching..." : "Enter your city here" }
                    required 
                />
                <span className="fieldError">{errorMsg}</span>
            </div>

            <div className="state" style={{width:"49%"}}>
                <p>State</p>
                <select id="state" value={state} onChange={(e)=> setState(e.target.value)}>
                    {stateOptions}
                </select>
                <span className="fieldError">Please select your state</span>
                {state === "Other" && 
                    <input type="text" 
                    id="otherState"
                    value={otherState ?? ""}
                    onChange={(e)=> setOtherState(e.target.value)}
                    placeholder={"Enter your state here" }
                    style={{marginTop:"12px"}}
                    required 
                    />    
                }
                <span className="fieldError">This field can't be empty.</span>
            </div>

        </div>
        

        <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
            <input 
                style={{
                    width:"20px", 
                    accentColor:"#514C9F"
                }} 
                type="checkbox" 
                name="samePermAddr" 
                id="samePermAddr" 
                value={isPermAddrSame} 
                onClick={()=>setIsPermAddrSame(!isPermAddrSame)}
            />
            <label htmlFor='samePermAddr'>My permanent address is same as my current address.</label>
        </div>

        {!isPermAddrSame &&
        <>  
        <p className='sectionHead'>Permanent address</p>
        <div className="addressType">
            <p>Select address</p>
            <select name="selectAddress" id="selectAddress" onChange={(e)=>selectAddress(e.target.value)}>
                {addressOptions}
            </select>
        </div>

        <div className="firstLine">
            <p>Address line 1</p>
            <input type="text" 
                id="firstLine"
                value={firstLineP ?? ""} 
                onChange={(e)=> setFirstLineP(e.target.value)} 
                placeholder="Please enter your address" 
                required 
            />
            <span className="fieldError">Please enter your complete address</span>
        </div>

        <div className="pincode">
            <p>Address pincode</p>
            <input type="number" 
                id="pincode"
                value={pincodeP ?? ""} 
                onChange={(e)=> handlePincode(e.target.value)}
                placeholder="Enter your pincode here" 
                min={0}
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div className="city" style={{width:"49%"}}>
                <p>City</p>
                <input type="text"
                    id="city"
                    className={fetching === true ? "dynamicFetching" : ""}
                    value={cityP ?? ""}
                    disabled={fetching === true}
                    onChange={(e)=> setCityP(e.target.value)}
                    placeholder={fetching ? "fetching..." : "Enter your city here" }
                    required 
                />
                <span className="fieldError">{errorMsg}</span>
            </div>

            <div className="state" style={{width:"49%"}}>
                <p>State</p>
                <select id="state" value={stateP} onChange={(e)=> setStateP(e.target.value)}>
                    {stateOptions}
                </select>
                <span className="fieldError">Please select your state</span>
                {stateP === "Other" && 
                    <input type="text" 
                    id="otherState"
                    value={otherStateP ?? ""}
                    onChange={(e)=> setOtherStateP(e.target.value)}
                    placeholder={"Enter your state here" }
                    style={{marginTop:"12px"}}
                    required 
                    />    
                }
                <span className="fieldError">This field can't be empty.</span>
            </div>
        </div>
        </>
        }
        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={()=>handleForm()} className="submit">Submit</button>
    </main>
    </>
   )
}


export default ArthAddressDetails