import './common.scss'
import thinkEmoji from '../../assets/thinkEmoji.png'
import { MdArrowForwardIos } from 'react-icons/md'

const Faq = () =>{
    return(
        <div className="card faqs">
                <div className="faqs-head">
                    <img src={thinkEmoji} alt="" />
                    <span className="faqs-heading">FAQs</span>
                </div>

                <div className="faq">
                    <span className="question">How much time does it take to get loan processed?</span>
                    <span className="gotoArrow"><MdArrowForwardIos /></span>
                </div>
                <div className="faq">
                    <span className="question">Are there any charges involved?</span>
                    <span className="gotoArrow"><MdArrowForwardIos /></span>
                </div>
                <div className="faq">
                    <span className="question">Is loan sanctioned/offered by CarePay?</span>
                    <span className="gotoArrow"><MdArrowForwardIos /></span>
                </div>
                <p className="allFaqs">See all FAQs</p>
            </div>
    )
}

export default Faq