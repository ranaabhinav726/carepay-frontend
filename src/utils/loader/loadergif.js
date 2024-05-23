import React from "react";
import Loader from './Loading 3.gif'

const Loadinggif = () => {
    return (
        <div style={{ marginTop: "12%", textAlign: 'center' }} >
            <img src={Loader} style={{ width: '30%' }} />
            <p>Please wait, do not close this tab.</p>
        </div>
    )
}
export default Loadinggif