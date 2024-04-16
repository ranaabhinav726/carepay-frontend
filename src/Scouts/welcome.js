

import React, { useEffect, useState } from "react";
import CarepayLogo from '../patient/assets/Logo-carepay.svg'
import Alert from './imagesscouts/Vector (31).png'
const Welcome = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
            <div className="scout-body text-center mt-5">
                <h1 style={{color:'#514C9F'}}>Welcome<br />
                    to CarePay</h1>
                <p className="mt-5" style={{ fontSize: '14px', marginTop: '20px' }}>Getting your clinic ready to offer instant credits <br />
                    to patients is just a couple of steps away!</p>
                <button className="carepay-button-purple mt-4">Okay, got it!</button>


            </div>
        </div>
    )
}

export default Welcome