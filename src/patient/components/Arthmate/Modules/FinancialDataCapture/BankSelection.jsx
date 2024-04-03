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
import { getBankList, startUploadURL } from '../../servicesAndUtility/api'


const ArthBankSelection = () =>{

    const navigate = useNavigate()
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let [banklist, setBankList] = useState([]);
    const [bankListComps, setBankListComps] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [popOver, setShowPopOver] = useState(null);
    const [consent, setConsent] = useState(false);


    useEffect(()=>{
        getBankList("statement", res=>{
            console.log(res);
            let list = res?.data?.data;
            if(Array.isArray(list)){
                setBankList(list);
            }
        })
        // setBankList(
        // [
        //             {
        //                 "id": 64,
        //                 "name": "Abhyudaya Co-Operative Bank Ltd",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 60,
        //                 "name": "Airtel Payments Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 26,
        //                 "name": "Allahabad Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 6,
        //                 "name": "Andhra Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 66,
        //                 "name": "AP GRAMEENA VIKAS BANK",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 42,
        //                 "name": "AU Small Finance Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 4,
        //                 "name": "Axis Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 50,
        //                 "name": "Bandhan Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 17,
        //                 "name": "Bank of Baroda",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 15,
        //                 "name": "Bank of India",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 41,
        //                 "name": "Bank of Maharashtra",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 8,
        //                 "name": "Canara Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 10,
        //                 "name": "Central Bank of India",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 14,
        //                 "name": "Citibank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 56,
        //                 "name": "CITY UNION BANK LTD",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 21,
        //                 "name": "Corporation Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 71,
        //                 "name": "CSB Bank Ltd.",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 49,
        //                 "name": "Dbs Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 58,
        //                 "name": "DCB Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 19,
        //                 "name": "Dena Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 55,
        //                 "name": "Equitas Small Finance Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 54,
        //                 "name": "Esaf Small Finance Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 13,
        //                 "name": "Federal Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 48,
        //                 "name": "Fincare Small Finance Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 40,
        //                 "name": "Fino Payments Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 1,
        //                 "name": "HDFC Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": true
        //             },
        //             {
        //                 "id": 3,
        //                 "name": "ICICI Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 7,
        //                 "name": "IDBI Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 32,
        //                 "name": "IDFC FIRST Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 57,
        //                 "name": "India Post Payments Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 12,
        //                 "name": "Indian Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 33,
        //                 "name": "Indian Overseas Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 25,
        //                 "name": "IndusInd Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 65,
        //                 "name": "Jammu&Kashmir Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 53,
        //                 "name": "Jana Small Finance Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 31,
        //                 "name": "Karnataka Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 67,
        //                 "name": "Karnataka Vikas Grameena Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 35,
        //                 "name": "Karur Vysya Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 5,
        //                 "name": "Kotak Mahindra Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 51,
        //                 "name": "Municipal Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 22,
        //                 "name": "Oriental Bank of Commerce",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 34,
        //                 "name": "Paytm Payments Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 68,
        //                 "name": "Punjab and Sind Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 9,
        //                 "name": "Punjab National Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 63,
        //                 "name": "Rajasthan Marudhara Gramin Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 39,
        //                 "name": "RBL (Ratnakar) Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 59,
        //                 "name": "Saraswat co-operative Bank Ltd",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 38,
        //                 "name": "South Indian Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 27,
        //                 "name": "Standard Chartered Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "State Bank of India",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 24,
        //                 "name": "Syndicate Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 61,
        //                 "name": "Tamilnad Mercentile Bank Ltd.",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 69,
        //                 "name": "Thane Janata Sahakari Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 70,
        //                 "name": "THE COSMOS CO-OP. BANK LTD",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 37,
        //                 "name": "UCO Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 36,
        //                 "name": "Ujjivan Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 16,
        //                 "name": "Union Bank of India",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 23,
        //                 "name": "United Bank of India",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 52,
        //                 "name": "Utkarsh Small Finance Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 20,
        //                 "name": "Vijaya Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             },
        //             {
        //                 "id": 11,
        //                 "name": "Yes Bank",
        //                 "inst_type": "Bank",
        //                 "form26as_enabled": false
        //             }
        // ]
        // )
        // filterList();
        setLoaded(true)
    },[]);

    useEffect(()=>{
        if(popOver === false || popOver === null){
            setConsent(false);
        }
    }, [popOver])

    useEffect(()=>{
        let banks = banklist.map((item, idx)=>{
            return <Bank bankName={item.name} id={item.id} Icon={BankIcon} key={idx} selectAndProceed={selectAndProceed}/>
        })
        console.log(banks)
        setBankListComps(banks);
    }, [banklist])


    function selectAndProceed(bankName, id){

        let data = {
            "bankName" : bankName,
            "id" : id
        }
        setShowPopOver(data)
        // localStorage.setItem("bankName", bankName)
        // navigate('/MethodSelection');
    }

    function filterList(e){
        let text = e?.target?.value?.toLowerCase() || "";
        let filtered = banklist.filter( (item) => {
            return item.name.toLowerCase().includes(text)
        })
        let banks = filtered.map((item, idx)=>{
            return <Bank BankName={item.name} id={item.id} Icon={BankIcon} key={idx} selectAndProceed={selectAndProceed}/>
        })
        console.log(banks)
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

    function startUpload(id){
        startUploadURL(userId, id, res=>{
            console.log(res);
        })
    }
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
                    bankName={popOver.bankName} 
                    checkAndNavigate={startUpload} 
                    consent={consent}
                    setConsent={setConsent}
                    id={popOver.id}
                />
            </BottomPopOverModal>
        }
        </main>
    </>
    )
}

export default ArthBankSelection

const Bank = ({bankName, id, Icon, selectAndProceed}) =>{
    
    // const data = useData();
    return(
        <div className="bank" style={{cursor:"pointer"}}>
            <div className="bankIcon"><img src={Icon} alt="" /></div>
            <div className="bankName">
                <span onClick={()=>selectAndProceed(bankName, id)} className="name">{bankName}</span>
            </div>
        </div>
    )
}

function PopOverContent({bankName, id, consent, setConsent, checkAndNavigate}){

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
                onClick={()=>checkAndNavigate(id)}
            >
                Continue with this bank
            </button>
        </>
    )
}