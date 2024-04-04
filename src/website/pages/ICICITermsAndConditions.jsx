// import './css/privacyPolicy.scss';
import './css/section.scss';
import '../../App.scss';
import Table1 from '../assets/table1.png'
import Table2 from '../assets/table2.png'


import CustomNavbar from "../Components/Navbar";
import { Footer } from "./Homepage";
import { useEffect } from "react";

function ICICITermsAndConditions(){


    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    return(
        <div className="website-container">
            <CustomNavbar  />
            <ICICITermsAndConditionsContent />
            <Footer />
        </div>
    )
}

export default ICICITermsAndConditions


function ICICITermsAndConditionsContent(){

    return(
        <div className="custom-container">
            <h2 style={{fontFamily:"DM sans"}}>PRIMARY TERMS AND CONDITIONS: POS Machine</h2>


            <p>These ‘Primary Terms and Conditions’ shall govern the Facility (as defined below) availed by the Borrower(s) (as defined below) from ICICI Bank Limited (“ICICI Bank”) through a POS Machine (as defined below) available with a Dealer (as defined below) for the purpose of availing the Facility, with the documentation and communication being communicated electronically.</p>
            <p>By availing the Facility (as defined below) through the POS Machine (as defined below), and pressing the ‘Accept’/’Agree’/ ‘Agree and Proceed’ icon/button and/or by submitting one-time password received on the Borrower/s (as defined below) mobile number registered with ICICI Bank and/or by submitting your PAN (as defined below) through the POS Machine (as defined below), the Borrower(s) confirms that the they have read, understood and agreed to the ‘Most Important Terms and Conditions of the Facility’ (“MITC”) and these ‘Primary Terms and Conditions’ at the time of applying for the same. In the event of any inconsistency between, the MITC and these Primary Terms and Conditions, the terms set forth in these Primary Terms and Conditions shall prevail.</p>

            <section>
                <div className="left-section">
                   
                    <ul className="outline-point">
                        <li id="outline-1"><a href="#policy-1">DEFINITIONS</a></li>
                        <li id="outline-2"><a href="#policy-2">GENERAL</a></li>
                        <li id="outline-3"><a href="#policy-3">SANCTION AND USAGE</a></li>
                        <li id="outline-4"><a href="#policy-4">DISBURSEMENT</a></li>
                        <li id="outline-5"><a href="#policy-5">CANCELLATION AND PREPAYMENT</a></li>
                        <li id="outline-6"><a href="#policy-6">PAYMENT AND REPAYMENT</a></li>
                        <li id="outline-7"><a href="#policy-7">REPRESENTATIONS, WARRANTIES AND COVENANTS</a></li>
                        <li id="outline-8"><a href="#policy-8">EVENT OF DEFAULT</a></li>
                        <li id="outline-9"><a href="#policy-9">TERMINATION</a></li>
                        <li id="outline-10"><a href="#policy-10">INDEMNITY</a></li>
                        <li id="outline-11"><a href="#policy-11">EXCLUSION OF LIABILITY</a></li>
                        <li id="outline-12"><a href="#policy-12">RIGHT OF SET-OFF AND LIEN</a></li>
                        <li id="outline-13"><a href="#policy-13">AUTO DEBIT</a></li>
                        <li id="outline-14"><a href="#policy-14">CASHBACK PROGRAMS</a></li>
                        <li id="outline-15"><a href="#policy-15">DISCLOSURES</a></li>
                        <li id="outline-16"><a href="#policy-16">GOVERNING LAW AND JURISDICTION</a></li>
                        <li id="outline-17"><a href="#policy-17">DISPUTE RESOLUTION</a></li>
                        <li id="outline-18"><a href="#policy-18">NOTICES AND COMMUNICATIONS</a></li>
                        <li id="outline-19"><a href="#policy-19">DISCLAIMER</a></li>
                        <li id="outline-20"><a href="#policy-20">MISCELLANEOUS</a></li>
                        <li id="outline-21"><a href="#policy-21">ANNEXURE</a></li>
                        
                    </ul>
                </div>
                <div className="right-section">
                <h5 className="policy-heading" id="policy-1">DEFINITIONS</h5>
                <p>For the purpose of these Primary Terms and Conditions, unless there is anything repugnant to the subject or context thereof, the expressions listed below shall have the following meaning:</p>
                <ul>
                    <li>“Cardless EMI” shall refer to the extension of the Facility (as defined below) to the Borrower(s) (as defined below) through the POS Machine (as defined below) available with a Dealer (as defined below).</li>
                    <li>“Borrower(s)” means any Customer(s) (as defined below) to whom the Facility (as defined below) has been sanctioned by ICICI Bank.</li>
                    <li>“Business Day” shall mean a day other than: (i) Saturday, Sunday or (ii) any other day on which banks in Mumbai are closed.</li>
                    <li>“CIBIL” shall mean Credit Information Bureau (India) Limited.</li>
                    <li>“Customer(s)” shall mean individuals and sole proprietorship firms who may the purchase the Products (as defined below)  from the Dealer (as defined below).</li>
                    <li>“ECS” means Electronic Clearing Services.</li>
                    <li>“EMI” means equated monthly installments of amounts payable by the Borrower(s), comprising of principal amount of the Facility (as defined below) and the interest thereon, to ICICI Bank with respect to the Facility.</li>
                    <li>“Facility” shall mean the financial assistance extended by ICICI Bank to in accordance with these Primary Terms and Conditions and such other terms as stipulated from time to time.</li>
                    <li>"ICICI Bank Limited Group Companies” shall mean and include: 
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>any company which is the holding company of ICICI Bank or subsidiary of ICICI Bank, or</li>
                            <li>a person under the control of or under the common control with ICICI Bank, or</li>
                            <li>any person, in more than 26% of the voting securities of which ICICI Bank has a direct or beneficial interest.</li>
                        </ol>
                        <p>For the purpose of this definition, “Control” together with grammatical variations when used with respect to any Person, means the power to direct the management and policies of such person. Directly or indirectly, whether through the ownership of the vote carrying securities, by contract or otherwise howsoever; and “Person” means a company, corporation, a partnership, trust or any other entity or organization or other body whatsoever.</p>
                    </li>
                    <li>“Service Provider” means an entity engaged in the business of manufacturing of goods/provision of services and marketing of such goods/services and has an extensive network of dealers engaged in the sale of such goods/services across India.</li>
                    <li>“Dealer” means an individual, and/or a limited liability partnership, and/or a partnership firm, and/or a private limited company, as the case may be, registered with ICICI Bank in connection with selling of Products (as defined below) to the Borrower(s) pursuant to the Facility.</li>
                    <li>“Material Terms” with respect to the Facilities, means the provisions relating to:-(i) the payment/repayment obligation (including principal, interest, fees, charges) of the Borrower under the Facility; (ii) creation/perfection/furnishing of securities in terms of Transaction Documents; (iii) any credit support (including, without limitation, any guarantee or indemnity) provided / agreed to be provided in relation to the Facility (iv) compliance with financial covenants, security related covenants and information covenants; and (v) end use of the Facility.</li>
                    <li>“NACH” means National Automated Clearing House.</li>
                    <li>“NSDL” means the National Securities Depositary Limited.</li>
                    <li>“Outstanding” means the outstanding amount of the Facility, including all fees, interest, costs, charges, expenses and all other sums whatsoever payable by the Borrower(s) to ICICI Bank in accordance with the Terms and Conditions (as defined below).</li>
                    <li>“OTP” means one-time password.</li>
                    <li>“Payment Due Date” means the date, on which the EMI for servicing the Facility is required to be paid by the Borrower(s), as decided and communicated to the Borrower(s) by ICICI Bank.</li>
                    <li>“Penal Charges” means an additional charge payable by the Borrower(s) to the Bank in case of breach of any Material Terms</li>
                    <li>“Products” means goods and / or services, being sold by the Dealer, which are purchased and / or availed by the Borrower(s).</li>
                    <li>“POS Machine” shall mean PIN (as defined below) entry devices, i.e. the devices which shall be available with the Dealers.</li>
                    <li>“PAN” means personal account number.</li>
                    <li>“PIN” means personal identification number.</li>
                    <li>“RBI” refers to the Reserve Bank of India.</li>
                    <li>“Terms and Conditions” means these Primary Terms and Conditions, along with the and the MITC, as amended and/or modified by ICICI Bank from time to time.</li>
                    <li>“Transaction Documents” include all writings and other documents executed or entered into, or to be executed or entered into, by the Borrower(s) or any other person or any other document executed or issued by ICICI Bank/Bank  in relation, or pertaining, to the Facility and each such Transaction Documents as amended from time to time.</li>
                </ul>

                <h5 className="policy-heading" id="policy-2">GENERAL</h5>
                <ul>
                    <li>The Borrower(s) hereby agree and accept that the entry of the OTP and PAN in the POS Machine constitutes a binding agreement between the Borrower(s) and ICICI Bank in connection with the Facility.</li>
                    <li> The Borrower(s) shall be responsible for the accuracy of all the information provided by them at the time of availing the Facility or otherwise and shall keep ICICI Bank updated on communication address, contact number and such other details as required to the satisfaction of ICICI Bank.</li>
                </ul>

                <h5 className="policy-heading" id="policy-3">SANCTION AND USAGE</h5>
                <ul>
                    <li>The Customer(s) shall apply for the Facility through a Dealer outlet equipped with a POS Machine where the Cardless EMI option has been enabled. Customer(s), post purchase of goods with a Dealer shall be offered Cardless EMI option at the point of sale. Their eligibility shall be checked upon their by providing their registered phone number.</li>
                    <li>If the Customer(s) are eligible, an OTP shall be generated and sent to their phone number registered with ICICI Bank. The Customer shall be required to enter the OTP into the POS Machine. The Customer would then be prompted to enter their PAN for second factor authentication.</li>
                    <li>By entering the OTP, PAN and other details, as may be stipulated by ICICI Bank from time to time, the Customer(s) provide consent for loan booking, EMI auto debit from their linked ICICI Bank account and accept these Primary Terms and Conditions.</li>
                </ul>


                <h5 className="policy-heading" id="policy-4">DISBURSEMENT</h5>
                <ul>
                    <li>The Facility shall be provided to the Borrower(s) in the sole discretion of ICICI Bank and shall be subject to the terms mentioned herein and any additional conditions as stipulated by ICICI Bank from time to time.</li>
                    <li>The Borrower(s) agree and acknowledge that the Facility amount shall be disbursed to the Dealer for and on behalf of the Borrower(s).</li>
                    <li>The Facility shall be deemed to be sanctioned and disbursed on the transfer of Facility amount from ICICI Bank’s account to the Dealer’s designated account registered with ICICI Bank.</li>
                    <li>Upon disbursement of the Facility amount, the obligation of the Borrower(s) to ensure timely payment of the principal and interest shall be unconditional and will continue unaffected, notwithstanding that the Product may be lost, stolen, damaged, defective or destroyed due to any reason (including a force majeure event) or due to an act/omission of the Borrower(s) or the Dealer or any third party, while the Product is being delivered or otherwise.</li>
                </ul>

                <h5 className="policy-heading" id="policy-5">CANCELLATION AND PREPAYMENT</h5>
                <ul>
                    <li>The Borrower(s) may prepay the Facility, with the prior written consent of ICICI Bank, by payment of the charges stipulated by ICICI Bank.</li>
                    <li>If the Borrower(s) wish to cancel/return the Product, the Borrower(s) may raise a cancellation request to the Dealer within a period of 14 days from the date of availing the Facility. Beyond this period of 14 days, the Borrower(s) shall not be entitled to such a cancellation and shall be under an obligation to repay the Facility to ICICI Bank by paying the EMIs as scheduled.</li>
                    <li>The Borrower(s) hereby acknowledges that any amount paid to the Dealer in the form of a token amount/down payment for purchasing the Product shall be settled between the Dealer and the Borrower(s).</li>
                </ul>

                <h5 className="policy-heading" id="policy-6">PAYMENT AND REPAYMENT</h5>
                <ul>
                    <li>
                        <p>The Borrower(s) agree to: </p>
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>repay the Facility amount and applicable interest, charges and other fees in the form of EMIs on or within the Payment Due Date using, debit card, net banking, cheque, auto debit or any other electronic payment mode, in the manner specifically specified herein;</li>
                            <li>pay Penal Chargesapplicable with respect to the repayment of the Facility including the cancellation charges, repayment mode swap charges etc., as specified in the MITC or as may be communicated by ICICI Bank from time to time;</li>
                            <li>pay EMI bounce charges as specified in the MITC, if the cheque issued by the Borrower(s) for payment/repayment is not honored by a bank or ECS/NACH (electronic clearing services/payment services for facilitating the payment/repayment with the consent of such Borrower(s)) or if such other instrument is returned;</li>
                            <li>pay the increased EMI amount due to increase in the interest, charges, taxes or fees payable in relation to the Facility amount. Such increased EMI amount shall form part of the MITC replacing the previous EMI amount;</li>
                            <li>pay cheque re-presentation charges in every instance where any post-dated cheque is dishonored (under any of the payment modes) and consequently represented OR in each instance where a post-dated cheque is presented when any installment/s is/are not received by ICICI Bank by/upon issue of debit instructions under the ECS method or direct debit method or any other payment method (other than the post-dated cheque method) selected by the Borrower(s).</li>
                        </ol>
                    </li>
                    <li>The Borrower(s) agree that the interest, charges and other fees payable by such Borrower(s) in relation to the Facility amount may be modified at the discretion of ICICI Bank and due notice in this regard shall be provided by ICICI Bank to such Borrower(s).</li>
                    <li>In the event the EMI is not paid within the Payment Due Date, it shall be construed as a default on part of the Borrower(s) and he/she shall become liable to pay the amount together with applicable interest and Penal Charges as specified in the MITC and late payment charges as specified in the next month’s account statement. Such Penal Charges shall be computed from the Payment Due Date till the date of actual payment, subject to revision by ICICI Bank from time to time.</li>
                    <li>On receipt of delayed payments by ICICI Bank from the Borrower(s), the amount shall be appropriated first against the outstanding dues and thereafter against the Penal Interest and late payment charges.</li>
                    <li>The Borrower(s) shall bear goods and services tax and any other statutory levies as may be applicable from time to time.</li>
                    <li>Notwithstanding anything else provided the Terms and Conditions, ICICI Bank has the right to demand repayment of the entire amount outstanding under the Facility (including but not limited the principal amount, interest amounts and any other charges etc.) payable thereon by the Borrower(s), notwithstanding any amount already paid in relation to the Facility or amount payable being reduced for any reason whatsoever.</li>
                </ul>

                <h5 className="policy-heading" id="policy-7">REPRESENTATIONS, WARRANTIES AND COVENANTS</h5>
                <ul>
                    <li>
                        <p>The Borrower(s) hereby agree:</p>
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>not to default on or delay the payment of EMI;</li>
                            <li>that he/she has understood the method of calculation of Penal Charges as specified in the MITC and other charges as levied in cases wherein the EMI has not been paid on or within the Payment Due Date</li>
                            <li>that all information provided to ICICI Bank is true and correct; and</li>
                            <li>that he/she is at least 18 years of age.</li>
                        </ol>
                    </li>
                    <li>
                        <p>The Borrower(s) shall promptly notify ICICI Bank:</p>
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>on the occurrence of any event which may make any information provided to ICICI Bank untrue or incorrect;</li>
                            <li>of any action or steps taken or other proceedings by or against the Borrower(s) in any court; and</li>
                            <li>in writing with complete details of any change in the information provided by the Borrower(s).</li>
                        </ol>
                    </li>
                    <li>The Borrower(s) shall have sole responsibility of taking delivery and possession of the Product from the Dealer. ICICI Bank shall not be held liable, in any manner whatsoever, for the delayed delivery/nondelivery of the Product and/or related quality, fitness or suitability of the Product and the services provided by the Manufacturer and Dealer.</li>
                    <li>The Borrower(s) agrees that ICICI Bank, by providing the Facility to the Borrower(s) creates a relationship of debtor and creditor between the Borrower(s) and ICICI Bank. ICICI Bank shall under no circumstance be regarded as a service provider in relation to the Product.</li>
                    <li>The Borrower(s) agree that this clause (Representations and Warranties) shall remain true and correct during the entire tenure of the Facility.</li>
                </ul>

                <h5 className="policy-heading" id="policy-8">EVENT OF DEFAULT</h5>
                <ul>
                    <li>
                        <p>The following acts, as set out below, shall constitute an ‘Event of Default’ by the Borrower(s):</p>
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>Any default in paying the EMI on or within the Payment Due Date as payable under the Facility;</li>
                            <li>Breach of any of the Primary Terms and Conditions, or occurrence of any fraud, misrepresentation or failure to submit any material information; </li>
                            <li>Bankruptcy or insolvency of the Borrower(s), or if the Borrower(s) voluntarily or involuntarily becomes the subject of proceedings under any bankruptcy or insolvency law; </li>
                            <li>It is or becomes unlawful for the Borrower(s) to perform any of its obligations under the Facility; </li>
                            <li>Death of the Borrower(s); or </li>
                            <li>The existence of any other circumstance which, in the sole opinion of ICICI Bank, could jeopardize ICICI Bank’s interest in the Facility. </li>
                        </ol>
                    </li>
                    <li>
                        <p>Upon the occurrence of an Event of Default as specified above, without prejudice to the other remedies available under law or in equity, ICICI Bank shall be entitled to give notice to the Borrower(s) and to exercise the following rights and remedies. ICICI Bank has the right to:</p>
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>recall the Facility and call upon the Borrower(s) to pay the outstanding (including principal amount, interest and charges) immediately;</li>
                            <li>engage one or more persons to collect dues from the Borrower(s). In this regard, ICICI Bank may furnish to such person(s) any information, facts and figures pertaining to Facility, contact details of such Borrower(s), as necessary;</li>
                            <li>call upon the successors/ legal heirs of the Borrower(s) to pay the outstanding and any other charges in full to ICICI Bank in the event of the death of the Borrower(s). In the event of the death of the Borrower(s), ICICI Bank shall have the same rights against the legal heirs/successors of such Borrower(s) as it had against the Borrower(s); and</li>
                            <li>to initiate legal proceedings against such Borrower(s).</li>
                        </ol>
                    </li>
                    <li>Without prejudice to the Bank’s rights and remedies under contract and/or law, in the event any amount due under the Facility remains unpaid on the Due Date(s) or Borrower(s) fails to create security and/or commits breach of any of the Material Term(s) of the Facility, the Bank shall have the right to levy and recover Penal Charges, at its sole discretion, at the rate specified in the Key Fact Statement (KFS). Upon levy of such Penal Charges, the Borrower shall pay the said Penal Charges along with applicable Goods and Service Tax (GST), other taxes (of any description whatsoever), charges and penalties which may be payable pursuant to applicable laws, from time to time, in relation to the Facility.</li>
                    <li>The Borrower acknowledges and agrees that the Penal Charges are reasonable and commensurate to non-compliance of Material Terms of the Transaction Documents</li>
                </ul>

                <h5 className="policy-heading" id="policy-9">TERMINATION</h5>
                <p>ICICI Bank may at any time with or without notice, withdraw, terminate, and/or suspend the Facility at any time or in case of an Event of Default, as provided hereinabove.</p>


                <h5 className="policy-heading" id="policy-10">INDEMNITY</h5>
                <ul>
                    <li>The Borrower(s), agree to indemnify and hold ICICI Bank and its affiliates, group companies, directors or employees harmless from and against all losses, damages, costs, claims and expenses whatsoever which ICICI Bank, its affiliates, group companies, directors or employees harmless from and against all losses, damages, costs, claims and expenses may at any time incur, sustain, suffer or is likely to suffer in connection with or as a consequence of or by reason of providing the Facility. The Borrower(s) shall pay ICICI Bank and /or its affiliates, group companies, directors or employees, such amount as may be determined by ICICI Bank and/or the affiliates to be sufficient to indemnify it against any such loss, damages, costs, claims and expenses.</li>
                    <li>Further, the Borrower(s) agree, to indemnify, defend and hold harmless ICICI Bank affiliates, its affiliates, group companies, directors or employees against any claim, suit, action or other proceeding brought against ICICI Bank or its affiliates by a third party including such claim, suit, action of other proceeding that is based on or arises in connection with a violation of the Terms and Conditions, any applicable law or regulation, or any alterations or any unauthorized use of the Facility.</li>
                    <li>Notwithstanding anything to the contrary contained herein or under any other transaction documents, the provisions of this clause (Indemnity) shall survive the termination of the Facility.</li>
                </ul>

                <h5 className="policy-heading" id="policy-11">EXCLUSION OF LIABILITY</h5>
                <ul>
                    <li>In no event shall ICICI Bank be liable to the Borrower(s) for any special, incidental, indirect, punitive or consequential damages whatsoever (including, without limitation, damages of loss of goods or services, or any other pecuniary loss) arising out of the use of, or inability to use or access the Facility or for any security breach or technical malfunctioning of the POS Machine and/or ICICI Bank’s systems, including breach of contract or warranty, negligence or other tortious action, or any other claim arising out, the Borrower(s)’ use of or access to the Facility.</li>
                    <li>
                        <p>Further, under the Terms and Conditions, ICICI Bank shall have no liability to the Borrower(s) in respect of any loss or damage arising directly or indirectly out of: </p>
                        <ol style={{listStyleType: "lower-alpha"}}>
                            <li>any defect in any Product supplied;</li>
                            <li>delay in delivery or non-receipt of Product purchased;</li>
                            <li>the refusal by any Dealer to honor the Facility;</li>
                            <li>acts done by ICICI Bank on the instruction of any person impersonating himself/herself as a Borrower(s);</li>
                            <li>the exercise by ICICI Bank Limited of its right to terminate the Facility; or</li>
                            <li>any injury to the credit character and reputation of the Borrower(s) alleged to have been caused by the termination of the Facility and/or the refusal of any Dealer to honor the Facility.</li>
                        </ol>
                    </li>
                    <li>ICICI Bank holds out no warranty or makes no representation about quality, delivery or otherwise of the Product.</li>
                    <li>Any dispute or claim arising in relation to the Product purchased by Borrower(s) must be resolved with the Dealer and / or the Service Provider. The existence of the claim or dispute shall not relieve the Borrower(s) of his/her obligation to pay the dues to ICICI Bank.</li>
                    <li>Notwithstanding anything to the contrary contained herein or under any other transaction documents, the provisions of this clause (Exclusion of Liability) shall survive the termination of the Facility.</li>
                </ul>

                <h5 className="policy-heading" id="policy-12">RIGHT OF SET-OFF AND LIEN</h5>
                <ul>
                    <li>ICICI Bank shall have the paramount right of set-off and lien, irrespective of any other lien or charge, on the deposits of any kind and nature held/ balances lying in any other account(s) of the Borrower(s) maintained with any of the ICICI group companies, whether in single name or joint name(s) and on any monies, securities, bonds and all other assets, documents and properties held by/ under the control of ICICI Bank and/or its group companies towards the satisfaction of the Borrower(s) liability under the Facility.</li>
                    <li>ICICI Bank and/ or its group companies are entitled without any notice to the Borrower(s), to settle any indebtedness whatsoever owed by the Borrower(s) to ICICI Bank (whether actual or contingent, or whether primary or collateral, or whether joint and/or several) hereunder or under any other document/ agreement, by adjusting, setting-off any deposit(s) and/or transferring monies lying to the balance of any account(s) held by the Borrower(s) with ICICI Bank and/or its group companies notwithstanding that the deposit(s)/balances lying in such account(s) may not be expressed in the same currency as such indebtedness.</li>
                    <li>ICICI Bank’s and its group companies' rights hereunder shall not be affected by the Borrower(s)’ bankruptcy, death or winding-up. It shall be the Borrower(s)’ sole responsibility and liability to settle all disputes/ objections with any such joint account holders.</li>
                </ul>

                <h5 className="policy-heading" id="policy-13">AUTO DEBIT</h5>
                <p>On availing the auto debit facility, the bank account of the Borrower(s) will be debited, for the EMI as mentioned in the account statement, on or within the Payment Due Date. In case the Payment Due Date is not a Business Day, the bank account shall be debited on the next Business Day. In the event if the bank account does not have sufficient funds on the Payment Due Date, the Borrower(s) shall be liable to pay all the charges applicable in addition to the EMI as generated in the next month’s account statement. ICICI Bank shall not be liable if the auto debit transaction is delayed or not effected at all for reasons of incomplete or incorrect information or for any other reason.</p>
                
                <h5 className="policy-heading" id="policy-14">CASHBACK PROGRAMS</h5>
                <ul>
                    <li>The Cashback programs are run at the sole discretion of ICICI Bank, however the programs could be run either by ICICI Bank solely or in partnership with Dealers or OEMs.   </li>
                    <li>Cashback shall be credited to the Borrower(s)’ loan account, the reference/ID of which starts with the prefix ‘LCF’. Eg. Loan account bearing number LCFXXXX. </li>
                    <li>Cashback shall be processed only after successful payment of EMIs in accordance with the applicable terms and conditions for the specific program. </li>
                    <li>Cashback shall be credited within 60-75 days after the qualifying criteria prescribed under the applicable terms and conditions for the specific program for EMI payments to be successful are satisfied. </li>
                    <li>Cashback amount shall not be adjusted against the principal or interest of the monthly EMI. </li>
                    <li>Cashback amount, if remaining in excess, after the last EMI payment, shall be transferred to the Borrower(s)’ account registered with ICICI Bank for EMI repayment in relation to the Facility.</li>
                </ul>

                <h5 className="policy-heading" id="policy-15">DISCLOSURES</h5>
                <p>ICICI Bank may, without any specific consent/authorization of the Borrower(s) disclose all or any information related to the Borrower(s) and/or information related to the Facility availed by the Borrower(s) or liabilities/obligations of the Borrower(s) under the Facility to (i) its group companies, (ii) CIBIL or any other credit information companies, (iii) RBI, and/or (iv) any information utilities or to any other regulatory/statutory authorities.</p>

                <h5 className="policy-heading" id="policy-16">GOVERNING LAW AND JURISDICTION</h5>
                <p>The Terms and Conditions shall be governed by the laws of India and the competent courts/tribunals in Mumbai shall have exclusive jurisdiction to deal with any dispute that may arise out of the Terms and Conditions. Notwithstanding anything to the contrary contained herein or under any other transaction documents, the provisions of this clause (Governing Law and Jurisdiction) shall survive the termination of the Facility.</p>

                <h5 className="policy-heading" id="policy-17">DISPUTE RESOLUTION</h5>
                <p>Any claim or dispute whatsoever (whether in contract, tort or otherwise) arising out of or in connection under the terms of facility, including any question regarding its construction, meaning, existence, validity, breach, recall, recovery or termination, shall be resolved and settled by mediation or conciliation (if the Borrower(s) and ICICI Bank agree to such mediation or conciliation), administered in accordance with the applicable mediation or conciliation rules of an independent online dispute resolution institution listed on ICICI Bank Limited website(“ODR Institutions”). Any party may appoint any listed ODR Institutions to facilitate mediation or conciliation. If  one Party appoints an ODR institution before the other, the ODR institution appointed by the first Party shall be binding on other party. If the Borrower(s) and ICICI Bank do not agree to mediation or conciliation , or if the mediation or conciliation fails to resolve the claim or dispute within the period stipulated in such rules or within a period of 21 days from the date of notice of appointment of mediator or conciliator (whichever is earlier), then the claim or dispute shall be taken forward for adjudication by arbitration in terms of the applicable rules of said ODR Institution, and in accordance with the Arbitration and Conciliation Act, 1996, which shall be conducted (including for recording of evidence or tendering of documents), concluded and administered online by ODR Institution through its website/platform or mobile application. The arbitral tribunal shall consist of an independent sole arbitrator appointed in accordance with the applicable arbitration rules of the ODR Institution. The seat of arbitration proceedings shall be Mumbai. The law governing the arbitration proceedings shall be Indian law. The procedural law of arbitration shall be rules of ODR Institution.NOTICES AND COMMUNICATIONS</p>

                <h5 className="policy-heading" id="policy-18">NOTICES AND COMMUNICATIONS</h5>
                <p>All notices, requests, demands, waivers, complaints, queries and other communications required or permitted to be given hereunder in relation to the Facility, shall be submitted to ICICI Bank. Any other communications arising out of any acts or omissions of the Dealers/ Service Providers to whom the payment was made using the Facility, shall be resolved between the Borrower(s) and such Dealer/ Service Provider only and ICICI Bank shall have no responsibility or liability whatsoever in such regard.</p>

                <h5 className="policy-heading" id="policy-19">DISCLAIMER</h5>
                <ul>
                    <li>ICICI Bank makes no representation about the quality, delivery, or otherwise of the Products offered by the Service Provider or the Dealer. The Products referred to herein are subject to the terms and conditions governing them as specified by ICICI Bank / Service Provider / the Dealer from time to time and are offered at the sole discretion of ICICI Bank / Service Provider / the Dealer.</li>
                    <li>Nothing contained herein shall constitute or be deemed to constitute an advice, invitation or solicitation to purchase any products/ services of ICICI Bank / Service Provider / Dealer.</li>
                </ul>

                <h5 className="policy-heading" id="policy-20">MISCELLANEOUS</h5>
                <ul>
                    <li>The Terms and Conditions may be varied, amended or modified, in whole or in part, by ICICI Bank at any time without notice. The last amended version shall be available on www.icicibank.com at all times.</li>
                    <li>ICICI Bank may assign, transfer and/or novate in whole or in part, any of the rights and benefits or obligations under the Facility to any person (including but not limited to its affiliates), or any other company, for any reason whatsoever. The Borrower(s) shall not assign, transfer or novate in whole or in part, any of its rights and benefits or obligations under the Facility in whole or in part.</li>
                    <li>Notwithstanding any suspension or termination of Facility, all rights and remedies of ICICI Bank as per the Terms and Conditions shall continue to survive until the receipt of the final instalment of the EMI and any other charges in full to the satisfaction of ICICI Bank.</li>
                    <li>ICICI Bank shall be entitled to receive fees from the Dealer, in respect of the Products sold by the Dealer to the Borrower(s), and the Borrower(s) hereby agrees that it has no-objection whatsoever towards payment of any such fees by the Dealer to ICICI Bank.</li>
                    <li>The Borrower(s) acknowledge that agreeing with the Terms and Conditions give rise to a debtorcreditor relationship between such Borrower(s) and ICICI Bank, and there is no service that is being provided by ICICI Bank to such Borrower(s).</li>
                    <li>In compliance with the rule 9B of the Prevention of Money Laundering (Maintenance of Records) Rules, 2005, customer agrees to intimate the Bank within a period of 30 days (from the date of update) in case of any update in KYC documents / information submitted at the time of establishment of business relationship / account-based relationship and thereafter, to enable updation of Bank records</li>
                    <li>The Primary Terms and Conditions shall be in addition to and not in substitution or derogation to the MITC.</li>
                </ul>


                <h5 className="policy-heading" id="policy-21">ANNEXURE</h5>
                <p><strong>CLASSIFICATION AS SPECIAL MENTION ACCOUNT (SMA)  AND NON-PERFORMING ASSET (NPA) </strong></p>
                <p>Lending institution (i.e ICICI Bank) will recognize the incipient stress in loan accounts, immediately on default, by classifying them as SMA.</p>
                <p> The basis of classification of SMA category shall be as follows: </p>
                <img src={Table1} alt="" />
                <p>Non-performing Asset- NPA is a loan or an advance where:</p>
                <ol style={{listStyleType: "lower-alpha"}}>
                    <li>interest and/ or instalment of principal remains overdue for a period of more than 90 days in respect of a term loan.</li>
                </ol>
                <p><strong>Illustrative movement of an account to SMA category to NPA category based on delay /non-payment of dues and subsequent upgradation to standard category at day end process:</strong></p>
                <img src={Table2} alt="" />
                </div>
            </section>

        </div>
    )
}