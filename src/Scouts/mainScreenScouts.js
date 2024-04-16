import React, { useEffect, useState } from "react";
import CarepayLogo from '../patient/assets/Logo-carepay.svg'
import ImageMain from './imagesscouts/scoutmain.png'
import ICON from './imagesscouts/righticon.png'
import { useNavigate } from "react-router-dom";
import routes from "../layout/Routes";
const MainScouts = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    let navigate=useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="screen-width-max">
            <div className="header-scouts">
                <img src={CarepayLogo} />
            </div>
            <div className="scout-body">
                <p className="" style={{ fontSize: '14px' }}>Please specify your role to proceed forward</p>
                <h5><b>I am logging in for</b></h5>
                <div className="purple-bg-box" onClick={()=>navigate(routes.SCOUTS_LOGIN)}>
                    <div className=""  style={{ width: '100%', display: 'flex' }}>
                        <div className="" style={{ width: '70%' }}>
                            Clinic/hospital
                        </div>
                        <div className="" style={{ width: '30%' }}>
                            <img src={ICON} style={{ width: '26px', float: 'right' }} />
                        </div>
                    </div>
                </div>
                <div className="yellow-bg-box" onClick={()=>navigate(routes.SCOUTS_LOGIN)}>
                    <div className="" style={{ width: '100%', display: 'flex' }}>
                        <div className="" style={{ width: '70%' }}>
                            Partner
                        </div>
                        <div className="" style={{ width: '30%' }}>
                            <img src={ICON} style={{ width: '26px', float: 'right' }} />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <img src={ImageMain} style={{ width: '70%', marginTop: windowHeight < 768 ? '50%' : '20%' }} />
                </div>
            </div>
        </div>
    )
}

export default MainScouts