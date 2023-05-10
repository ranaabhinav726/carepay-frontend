import './dashHeader.scss'
import Logo from '../../assets/Logo-carepay.webp'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'

const DashHeader = () =>{
    const [section, setSection] = useState('insights');
    return(
        <main className='header'>
            <div className="header-upper">
                <div className="left">
                    <RxHamburgerMenu className='hamIcon' />
                    <img src={Logo} alt="" />
                </div>
                <button>Add patient</button>
            </div>
            <div className="header-lower">
                <div className="btn-group">
                    <div onClick={()=>setSection("insights")} className={section=="insights"?"insights active":"insights"}>Insights</div>
                    <div onClick={()=>setSection("transactions")} className={section=="transactions"?"transactions active":"transactions"}>Transactions</div>
                </div>
            </div>
        </main>
    )
}
export default DashHeader