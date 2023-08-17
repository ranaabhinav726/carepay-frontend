
import Header from "../../compponents/Header";
import Footer from "../../compponents/Footer";
import { useEffect } from "react";

function PrivacyPolicy(){


    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    return(
        <div className="privacyPolicy">
            <Header  />
            <PrivacyPolicyContent />
            <Footer />
        </div>
    )
}

export default PrivacyPolicy


function PrivacyPolicyContent(){

    return(
        <div className="custom-container">
            <h2>CarePay Privacy Policy</h2>
            <h5>Updated on: 16th August 2023</h5>

            <p>CarePay (Carecoin Technologies Private Limited) (hereinafter referred to as “ Company or We or CarePay”) is a technology company, focused on building and facilitating products and services in the financial domain for our customers (hereinafter referred to as “Customer/You/Your/User”, plurals included).</p>
            <p>When using any asset of the company, including but not limited to the website, mobile applications, social media platforms, etc., the company is extremely sensitive to the privacy, rights, confidentiality, and security of personal information of users that are shared with or obtained by the company during the course of use.</p>
            <p>Regarding data collection, storage, and usage, the company is committed to offering all of its users a safe, open, and legal framework.</p>
            <p>This Privacy and Data Security Policy (hereinafter referred to as "Privacy Policy") sets forth in detail how CarePay obtains, stores, and manages customer specific information from its users via the use of its website (www.carepay.in), various CarePay mobile applications available at Android/iOS platforms, and Social media platforms including but not limited to Facebook, Instagram, LinkedIn, Twitter, Pinterest, etc. The term "CarePay Platform" will be used to refer to all of the aforementioned things.</p>

            <p>All users, past and present, of the CarePay platform are subject to this Privacy Policy.</p>

            <p>All users consent to unequivocally accept this Privacy Policy when you visit the CarePay Platform, sign up for, access, or use our products, services, content, features, technologies or functions offered on our CarePay Platform and all related sites, applications, and services (collectively referred to as “CarePay Services”). Any feature or process in relation to customer engagement shall be deemed to be governed by this Privacy policy unless otherwise explicitly excluded by the Company.</p>

            <section>
                <div className="left-section">
                   
                    <ul className="outline-point">
                        <li id="outline-1"><a href="#policy-1">Policy details and applicability</a></li>
                        <li id="outline-2"><a href="#policy-2">Information Collected</a></li>
                        <li id="outline-3"><a href="#policy-3">Device Information</a></li>
                        <li id="outline-4"><a href="#policy-4">Report on credit information :</a></li>
                        <li id="outline-5"><a href="#policy-5">Other information</a></li>
                        <li id="outline-6"><a href="#policy-6">Consent</a></li>
                        <li id="outline-7"><a href="#policy-7">Uses and objectives of data collection</a></li>
                        <li id="outline-8"><a href="#policy-8">We may use your personal information to:</a></li>
                        <li id="outline-9"><a href="#policy-9">Security Framework for Data</a></li>
                        <li id="outline-10"><a href="#policy-10">Restrictions on the use of personal data</a></li>
                        <li id="outline-11"><a href="#policy-11">Other unaffiliated third parties, for the following purposes:</a></li>
                        <li id="outline-12"><a href="#policy-12">Cookies Policy</a></li>
                        <li id="outline-13"><a href="#policy-13">Data Retention</a></li>
                        <li id="outline-14"><a href="#policy-14">Updating personal information</a></li>
                        <li id="outline-15"><a href="#policy-15">Obligation with respect to other platforms</a></li>
                        <li id="outline-16"><a href="#policy-16">Grievance Redressal</a></li>
                        
                    </ul>
                </div>
                <div className="right-section">
                <h5 className="policy-heading" id="policy-1">Policy details and applicability</h5>
                <p>This Privacy Policy applies to the personal information of individual or group of individuals which means any and all information/ documents/ details pertaining to a natural person or group of persons, such information may either directly or indirectly or in combination with other information available with CarePay, may be used to identify such a person or group.</p>
                <p>Except as otherwise stated, the use of any and all CarePay services by our customers, including both personal and commercial usage, shall be governed by this privacy statement.</p>
                <p>This privacy statement may at any moment be unilaterally changed by the company by publishing an updated version on the CarePay Platform. Consumers are strongly encouraged to examine the policy before using any CarePay platforms and on an ongoing basis going forward. The Company may additionally publish special alerts for customers in the event of a substantial change. The business disclaims all liability for any misunderstandings that result from a user's disregard for the current Privacy Policy</p>

                <h5 className="policy-heading" id="policy-2">Information Collected</h5>
                <p>To give you a smooth and simple user experience, we may gather any or all of the personal information listed below.</p>

                <h5 className="policy-heading" id="policy-3">Device Information</h5>
                <p>We could gather data from your laptop, smartphone, tablet, or any other device you use to access the CarePay platform. The types of information we may collect from you include, but are not limited to: your IP address, browsing data, device ID or unique identifier, device type, geo-location information, computer and internet information, mobile network information, statistics on page views, referral URL, advertisement data, web log data and other information of a similar nature, Calendar information, etc.</p>
                <p>We may also use web beacons and cookies to gather anonymous information. When you fill out web forms, update account information, engage in social media conversations, community/CarePay online chats, or otherwise communicate with us with CarePay Services through any channel, we may collect and keep any information you provide us or consent to share with us.</p>

                <h5 className="policy-heading" id="policy-4">Report on credit information :</h5>
                <p>With your permission and in accordance with the current regulatory framework to access such information, we may get your credit information (credit score and credit information report) from your credit records with Credit Information Companies ("CICs"). Only once you agree to name CarePay as your legally and voluntarily chosen authorised agent or representative for collecting your credit information from CICs may CarePay get this information from one or more CICs for and on your behalf. By allowing CarePay to use and get your credit information report, you accept that CarePay and CICs may depend on the permission and consent you have given to CarePay.</p>

                <h5 className="policy-heading" id="policy-5">Other information</h5>
                <p>When you use CarePay platform, we may also collect information about your transactions and your activities including but not limited to:</p>
                <ul>
                    <li>Contact information including your name, address, phone, email, and other similar information</li>
                    <li>Specific personal identification information such as your date of birth or national ID number.</li>
                    <li>Address proof, Officially Valid documents, Income proof, PAN, credit score, credit information report, e-KYC through UIDAI, CKYC through CERSAI etc.</li>
                    <li>Financial information, such as the full bank account numbers that you link to your CarePay account or give us access to while you use CarePay Services.</li>
                </ul>
                <p>We may also obtain information about you from other sources, including correspondence with us, interactions with employees or representatives of CarePay or other businesses (subject to their privacy policies and applicable law), your contact list on CarePay, and information from other accounts we have reason to believe you are in control of (whether in part or in whole).</p>
                <p>Additionally, CarePay reserves the right to listen in on or record any and all of your communications with the CarePay platform, any CarePay employee, or any CarePay agent. Additionally, by contacting CarePay, you consent to the possibility of your communication being overheard, watched, or recorded without your knowledge or consent.</p>
                <p>After obtaining the User’s specific consent to allow the CarePay platform to access the User’s SMS inbox, we may collect relevant information from text messages (SMS) received by the Users from providers of services and/or products (including but not limited to retail outlets, financial institutions, mobile carriers, websites, ecommerce companies, any merchant and all utility companies), that will enable us to provide better access to financial products and services , managing your expenditure by providing insights and other products to the Users. We shall only access business messages and will never intrude in your personal messages.</p>
                <p>To spot any harmful software or behaviour, we may also frequently analyse your computer, smartphone, or other access device. The user won't be charged any further fees for this.</p>
                <p>We may obtain information about your location and your mobile device, including a unique identifier for your device, when you download or use our mobile applications or access one of our mobile-optimized sites. We could make use of this data to deliver you location-based services like advertisements, search results, and other tailored content. Most mobile devices have settings menus where you may manage or turn off location services.</p>

                <h5 className="policy-heading" id="policy-6">Consent</h5>
                <p>By using any of CarePay platforms, you expressly consent to CarePay and including all its marketing channels and business partners, representatives to provide the details/documents/information mentioned hereinabove for the purpose stated under this Privacy Policy.</p>
                <p>Additionally, you expressly agree that CarePay (along with its marketing channels, business partners, and representatives) may contact you via SMS, call, WhatsApp, email, or any other appropriate communication platform in order to follow up on the services offered by or through the CarePay Platform, to impart product knowledge, to offer promotional offers through the CarePay Platform, and to provide you with a variety of other offers made by its business partners.</p>
                <p>You hereby give us your express permission to disclose your personal information with third parties, such as banks, credit reporting agencies, governmental entities, or any other organisation required by law, in order to provide the services you have requested.</p>
                <p>You hereby grant your unambiguous, free and unequivocal consent to authorize and appoint CarePay to request and obtain, collect, receive and/or fetch your credit score and/ or a copy of your credit information report from CIC, for and on your behalf;</p>


                <h5 className="policy-heading" id="policy-7">Uses and objectives of data collection</h5>
                <p>The major goal of the Company's collection of any or all of the aforementioned personal information is to give you a safe, easy, effective, clever, and individualised experience while using CarePay products or goods and services that CarePay facilitates through its partners.</p>


                <h5 className="policy-heading" id="policy-8">We may use your personal information to:</h5>
                <ul>
                    <li>Provide you with access to CarePay services and customer support, handle transactions and deliver alerts about them, and authenticate your identity throughout the account setup and password reset processes.</li>
                    <li>Manage and safeguard our IT infrastructure; give promotional offers depending on your communication choices; target marketing and advertising; and provide service update reminders. reach you at any phone number, either by making a voice call, text (SMS), email, WhatsApp, or automated dialling; Check for solvency and creditworthiness, compare the correctness of the information, and confirm it with the appropriate third parties.</li>
                    <li>Manage risk, or to detect, prevent, and/or remediate fraud or other potentially prohibited or illegal activities; detect, prevent or remediate violations of policies or applicable user agreements; improve the CarePay Services by customizing your user experience; measure the performance of the CarePay Services and improve their content and layout;</li>
                </ul>

                <p>We may also use the User information to enable activities and transactions that need to occur during the process of lending, such as:</p>

                <ul>
                    <li>Establishing and keeping up user accounts on the app.</li>
                    <li>Offer personalised features.</li>
                    <li>Assisting you in choosing the ideal financial product</li>
                    <li>Facilitating platform transactions</li>
                    <li>Keeping in constant contact with the User regarding any transactions the User initiates, such as payments, transfers of funds, requests for information or help, etc.</li>
                    <li>Periodically making changes to the App to reflect user preferences.</li>
                    <li>Efficiently providing the App and all of its features and functionality.</li>
                    <li>Preserve social history in accordance with prevailing legislation or policy.</li>
                    <li>Preventing the user from having to enter previously entered data again</li>
                </ul>

                <h5 className="policy-heading" id="policy-9">Security Framework for Data</h5>
                <p>Information that may be linked to a particular person or group of people and used to identify that person or group is referred to as personal information. Information that has been rendered anonymous so that it cannot be used to identify a specific user is not regarded as personal information for the purposes of using CarePay.</p>
                <p>On our computers and/or cloud infrastructure, situated at our premises, we store and process your personal data. By implementing physical, technological, and administrative security measures, we are dedicated to minimising the risks of loss, misuse, unauthorised access, disclosure, and alteration. Firewalls, data encryption, physical access restrictions for our data centres, and information access authorisation controls are a few of the security measures we employ. We have made sure that CarePay's implementation of acceptable security methods complies with all applicable laws and is on par with fair industry norms.</p>
                

                <h5 className="policy-heading" id="policy-10">Restrictions on the use of personal data</h5>
                <p>We may share your Personal information with our affiliates and business partners where we feel that you will be assisted better for the purpose of availing the CarePay Services. We may share your personal information with:</p>

                <ul>
                    <li>Financial institutions like Banks, NBFCs, Insurance Companies, Asset Management companies and others who we may partner with to jointly create and offer any product or service. These financial institutions may only use this information to market CarePay-related products, unless you have given consent for other services</li>
                    <li>Users of CarePay, members of the CarePay corporate family, affiliates, group companies , to provide joint content, products, and services (such as registration, transactions and customer support), to help detect and prevent potentially illegal acts and violations of our policies, and to guide decisions about their products, services, and communications. Members of our corporate family will use this information to send you marketing communications only if you have requested their services.</li>
                    <li>Credit bureaus and collection agencies to report account information, as permitted by law.</li>
                    <li>Banking partners as required by credit card association rules for inclusion on their list of terminated merchants (in the event that you meet their criteria which includes having CarePay close your CarePay account due to your breach of CarePay’s User Agreement).</li>
                    <li>Companies that we may plan to forge a Joint Venture with or are acquired by.</li>
                    <li>Law enforcement entities, personnel, government officials, or other third parties pursuant to a summon, court order, or other legal process or requirement applicable to CarePay or one of its affiliates; when we need to do so to comply with law or debit/ credit card rules; or when we believe, in our sole discretion, that the disclosure of personal information is necessary to prevent physical harm or financial loss, to report suspected illegal activity or to investigate violations of our User Agreement.</li>
                </ul>

                <h5 className="policy-heading" id="policy-11">Other unaffiliated third parties, for the following purposes:</h5>
                <ul>
                    <li>Fraud prevention and risk management: to identify, evaluate, and manage risks or assist prevent fraud. To safeguard your account from fraudulent behaviour, notify you if we notice such activity on your accounts, or assess credit risk, for instance, if you use the CarePay Services to purchase or sell things, we could exchange account information.</li>
                    <li>We may also disclose required account information in situations when CarePay has set a hold or other restriction on your Account due to disputes, claims, chargebacks, or other circumstances involving the sale or purchase of products as part of our efforts to prevent fraud and manage risk. In order for them to run their systems for assessing buyers or sellers, we may also disclose account information as part of our efforts to prevent fraud and manage risk.</li>
                    <li>For customer service objectives, such as to assist in handling your accounts or resolving conflicts (e.g., billing, or transactional).</li>
                    <li>Legal Compliance: To assist them in adhering to the criteria for anti-money laundering and counter-terrorist funding verification.</li>
                    <li>Service Providers: To make it possible for service providers with whom we have contracts to assist the operations of our business. According to the terms of our contracts, these service providers may only use your information in connection with providing services to us and not for other purposes.</li>
                    <li>On a case-by-case basis, if judged suitable by our operational framework or by relevant legislation, we may additionally obtain the required express consent.</li>
                </ul>

                <h5 className="policy-heading" id="policy-12">Cookies Policy</h5>
                <p>On specific pages of the app, we gather data using techniques like "cookies" and similar information sets to analyse the page flow, track the success of promotions, and advance trust and safety. Cookies are little files that are stored on the hard disc or other storage of your device to help us provide our services.</p>
                <p>How to stop receiving marketing communications from CarePay:</p>
                <p>Please be aware that processing your request might take up to 15 business days. You expressly waive the Do Not Call (DNC) and Do Not Disturb (DND) registrations on your phone/mobile numbers in order to use the CarePay Platform and contact you for such purposes. As a result, there won't be a need to monitor the DNC or DND status of any numbers you may have left on our CarePay Platform. Sending SMSs and/or placing phone calls are two possible ways to get in touch with you.</p>

                <h5 className="policy-heading" id="policy-13">Data Retention</h5>
                <p>CarePay will retain your information for as long as it is necessary for providing you the CarePay Services available on the CarePay Platform or your request for termination of your account with CarePay, whichever is later. Furthermore, CarePay may also be required to retain certain information under the applicable law and/or as part of its contractual obligations with the Banks/Financial Institutions and accordingly such information shall be retained as prescribed under the applicable law or part of CarePay’s contractual obligation.</p>
                <p>CarePay may continue to utilise your anonymized data after the end of your connection, either alone or in conjunction with the anonymized data of other users. For data analysis, profiling, and research reasons, such as to learn more about our users and their profiles, we utilise this aggregated anonymised data. We may preserve your contact information and the specifics of your application (if any) in order to prevent fraud, to exercise or defend a legal claim, or to use as evidence in a court case (s).</p>

                <h5 className="policy-heading" id="policy-14">Updating personal information</h5>
                <p>If your personal information that you supplied with CarePay changes, you can email or call our customer care. The CarePay platforms allow for the same to be done.</p>

                
                <h5 className="policy-heading" id="policy-15">Obligation with respect to other platforms</h5>
                <p>The CarePay platforms occasionally link to other platforms that may gather your personally identifying data. The content of these connected platforms and their privacy policies are not the responsibility of CarePay.</p>
                

                <h5 className="policy-heading" id="policy-16">Grievance Redressal</h5>
                <p>Send an email to legal@carepay.in with any grievance, complaint, questions, comments, concerns, or criticism regarding the handling of your information, our privacy and security policy, or any other privacy or security issue.</p>
                <p>The provisions of the Information Technology Act, 2000 and the rules made under it, such as the Information Technology (Reasonable security practises and procedures and sensitive personal data or information) Rules, 2011, as amended, and other applicable laws enacted from time to time shall govern the interpretation of this privacy statement.</p>
                </div>
            </section>

        </div>
    )
}