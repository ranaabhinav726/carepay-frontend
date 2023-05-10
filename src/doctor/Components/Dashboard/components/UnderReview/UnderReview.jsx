import './underReview.scss'
import cardImage from '../../assets/cardImage.png'
import Faq from '../Common/Faq'
import Help from '../Common/Help'
import Advice from '../Common/Advice'
import Header from '../Header/Header'

const UnderReview = () =>{
    return (
        <main id="underReview">
            <Header />
            <div className="container">
                <div className="card hero">
                    <div className="reviewCard">
                        <img src={cardImage} alt="" />
                        <div className="info">
                            <h2>Under review!</h2>
                            <p>Your application is under review.<br />After verification, your patients<br />will be ready to avail loan.</p>
                        </div>
                    </div>
                    <button className="submit">Refresh status</button>
                </div>
                
                <Faq />
                <Help />
                <Advice />
            </div>
        </main>
    )
}

export default UnderReview