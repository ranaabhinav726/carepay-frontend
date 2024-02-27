import { Header } from '../../comps/Header'
import './styles/bankSelection.scss'

import { FaSearch } from 'react-icons/fa'

import BankIcon from '../../assets/bankIcon.png'
import Loading from '../../assets/incomeDoc.svg'
import { useEffect, useState } from 'react';
import { env } from '../../../../environment/environment'
import axios from "axios";

import { useNavigate } from "react-router-dom";
import BottomPopOverModal from '../../comps/BottomPopOverModal'


const ArthBankSelection = () =>{

    const navigate = useNavigate()
    
    let token = localStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let [banklist, setBankList] = useState([]);
    const [bankListComps, setBankListComps] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [popOver, setShowPopOver] = useState(true);
    const [consent, setConsent] = useState(false);


    useEffect(()=>{
        axios
            .get(env.login_api_Url + "bank_list", config)
            .then((response) => {
                let responseCode = response.status + "";
                if(responseCode[0] == '2'){
                    let data = response?.data?.all_bank_name;
                    setBankList(response?.data?.all_bank_name);
                    let banks = data.map((item, idx)=>{
                        return <Bank BankName={item.Bank_name} Icon={BankIcon} isAA={item.bank_aa} key={idx} selectAndProceed={selectAndProceed}/>
                    })
                    setBankListComps(banks);
                    setLoaded(true);
                }
            }).catch(error => {
                console.log(error);
                });
    },[]);


    function selectAndProceed(e){
        // e.stopPropagation();
        // console.log(e.target)

        let bankName = e.target.innerText;
        let aaStatus = e.target.nextSibling === null;

        console.log(bankName, aaStatus)
        
        localStorage.setItem("bankName", bankName)
        localStorage.setItem("isBankAA", aaStatus)
        navigate('/MethodSelection');
    }

    function filterList(e){
        let text = e.target.value.toLowerCase();
        let filtered = banklist.filter( (item) => {
            return item.Bank_name.toLowerCase().includes(text)
        })
        let banks = filtered.map((item, idx)=>{
            return <Bank BankName={item.Bank_name} Icon={BankIcon} isAA={item.bank_aa} key={idx} selectAndProceed={selectAndProceed}/>
        })
        setBankListComps(banks);
    }

    // let list = document.getElementsByClassName('list')[0];
    // list.addEventListener('click', (e)=>{
    //     console.log(e.target)
    // }, true)

    let loadingComp = <div className='loading'>
                          <img className='spinner' src={Loading}></img>
                          <span>Loading list of banks</span>
                      </div>

    let listContainerElem = loaded ? bankListComps : loadingComp;

    return(
    <>
        <main className='arthBankSelection'>
        <Header progressbarDisplay="block" progress="94" canGoBack />
        <h3>Income Verification</h3>
        <p>Search to select your bank with income account</p>
        <div className="search">
            <FaSearch className='searchIcon' />
            <input onChange={filterList} id='searchBox' type="text" />
        </div>
        

        <div className="list">
            {listContainerElem}
            <div className="bank noBankFound">
                <div className="questionMark">?</div>
                <div className="bankName">
                    <span>If you are unable to find your bank </span>
                    <span className='continueLink'>continue here</span>
                </div>
            </div>
        </div>

        {popOver && 
            <BottomPopOverModal
                showPopOver={popOver}
                setShowPopOver={setShowPopOver}
            >
                <PopOverContent
                    bankName={"Axis Bank"} 
                    checkAndNavigate={()=>{}} 
                    consent={consent}
                    setConsent={setConsent}
                />
            </BottomPopOverModal>
        }
        </main>
    </>
    )
}

export default ArthBankSelection

const Bank = ({BankName, Icon, isAA, selectAndProceed}) =>{
    
    // const data = useData();
    return(
        <div className="bank">
            <div className="bankIcon"><img src={Icon} alt="" /></div>
            <div className="bankName">
                <span onClick={selectAndProceed} className="name">{BankName}</span>
                {isAA!=="yes"? <span className="nonAA">Non AA bank</span>:""}
            </div>
        </div>
    )
}

function PopOverContent({bankName, consent, setConsent, checkAndNavigate}){

    return(
        <>
            <div style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                marginBottom:"1rem"
            }}>
                <div style={{
                    height:"48px",
                    width:"32px",

                    display:"flex",
                    alignItems:"center",
                }}>
                    <img 
                        src={BankIcon} 
                        alt="" 
                        style={{
                            height:"24px"
                        }} 
                    />
                </div>

                <span>{bankName}</span>
            </div>

            <div style={{display:"flex", gap:"12px"}}>
                <input 
                    value={consent} 
                    onChange={()=>setConsent(!consent)} 
                    type="checkbox" 
                    name="" 
                    id="bankConsent" 
                    style={{
                        accentColor:"#514C9F", 
                        alignSelf:"start", 
                        aspectRatio:"1/1", 
                        width:"34px", 
                        marginTop:"4px"
                    }} 
                />
                <label 
                    htmlFor='bankConsent'
                    style={{userSelect:"none"}}
                >
                    I allow CareCoin Technologies Pvt Ltd and its partners to be my 
                    authorised representative for fetching my transactions data from my bank.
                </label>
            </div>
            
            <button 
                className={'submit' + (consent?"":" disabled")}
                onClick={()=>checkAndNavigate()}
            >
                Continue with this bank
            </button>
        </>
    )
}