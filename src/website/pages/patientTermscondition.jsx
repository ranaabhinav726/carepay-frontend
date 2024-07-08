// import './css/privacyPolicy.scss';
import "./css/section.scss";
import "../../App.scss";

import CustomNavbar from "../Components/Navbar";
import { Footer } from "./WebHomepage";
import { useEffect } from "react";

function TermsAndConditions() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="website-container">
            <CustomNavbar />
            <TermsAndConditionsContent />
            <Footer />
        </div>
    );
}

export default TermsAndConditions;

function TermsAndConditionsContent() {
    return (
        <div className="custom-container">
            <h2 style={{ fontFamily: "DM sans" }}>Terms And Conditions</h2>

            <p>
                READ THE FOLLOWING TERMS CAREFULLY! IT CONTAINS VERY IMPORTANT INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS, AS WELL AS LIMITATIONS AND EXCLUSIONS THAT MAY APPLY TO YOU. THIS DOCUMENT CONTAINS A DISPUTE RESOLUTION CLAUSE. BY CLICKING ON THE “ACCEPT” BUTTON, YOU ARE CONSENTING TO BE BOUND BY AND ARE BECOMING A PARTY TO THIS TERMS. IF YOU DO NOT AGREE TO ALL OF THE TERMS OF THIS AGREEMENT, CLICK THE “DO NOT ACCEPT” BUTTON OR LEAVE THE WEBSITE.
            </p>


            <section>
                <div className="left-section">
                    <ul className="outline-point">
                        <li id="outline-1">
                            <a href="#policyP-1">GENERAL TERMS</a>
                        </li>
                        <li id="outline-2">
                            <a href="#policyP-2">SERVICES</a>
                        </li>
                        <li id="outline-3">
                            <a href="#policyP-3">Disclaimers</a>
                        </li>
                        <li id="outline-4">
                            <a href="#policyP-4">ELIGIBILITY OF USERS</a>
                        </li>
                        <li id="outline-5">
                            <a href="#policyP-5">USER’S OBLIGATIONS</a>
                        </li>
                        <li id="outline-6">
                            <a href="#policyP-6">ACTIONS UNDERTAKEN ON YOUR DEVICE</a>
                        </li>
                        <li id="outline-7">
                            <a href="#policyP-7">YOUR USE OF THE WEBSITE</a>
                        </li>
                        <li id="outline-8">
                            <a href="#policyP-8">PROHIBITIONS</a>
                        </li>
                        <li id="outline-9">
                            <a href="#policyP-9">INDEMNITY</a>
                        </li>
                        <li id="outline-10">
                            <a href="#policyP-10">LIMITATION OF LIABILITY</a>
                        </li>
                        <li id="outline-11">
                            <a href="#policyP-11">AMENDMENTS</a>
                        </li>
                        <li id="outline-12">
                            <a href="#policyP-12">EVENTS BEYOND OUR CONTROL (FORCE MAJEURE)</a>
                        </li>
                        <li id="outline-13">
                            <a href="#policyP-13">APPLICABLE LAW AND DISPUTE RESOLUTION</a>
                        </li>

                        <li id="outline-14">
                            <a href="#policyP-14">PRIVACY POLICY</a>
                        </li>
                        <li id="outline-15">
                            <a href="#policyP-15">TERM OF THIS AGREEMENT</a>
                        </li>
                        <li id="outline-16">
                            <a href="#policyP-16">CONTACT INFORMATION OF GRIEVANCE OFFICER</a>
                        </li>

                    </ul>
                </div>
                <div className="right-section">
                    <h5 className="policy-heading" id="policyP-1">
                        GENERAL TERMS
                    </h5>
                    <p>
                        <strong>DEFINITIONS</strong>
                    </p>
                    <ul>
                        <li>
                            <p>Carecoin Technologies Private Limited (“us”, “we”, ‘our’ or “CarePay”) is a company duly incorporated under the Companies Act, 2013, having its registered office at   A-377, Basement, Defence Colony, New Delhi-110024, India, and provides Services (as defined herein below) through a platform named “CarePay” to all individuals accessing and/or using (“you”, “yours”, “User”, or “Customer”). (The website or application of CarePay platform shall be referred to as “Website”).</p>
                        </li>
                        <li>
                            <p>Please carefully go through these terms and conditions (“Terms”) before
                                you decide to access the Website or avail the Services made available on
                                the Website. These Terms shall constitute a legal agreement between you
                                and CarePay in connection with your visit to the Website and your use of the
                                Services (as defined herein below).</p>
                        </li>
                        <li>
                            <p>These Terms define the terms and conditions under which you are allowed
                                to use the Website. If you have any questions about any part of the Terms,
                                feel free to contact us at +91 806 948 9655 or email us at
                                info@carepay.money</p>
                        </li>
                        <li>
                            <p>By accessing the Website to use the Services, you irrevocably accept all the
                                conditions stipulated in this Terms and agree to abide by them. These Terms
                                supersede all previous oral and written terms and conditions (if any)
                                communicated to you relating to your use of the Website to avail the
                                Services. By availing any Service, you signify your acceptance of these
                                Terms.</p>
                        </li>
                        <li>
                            <p>You acknowledge that you will be bound by this Terms for availing any of the
                                Services offered on the Website. If you do not agree with any part of the
                                Terms or do not wish to use the Website, please do not click the “ACCEPT”
                                button below.</p>
                        </li>
                        <li>
                            <p>The Terms are published in compliance of, and is governed by the provisions
                                of Indian law (“Applicable Law”), including but not limited to:</p>
                        </li>
                        <li>
                            <p>the Indian Contract Act, 1872;</p>
                        </li>
                        <li>
                            <p>the (Indian) Information Technology Act, 2000; and</p>
                        </li>
                        <li>
                            <p>the rules, regulations, guidelines and clarifications framed there under,
                                including the (Indian) Information Technology (Reasonable Security
                                Practices and Procedures and Sensitive Personal Information) Rules, 2011
                                (“SPI Rules”), and the (Indian) Information Technology (Intermediaries
                                Guidelines) Rules, 2021 (“IG Rules”)</p>
                        </li>

                    </ul>



                    <h5 className="policy-heading" id="policyP-2">
                        SERVICES
                    </h5>
                    <p>Through the Website, we provide you with the following services
                        <b>(“Services”)</b></p>
                    <b>Facilitation of Credit:</b>
                    <ul>


                        <li>
                            CarePay is a health-tech enabler/tech facilitator that shall through Thumbworks Technologies Private Limited (“FinTech Partner”), facilitate a credit facility that can be availed by you upon scanning the quick response code (“QR Code”) at the  premises of the clinic or hospital (“Medical Service Provider” or “MSP”) against any product or service supplied by such MSP over an amount of INR 900 (Indian Rupees Nine Hundred Only).

                        </li>
                        <li>
                            The terms and conditions of the aforesaid credit facility if availed by you, shall exclusively be governed by the agreement entered between you and such regulated financial entity (“Lender”) that shall be disbursing the credit facility through the FinTech Partner’s platform.

                        </li>
                        <li>It is to be clarified that CarePay, Website and MSP are not providing any credit facility but are merely facilitating the connection between you and the FinTech Partner who shall be responsible for disbursement and collection of the credit facility availed by you through scanning of QR Code.</li>
                        <li>CarePay, Website and MSP shall, in no event, be responsible in any manner whatsoever for any dispute arising out of or in connection with the aforesaid credit facility availed by you from the Lenders or the FinTech Partner through the Website. </li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-3">
                        Disclaimers
                    </h5>

                    <ul>
                        <li>
                            CarePay does not support any FinTech Partner displayed / made available through the Website.

                        </li>
                        <li>
                            CarePay assumes no liability for the actions the Fintech Partner or the Lender using and accessing the User’s personal or sensitive data for the purposes of advancing the credit facility.
                        </li>
                        <li>
                            The Website is a health-tech facilitator used by the FinTech Partner to acquire customers for the purpose of extending credit facility. CarePay or Website are in no manner related to the FinTech Partner, have no co-relation or privity of contract with and are not the agents, employees, contractor, sub-contractor etc., of the FinTech Partner or Lender that shall extend the credit facility directly to you.

                        </li>
                        <li>By using the Website, the User understands and accepts that CarePay does not endorse, promote or advertise any services provided by the FinTech Partner and shall in no event be liable to you or anyone else for any decision made or action taken by you in reliance of the information received by you from the Fintech Partner or the Lender using the Website</li>
                        <li>Any disputes arising out of or in connection to the use of the Website or Services shall be governed by Clause 13. The exclusive jurisdiction and venue for actions and disputes shall be the courts located in Delhi.
                        </li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-4">
                        ELIGIBILITY OF USERS

                    </h5>
                    <ul>
                        <li>
                            When you use the Website, you represent that you meet the following primary eligibility criteria:

                        </li>
                        <li>
                            You are at least 18 (eighteen) years old or accessing the Website under the supervision of a parent or guardian, who in such a case will be deemed as the User of the Services (as defined in these Terms) for the purpose of these Terms.

                        </li>
                        <li>You are legally competent to contract, and otherwise competent to receive the Services (as defined in these Terms). Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including un-discharged insolvents etc. shall not eligible to use the Website. </li>
                        <li>You have not been previously suspended or removed by CarePay or any other CarePay group entity or its affiliates or disqualified for any other reason, from availing the Services.
                        </li>
                        <li>CarePay reserves the right to refuse to provide you with access to the Website for availing the Services if CarePay discovers that you are under the age of 18 years or in any way disqualified under Indian Contract Act, 1872.
                        </li>

                    </ul>



                    <h5 className="policy-heading" id="policyP-5">
                        USER’S OBLIGATIONS

                    </h5>
                    <p>The User undertakes to fulfil the following obligations. Failure to satisfy any of these obligations gives us the right to permanently suspend your account and/or claim damages for any losses that accrue to Us or additional costs that may be imposed on us.
                    </p>
                    <ul>
                        <li>
                            You hereby undertake:

                        </li>
                        <li>
                            To not cut, copy, distribute, modify, recreate, reverse engineer, distribute, post, publish or create derivative works from, transfer, or sell any information or software obtained from CarePay or Website. For the removal of doubt, it is clarified that unlimited or wholesale reproduction, copying of the content for commercial or non-commercial purposes and unwarranted modification of data and information/content without prior written permission of Website or CarePay is prohibited.

                        </li>
                        <li>To not access (or attempt to access) the Website and/or the materials or Services by any means other than through the interface that is provided by the Website. The use of deep-link, robot, spider or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Website, or in any way reproduce or circumvent the navigational structure or presentation of the Website, materials or any content, to obtain or attempt to obtain any materials, documents or information through any means not specifically made available through the Website or without prior written consent of CarePay is prohibited. </li>
                        <li>By accessing or using the Website or Services, you may be exposed to content from third parties that You may consider offensive, indecent or otherwise objectionable. We disclaim all liabilities arising in relation to such offensive content on the Website. Further, you may report such offensive content.
                        </li>
                        <li>To not use the Website in any manner that may impair, overburden, damage, disable or otherwise compromise Website’s services or has in any way adverse impact on CarePay or Website. </li>
                        <li>To not use the Website or its contents to further any unlawful purposes or to conduct any unlawful activity, including, but not limited to, fraud, embezzlement, money laundering or identity theft.
                        </li>
                        <li>To not engage in any activity that interferes with or disrupts access to the Website or the Services (or the servers and networks which are connected to the Website).</li>
                        <li>To not probe, scan or test the vulnerability of the Website or any network connected to the Website, nor breach the security or authentication measures on the Website or any network connected to the Website. You may not reverse look-up, trace or seek to trace any information, or exploit the Website or Service or information made available or offered by or through the Website, in any way whether or not the purpose is to reveal any information, including but not limited to personal identification information, other than your own information, as provided to the Website.</li>
                        <li>To not disrupt or interfere with the security of, or otherwise cause harm to, the Website, systems resources, servers or networks connected to or accessible through the Website or any affiliated or linked applications.</li>
                        <li>To not violate any applicable laws or regulations for the time being in force within or outside India.</li>
                        <li>To not violate any code of conduct or other guidelines, which may be applicable for or to any particular Service.</li>
                        <li>To give right to Financial partner to disburse the loan amount to the MSP on your behalf.</li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-6">
                        ACTIONS UNDERTAKEN ON YOUR DEVICE:

                    </h5>
                    <ul>
                        <li>
                            Upon accessing and / or using the Website, you grant the following permissions to the Website to perform the following actions on the device you have accessed the Website in:
                        </li>
                        <li>
                            To access information about networks, access networks including Wi-Fi networks, receive and send data through the network.

                        </li>
                        <li>
                            To determine your approximate location from sources like, but not limited to mobile towers and connected Wi-Fi networks.

                        </li>
                        <li>To determine your exact location from sources such as, but not limited to GPS.
                        </li>
                        <li>To access the model number, IMEI number and details about the operating system of the device the Website has been accessed on.</li>
                        <li>To retrieve information about other applications running on the device the Website has been accessed on and open them.</li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-7">
                        YOUR USE OF THE WEBSITE

                    </h5>

                    <p>
                        As a User of Services, when you use the Website, you agree to the following conditions of use:
                    </p>
                    <p><b>Due diligence conditions:</b></p>
                    <ul>
                        <li>You understand that for availing services provided by the Fintech Partner and/or Lender, you shall solely be responsible for providing any information including sensitive personal data and personal information you provide to the Fintech Partner and / or the Lender, and that you shall use your discretion in providing such information.
                        </li>
                        <li>The services provided by the FinTech Partner shall depend upon the information you provide to the FinTech Partner on its platform/ website. </li>
                        <li>You shall be solely responsible for all access to and use of this Website by anyone using  your device whether or not such access to and use of this Website is actually authorized by you, including without limitation, all communications and transmissions and all obligations (including, without limitation, financial obligations) incurred through such access or usage.</li>
                        <li>The information provided by you may be used by us for the purpose of Services including analysis, research, training and disclosure (where required) to our affiliates, the Fintech Partner, group companies, agents and government authorities, etc., in accordance with the provisions of the Applicable Laws including data protection laws.
                        </li>
                        <li>We reserve the right to refuse Service, if we believe that you have violated or are likely to violate Applicable Law or these Terms.
                        </li>
                    </ul>

                    {/* <h5 className="policy-heading" id="policyP-8">
                        Scope of Services:

                    </h5> */}
                    <b></b>
                    <ul>
                        <li>
                            The services availed by you from the FinTech Partner via the Website are an arrangement between you and the FinTech Partner. The Website only facilitates connections between you and the FinTech Partner and bears no responsibility for the outcome of any such services obtained by you.
                        </li>
                        <li>
                            CarePay shall not be liable for deficiency or shortfall in services provided by the FinTech Partner faulty judgment / interpretation error / perception error / adverse events under any condition or circumstances.
                        </li>
                        <li>
                            CarePay only facilitates the connections between you and the Fintech Partner established through the Website and does not in any way facilitate, encourage, permit or require you to contact the Fintech Partner outside the Website. CarePay shall not be liable for any contact between you and the FinTech Partner through any way other than through the use of the Website.
                        </li>
                        <li>
                            If you are redirected to, or visit, any other website or application from the Website, including for the purposes of browsing, or when the placement and / or fulfilment of an order of Service (or any other aspect related thereto) takes you to a different website/platform, CarePay shall not be responsible for services received or purchased by you on such other website or platform, or any aspect of your experience on such website or any representations and details provided on such website/platform concerning products/services being advertised or displayed or sold by such website/platform.

                        </li>
                        <li>
                            You may view and access the content available on the Website solely for the purposes of availing the Services, and only as per these Terms. You shall not modify any content on the Website or reproduce, display, publicly perform, distribute, or otherwise use such content in any way for any public or commercial purpose or for personal gain.
                        </li>

                    </ul>

                    <h5 className="policy-heading" id="policyP-8">
                        PROHIBITIONS
                    </h5>

                    <ul>
                        <li>
                            You may not reproduce, distribute, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, decompile or otherwise exploit the Website or any portion of it unless expressly permitted by CarePay in writing.

                        </li>
                        <li>
                            You may not make any commercial use of any of the information provided on the Website.

                        </li>
                        <li>
                            You may not impersonate any person or entity, or falsely state or otherwise misrepresent your identity, age or affiliation with any person or entity.

                        </li>
                        <li>
                            You may not assign, transfer, or sub-contract any of your rights or obligations under these Terms or any related order for Services to any third party, unless agreed upon in writing by CarePay.

                        </li>

                    </ul>


                    <h5 className="policy-heading" id="policyP-9">
                        INDEMNITY
                    </h5>
                    <ul>
                        <li>
                            You agree and undertake to indemnify and keep indemnified CarePay and its affiliates (“Indemnified Persons”) for any losses, costs, charges and expenses including reasonable attorney fees that the concerned Indemnified Persons may suffer on account of:

                        </li>
                        <li>
                            deficiency or shortfall in Services / faulty judgment / interpretation errors / perception error arising from:
                            <ul>
                                <li>your failure to provide correct and / or complete information / history about the patient in timely and clinically appropriate manner; or
                                </li>
                                <li>suppression of material facts, misrepresentation or your failure to provide relevant information about the User.</li>
                            </ul>
                        </li>
                        <li>
                            incorrect or inaccurate credit / debit card / UPI / wallet or any other relevant details provided by you.

                        </li>
                        <li>
                            using a credit / debit card/ UPI / wallet which is not lawfully owned by you.

                        </li>
                        <li>
                            incorrect or inaccurate details pertaining to your identity
                        </li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-10">
                        LIMITATION OF LIABILITY

                    </h5>


                    <ul>
                        <li>
                            By using our Services, you confirm that you understand and agree to the following:
                        </li>
                        <li>
                            The Services availed by you from the FinTech Partner via the Website are provided to you by the FinTech Partner, and not by CarePay

                        </li>
                        <li>
                            The Website only facilitates communications between you and the FinTech Partner and as such CarePay bears no responsibility for the quality and outcome of any such services obtained by you from the respective FinTech Partner, to the extent permitted by Applicable Law.

                        </li>
                        <li>
                            CarePay itself does not provide any financial or credit advancement services and only acts as a facilitator between you and the FinTech Partner. If you receive or avail any service from the Fintech Partner, you are solely responsible for any consequences arising from you availing the services provided by the Fintech Partner.
                        </li>
                        <li>
                            CarePay does not market or promote any services to you by Fintech Partner and/or Lender, and shall be governed by the terms of loan agreement entered between you and the Fintech Partner and/or the Lender (“Loan Agreement”). It shall be your responsibility for undertaking an assessment regarding the suitability of such services and such Fintech Partner for your purposes by reading the Loan Agreement carefully.
                        </li>
                        <li>
                            Marketing or promotion of Services should be considered as being for informational purposes only, and does not constitute expert advice on the suitability of such services for your specific financial needs.
                        </li>
                        <li>
                            If the Website contains links to other sites and resources provided by third parties including the Fintech Partner (including where our social media sharing plug-ins include links to third party sites), these links are provided for your information only. CarePay is neither marketing, guaranteeing nor making any representation with respect to the goods or services made available or sold by such third party. CarePay does not provide any warranty or recommendation in relation to the products and/or services made available to you by such third parties including the Fintech Partner during your access or use of such third-party website/platform including in relation to delivery, services, suitability, merchantability, reliability, availability or quality of the products and/or services. CarePay is not a party to any contractual arrangements entered into between you and the third-party website/platform including the website/platform of the Fintech Partner. We are not the agent of the third party or the FinTech Partner and such third-party website/platform is governed exclusively by its respective policies over which CarePay has no control.
                        </li>
                        <li>You shall not hold CarePay, its group entities, affiliates, or their respective directors, officers, employees, agents and/or vendors responsible or liable for any actions, claims, demands, losses, damages, personal injury, costs, charges and expenses which you claim to have suffered, sustained or incurred, or claim to suffer, sustain or incur, directly or indirectly, on account of your use or access of any third-party website/platform including but not limited to the FinTech Partner’s website/platform.
                        </li>
                        <li>To the extent permitted by Applicable Law, CarePay or its affiliates shall not be liable to you for any special, indirect, incidental, consequential, punitive, reliance, or exemplary damages arising out of or relating to:
                            <ul><li>these Terms; </li>
                                <li>your use or inability to use the Website;
                                </li>
                                <li>your use of any third-party services including services provided by the Fintech Partner through the Website.
                                </li>
                            </ul>
                        </li>

                    </ul>
                    <p>
                        This section shall survive the termination of these Terms and the termination of your use of our Services or the Website.
                    </p>

                    <h5 className="policy-heading" id="policyP-11">
                        AMENDMENTS
                    </h5>
                    <p>
                        We reserve the right to modify or terminate any portion of the Terms for any reason and at any time, and you shall read the Terms at regular intervals to keep yourself informed of any such modifications. Your use of the Website following any such modification constitutes your agreement to follow and be bound by the Terms so modified.

                    </p>

                    <b> REFUNDS AND CANCELLATION</b>
                    <p>In the event that the refund and cancellation policy has been separately communicated in writing by the Medical Service Provider (MSP) to the patient, such policy shall prevail. Absent a separate agreement, the following policy shall apply:
                    </p>
                    <ul>
                        <li>
                            (a) The patient must notify the MSP and the Company in writing within seven (7) days of the treatment if they are dissatisfied with the outcome of the treatment or if the treatment was not provided.
                            (b) If the MSP resolves the dispute within this period, the patient shall not be eligible for a refund.
                            (c ) If the dispute is not resolved within seven (7) days of the notice, the MSP shall be liable for a partial or full refund of the loan amount.
                            (d) Failure to provide notice within seven (7) days renders the patient ineligible for a refund.

                        </li>
                        <li>
                            (a) The patient must notify the MSP and the Company in writing within two (2) days of the disbursement if there is a dispute regarding the invoice, the terms and conditions of the loan facility, or if the patient was unaware of the loan facility.
                            (b) If the MSP resolves the dispute, the patient shall not be eligible for a refund.
                            (c ) If the dispute is not resolved within seven (7) days of the notice, the MSP shall be liable for a partial or full refund of the loan amount.

                        </li>
                    </ul>


                    <h5 className="policy-heading" id="policyP-12">
                        EVENTS BEYOND OUR CONTROL (FORCE MAJEURE)
                    </h5>
                    <ul>
                        <li>We shall not be liable for any non-compliance or delay in compliance with any of the obligations we assume under any contract when caused by events that are beyond our reasonable control (“Force Majeure”). Force Majeure shall include any act, event, failure to exercise, omission or accident that is beyond our reasonable control, including, among others, the following:
                        </li>
                        <li>Strike, lockout or other forms of protest;</li>
                        <li>Civil unrest, revolt, invasion, terrorist attack or terrorist threat, war (declared or not) or threat or preparation for war;
                        </li>
                        <li>Fire, explosion, storm, flood, earthquake, collapse, epidemic, pandemic, or any other natural disaster;
                        </li>
                        <li>Inability to use public or private transportation and telecommunication systems;
                        </li>
                        <li>Acts, decrees, legislation, regulations or restrictions of any government or public authority including any judicial determination; and
                        </li>
                        <li>Our obligations deriving from any contracts shall be considered suspended during the period in which Force Majeure remains in effect and we shall be given an extension of the period to fulfil these obligations by an amount of time we shall communicate to you, not being less than the time that the situation of Force Majeure subsisted.
                        </li>

                    </ul>

                    <h5 className="policy-heading" id="policyP-13">
                        APPLICABLE LAW AND DISPUTE RESOLUTION

                    </h5>

                    <ul>
                        <li>You agree that this Agreement and any contractual obligation between CarePay and User shall be governed by the laws of India and that CarePay retains the right to legally proceed against you for breach of any clause of this agreement including but not limited to Clause 5 and Clause 8 of this Agreement.
                        </li>
                        <li>Any dispute, claim or controversy arising out of or relating to this Terms, including the determination of the scope or applicability of the Terms, or your use of the Website or the Services or information to which it gives access, shall be determined by arbitration in India, before a sole arbitrator appointed by CarePay. Arbitration shall be conducted in accordance with the Arbitration and Conciliation Act, 1996. The seat of such arbitration shall be at New Delhi. All proceedings of such arbitration, including, without limitation, any awards, shall be in the English language. The award shall be final and binding on the parties to the dispute.
                        </li>
                        <li>Subject to the above Clause 13.2, the courts at New Delhi shall have exclusive jurisdiction over any disputes arising out of or in relation to this Agreement, your use of the Website or the Services or the information to which it gives access.
                        </li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-14">
                        PRIVACY POLICY
                    </h5>
                    <p>
                        CarePay, the creator of this Privacy Policy ensures its commitment to Your privacy with regard to the protection of your information. This privacy policy contains information about Website and CarePay. In order to provide You with uninterrupted use of our services, we may collect and, in some circumstances, disclose information about you to third party. Such information may be classified as personal information under the purview of the SPI Rules.

                    </p>
                    <b>Overview</b>
                    <p>
                        In order to use the services of this Website, you are required to register yourself by verifying the authorised device. This Privacy Policy applies to your information that we collect and receive on and through Website; it does not apply to practices of businesses that we do not own or control or people we do not employ or are not in control of.

                    </p>
                    <p>
                        By using this Website, you agree to the terms of this Privacy Policy. Please read the following Privacy Policy to understand how your personal information will be treated as you use this Website and its Services. The following discloses our information gathering and dissemination practices.

                    </p>

                    <p>Effect of termination:</p>
                    <ul>
                        <li>
                            The MSP shall take all necessary steps to discontinue the
                            integration of the Company Website on the Platform.
                        </li>
                        <li>
                            The MSP shall immediately irretrievably destroy (or return) all
                            copies of the Confidential Information.
                        </li>
                        <li>
                            All rights and liabilities accrued to the Parties prior to the
                            termination shall not be affected on account of the termination of
                            this Agreement.
                        </li>
                    </ul>

                    <h5 className="policy-heading" id="policyP-17">
                        Information Collected
                    </h5>
                    <ul>
                        <li>We may collect the following information:</li>
                        <ul>
                            <li>Personal data of the User such as, but not limited to, Your name, Your age, date of birth, occupation and gender;
                            </li>
                            <li>The User’s e-mail and contact information, GPS based location;</li>
                            <li>The User’s tracking information such as, but not limited to the device ID, Google Advertising ID and Android ID; and
                            </li>
                            <li>The User’s data sent across through the Website.</li>
                        </ul>
                        <li>The Information specified above and collected by us may be classified as ‘personal information’ or ‘sensitive information’ under the SPI Rules. Collection of information which has been designated as ‘sensitive personal data or information’ under the SPI Rules requires your express consent. By affirming your assent to these Terms and Privacy Policy, you provide your consent to such collection as required under Applicable Law. Our Services may be unavailable to you in the event such consent through is not given.
                        </li>
                        <b>External Links on The Application</b>
                        <li>The Website may include offers from our vendors, advertisements, hyperlinks to other websites, applications, content or resources. We have no control over such external links present in the Website, which are provided by persons or companies other than us.
                        </li>
                        <li>You acknowledge and agree that CarePay shall not be responsible for any collection or disclosure of your personal information by any external sites, applications, companies or persons not controlled by us, nor do we endorse any advertising, products or other material on or available from such external application, websites or resources.
                        </li>
                        <li>You further acknowledge and agree that we are not liable for any loss or damage which may be incurred by you as a result of the collection and/or disclosure of your personal information by external applications, sites or resources, or as a result of any reliance placed by you on the completeness, accuracy or existence of any advertising, products or other materials on, or available from such applications, websites or resources. These external applications, websites and resource providers may have their own privacy policies governing the collection, storage, retention and disclosure of your personal information that you may be subject to. We recommend that you enter the external application or website and review their privacy policy before engaging with them.
                        </li>
                        <li>We may allow third parties/individuals to display advertisements when you use the Website.
                        </li>
                        <b>Our Use of Your Information</b>
                        <li>The information provided by you shall be used to contact you when necessary and provide Services to you. We use your tracking information to help identify you and to gather broad demographic information. The information is also used to customise your experience of using Website.</li>
                        <li>We may release your personal information to a third-party in order comply with a court order or other similar legal procedure, or when we believe in good faith that such disclosure is necessary to comply with the Applicable Law; prevent imminent physical harm or financial loss; or investigate or take action regarding illegal activities, suspected fraud, or violation of Terms. In case we are acquired by or merged with another company, we shall transfer information disclosed by you and information about you to the company we are acquired by or merge with.
                        </li>
                        <b>Disclosure of Your Information to Third Parties</b>
                        <li>When you use our Website, we must provide some of your personal information to third parties to give you better Services and for enhancement and visibility of our Website. However, we do not sell or rent individual customer names or other personal information to third parties except sharing of such information with our alliance partners or vendors who are engaged by us for providing various promotional and other benefits to our customers from time to time.</li>
                        <li>As per the existing regulatory environment, we declare that we are in compliance with the Applicable Law on privacy and storage and processing of information provided by you, however cannot ensure that all of your information shall never be disclosed in ways other than those described in this Privacy Policy. Under certain circumstances, third parties may unlawfully intercept or access transmission or private communications, or abuse or misuse your personal information that they may collect or obtain from our Website and we shall not be responsible for any such misuse. </li>
                        <ul>
                            <li>We may share our data, including your personal information, with our parent and/or subsidiaries that are committed to serving your needs through use of our Website and related services.
                            </li>
                            <li>We cooperate with law enforcement inquiries, as well as other third parties to enforce laws, such as: intellectual property rights, fraud and other rights. We can, and you so authorise us, disclose your personal information to law enforcement and other government officials as we, in our sole discretion, believe necessary or appropriate, in connection with an investigation of fraud, intellectual property infringements, or other activity that is illegal or may expose us/ us or you to any legal liability.</li>
                            <li>We gather up data such as personally identifiable information and disclose such information in a non-personally identifiable manner to advertisers and other third parties for other marketing and promotional purposes. However, in these situations, we do not disclose to these entities any information that could be used to identify you personally. We may use third-party advertising companies to serve advertisement on our behalf. These companies may employ cookies and action tags (also known as single pixel gifs or web beacons) to measure advertising effectiveness. Any information that these third parties collect via cookies and action tags is completely anonymous.</li>
                        </ul>
                    </ul>
                    {/* <b>TERM OF THIS AGREEMENT</b>
                     */}
                    <h5 className="policy-heading" id="policyP-15">
                    TERM OF THIS AGREEMENT
                    </h5>
                    <p>This Agreement shall remain in force till the completion of Services as being availed by you and provided by CarePay through the Fintech Partner.
                    </p>
                    <h5 className="policy-heading" id="policyP-16">
                    CONTACT INFORMATION OF GRIEVANCE OFFICER
</h5>
                    {/* <b>CONTACT INFORMATION OF GRIEVANCE OFFICER</b> */}


                    <p>
                        If a User has any questions concerning CarePay, the Website, this Terms, the Services, or anything related to any of the foregoing, CarePay customer support can be reached at the following email address: info@carepay.money or via the contact information available from the following hyperlink: www.carepay.money.

                    </p>

                    <p>
                        In accordance with the Information Technology Act, 2000, and the rules made there under, if you have any grievance with respect to the Website or the Services, including any discrepancies and grievances with respect to processing of information, you can contact our Grievance Officer at:

                    </p>
                    <p>Name: CarePay</p>
                    <p>Phone No.: +91 806 948 9655</p>
                    <p>Email: info@carepay.money
                    </p>
                    <p>By pressing the “ACCEPT” button below and / or using this Website, you hereby agree to be bound by the Terms / Service, Privacy Policy, and other Policies as set forth on the Website </p>
                </div>
            </section>
        </div>
    );
}
