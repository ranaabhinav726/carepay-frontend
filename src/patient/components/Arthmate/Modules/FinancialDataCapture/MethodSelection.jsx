import { Header } from '../../comps/Header';
import './styles/methodSelection.scss'

import DocPlaceholder from '../../assets/incomeDoc.svg'
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { env } from "../../../../environment/environment"
import { RiArrowRightSLine } from "react-icons/ri";
import Redirecting from '../../assets/Redirecting.gif'

const ArthMethodSelection = () => {

    const navigate = useNavigate();

    const [screenState, setScreenState] = useState("methodSelection"); // methodSelection, redirecting

    function goToBankSelection(method){
        navigate("/patient/ArthBankSelection", {state:{"method": method}})
    }

    return (
        <>
            <main className='methodSelection'>
            {screenState === "methodSelection" &&
            <>
                <Header progressbarDisplay="block" progress="96" canGoBack />
                <h3>Income Verification</h3>

                <p>Select method for sharing bank data:</p>

                <div className="method">
                    <div className='details'>
                        <p className='methodName'>Proceed with Account Aggregator</p>
                        <span className="methodDetail">Faster and secure financial data transfer via RBI regulated entity</span>
                    </div>
                    <RiArrowRightSLine className='goRightIcon' />
                </div>
                <div className="methodSpeed">
                    <BsFillLightningChargeFill />
                    <span>Faster process</span>
                </div>
                <div className="method">
                    <div className='details'>
                        <p className='methodName'>Proceed with Net banking</p>
                    </div>
                    <RiArrowRightSLine className='goRightIcon' />
                </div>
                <div className="methodSpeed">
                    <BsFillLightningChargeFill />
                    <span>Faster process</span>
                </div>
                <div className="method">
                    <div className='details'>
                        <p className='methodName'>Upload bank account statement PDF</p>
                    </div>
                    <RiArrowRightSLine className='goRightIcon' />
                </div>

                <div className='docPlaceHolderImg'>
                    <img src={DocPlaceholder} alt="documents" />
                </div>
            </>
            }

            {screenState === "redirecting" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{marginTop:"15%", display:"flex", justifyContent:"center"}}>
                        <img src={Redirecting} alt="" style={{maxWidth:"60%"}} />
                    </div>
                    <p style={{fontSize:"16px", textAlign:"center", lineHeight:"150%"}}>Redirecting to aggregator platform for <br/>income verification...</p>
                </>
            }
            </main>
        </>
    )
}

export default ArthMethodSelection