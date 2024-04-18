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
        A. Company is a technology company with the brand name as CarePay
        whereby it facilitates access to credit in partnership with its Lending
        Partners (defined below) to Patients (defined below) visiting the MSP’s
        office premises in need of a Credit Facility (defined below);
      </p>
      <p>
        B .The Medical Service Provider(MSP) is clinic/ hospital/ healthcare
        establishment/ pharmacy/ wellness centre which employs professionally
        qualified medical personnel engaged in the business of offering MSP
        Product/Services (defined below) at its Office Premises/via the MSP
        Platform.
      </p>

      <p>
        <strong>
          IN CONSIDERATION OF THE TERMS AND MUTUAL COVENANTS SET FORTH HEREIN,
          THE RECEIPT AND SUFFICIENCY OF WHICH IS HEREBY ACKNOWLEDGED, THE
          PARTIES AGREE AS FOLLOWS:
        </strong>
      </p>

      <section>
        <div className="left-section">
          <ul className="outline-point">
            <li id="outline-1">
              <a href="#policy-1">DEFINITIONS AND INTERPRETATIONS</a>
            </li>
            <li id="outline-2">
              <a href="#policy-2">SERVICES</a>
            </li>
            <li id="outline-3">
              <a href="#policy-3">REFUNDS</a>
            </li>
            <li id="outline-4">
              <a href="#policy-4">RESPONSIBILITIES OF MSP</a>
            </li>
            <li id="outline-5">
              <a href="#policy-5">COMPANY’S RIGHTS AND OBLIGATIONS</a>
            </li>
            <li id="outline-6">
              <a href="#policy-6">MUTUAL OBLIGATIONS OF THE PARTIES</a>
            </li>
            <li id="outline-7">
              <a href="#policy-7">CONSIDERATION</a>
            </li>
            <li id="outline-8">
              <a href="#policy-8">DISCLAIMER</a>
            </li>
            <li id="outline-9">
              <a href="#policy-9">REPRESENTATIONS AND WARRANTIES</a>
            </li>
            <li id="outline-10">
              <a href="#policy-10">INTELLECTUAL PROPERTY</a>
            </li>
            <li id="outline-11">
              <a href="#policy-11">CONFIDENTIALITY</a>
            </li>
            <li id="outline-12">
              <a href="#policy-12">FORCE MAJEURE</a>
            </li>
            <li id="outline-13">
              <a href="#policy-13">GOVERNING LAW AND DISPUTE RESOLUTION</a>
            </li>

            <li id="outline-14">
              <a href="#policy-14">INDEMNIFICATION AND REMEDY</a>
            </li>
            <li id="outline-15">
              <a href="#policy-15">LIMITATION OF LIABILITY</a>
            </li>
            <li id="outline-16">
              <a href="#policy-16">TERM AND TERMINATION</a>
            </li>
            <li id="outline-16">
              <a href="#policy-17">MISCELLANEOUS</a>
            </li>
          </ul>
        </div>
        <div className="right-section">
          <h5 className="policy-heading" id="policy-1">
            DEFINITIONS AND INTERPRETATIONS
          </h5>
          <p>
            <strong>DEFINITIONS</strong>
          </p>
          <ul>
            <li>
              <strong>“Applicable Law”</strong> shall mean and include all
              statutes, law, by-laws, rules, regulations, orders, ordinances,
              protocols, codes, guidelines, policies, notices, directions,
              judgments, decrees or other requirements or official directive of
              any governmental authority or person acting under the authority of
              any governmental authority and / or of any statutory authority in
              India and having the force of law, whether in effect on the day
              this Agreement comes into effect or thereafter as made applicable
              to the Parties, or to the subject matter of this Agreement, as the
              case may be;
            </li>
            <li>
              <strong>“Business Days”</strong> shall mean any day on which the
              Company is open for business in India, other than a Sunday and
              Saturday and any day that is not a holiday in New Delhi under the
              Negotiable Instruments Act, 1881;
            </li>
            <li>
              <strong>“Company Website”</strong> shall mean the website owned
              and operated by the Company in connection with its business;
            </li>
            <li>
              <strong>“Confidential Information”</strong> shall have the meaning
              ascribed to it in Clause 11.1;
            </li>
            <li>
              <strong>“Credit Facility”</strong> shall mean the loan/credit
              line, being provided by the Lending Partners and availed by the
              Patients for the MSP Product/Services using the tech-enablement of
              the Company;{" "}
            </li>
            <li>
              <strong>“Effective Date”</strong> shall be mentioned in the
              agreement;
            </li>
            <li>
              <strong>“Fee”</strong> shall have the meaning ascribed to it in
              Clause 7;{" "}
            </li>
            <li>
              <strong>“Force Majeure Event”</strong> shall mean an objective
              event arising during or after the Term of this Agreement that is
              unforeseeable, unavoidable and beyond the control of the Company,
              including labor disputes, lock-down, epidemic, pandemic, strikes,
              floods, earthquakes, lightening, severe weather, utility or
              communication failures for causes not attributed to the company,
              failure of an Association, failure or delay in receiving
              electronic data for causes not attributed to the Company, war
              (whether declared or not), revolution, civil commotion, terrorist
              act, blockade, embargo, notified disaster under Disaster
              Management Act, 2005 or any law, regulation, requirement or policy
              with legal effect of any government or any judicial authority or
              representative of any such government, acts or omissions of
              governmental authorities, or any other act, omission or cause
              whatsoever, whether similar or dissimilar to the foregoing due to
              which the performance of terms and conditions of this Agreement
              becomes impossible;
            </li>
            <li>
              <strong>“Lending Partners”</strong> shall mean the bank and NBFC
              partners of the Company which are authorised by the RBI to
              undertake the business of Lending. ;{" "}
            </li>
            <li>
              <strong>“Invoice”</strong> shall mean the invoice for the MSP
              Product/Services raised by the MSP, which may be facilitated by
              the Company, on the MSP’s letter head to the Patients interested
              in availing the Credit Facility;{" "}
            </li>
            <li>
              <strong>“MSP Platform”</strong> shall mean the web-based platform
              and/or mobile application owned and operated by the MSP in
              connection with its business;
            </li>
            <li>
              <strong>“MSP Product/Services”</strong> shall mean the products
              and/or services offered through the MSP Platform for which the
              Patient may avail a Credit Facility from the Lending Partners
              through the Services offered by the Company;
            </li>
            <li>
              <strong>“Office Premises”</strong> shall mean the ordinary place
              of business of the MSP which the Patients of the MSP visit for the
              purpose of availing the MSP Product/Services;{" "}
            </li>
            <li>
              <strong>“Patient”</strong> shall mean and include the people
              visiting the MSP Platform/Office Premises for availing the MSP
              Product/Services and are interested in availing the Credit
              Facility facilitated by the Company;
            </li>
            <li>
              <strong>“Personal Data”</strong> shall have the same meaning as
              ascribed to the terms ‘Personal Information’ and ‘Sensitive
              Personal Data or Information’ under the Information Technology
              (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011 (as amended from time to
              time) and shall include any personally identifiable information of
              the Patient;
            </li>
            <li>
              <strong>“Quick Response/QR Code”</strong> shall mean the QR Code
              supplied by the Company to the MSP and upon scanning of which the
              Patient shall be redirected to the Company Website in order to
              avail the Credit Facility and other payment options;{" "}
            </li>
            <li>
              <strong>“Relevant Invoice Amount”</strong> shall mean such portion
              of the Invoice amount raised by the MSP to the Patient for which
              the Credit Facility is being availed by the Patient;
            </li>
            <li>
              <strong>“Security Breach”</strong> shall refer to any unauthorized
              access, use, disclosure, damage or destruction of the MSP Platform
              and/or any data on the MSP Platform and shall include but not be
              limited to any viruses or other alien computer programming having
              been transmitted to the MSP Platform, that may damage,
              detrimentally interfere with, surreptitiously intercept, or
              expropriate any part of the system or data on the MSP Platform.
            </li>
            <li>
              <strong>“Services”</strong> shall include the credit facilitation
              services provided by the Company to connect the Patients and
              Lending Partner in order for the Patients to avail Credit Facility
              and may also include providing assistance to the MSP for raising
              of Invoice for the MSP Product/Services availed by the Patients;{" "}
            </li>
            <li>
              <strong>“Term”</strong> shall have the meaning ascribed to it in
              Clause 16;
            </li>
            <li>
              <strong>“Transaction”</strong> shall mean a financial transaction
              between the Patient and Fintech Partner in which the Patient
              avails the Credit Facility against the Relevant Invoice Amount for
              the goods and allied medical services availed by the Patient from
              the MSP;{" "}
            </li>
            <li>
              <strong>“Upfront Payment”</strong> shall mean such portion of the
              Invoice amount for which the Credit Facility is not being availed
              and is payable upfront by the Patient at the time of availing the
              MSP Product/Services;
            </li>
          </ul>

          <p>
            <strong>INTERPRETATIONS</strong>
          </p>
          <ul>
            <li>
              Words importing persons or parties shall include firms and
              corporations and any organisations having legal capacity.
            </li>
            <li>
              Words importing the singular include the plural and vice versa.
            </li>
            <li>
              Reference to Applicable Law shall include laws as may from time to
              time be enacted amended, supplemented, or re-enacted.
            </li>
            <li>
              Reference to a gender includes a reference to all other genders.
            </li>
            <li>
              Reference to the words “include” or “including” shall be construed
              without limitation.
            </li>
            <li>
              Reference to this Agreement or any other agreement, instrument, or
              document shall be construed as a reference to this Agreement or
              such other agreement, instrument, or document as the same may from
              time to time be amended, varied, supplemented or novated in
              accordance with the terms of such document.
            </li>
            <li>
              Any reference to “writing” shall include printing, typing,
              transmissions in electronic form (including email) and other means
              of reproducing words in visible form but shall exclude text
              messages via mobile phones.
            </li>
            <li>
              The headings and titles in this Agreement are for reference only
              and shall not affect the interpretation or construction hereof.
            </li>
            <li>
              In addition to the terms defined in this Clause, certain other
              terms are defined elsewhere in this Agreement and whenever such
              terms are used in this Agreement, they shall have their respective
              defined meanings, unless the context expressly or by necessary
              implication otherwise requires.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-2">
            SERVICES
          </h5>
          <ul>
            <li>
              The Company hereby grants the MSP a non-exclusive right to make
              available the Services to the Patients. In the event the Patients
              wish to avail the Services, the MSP shall redirect such Patients
              to the Company Website via a hyperlink on its Platform or via the
              QR Code made available in its Office Premises.
            </li>
            <li>
              The MSP shall keep the Company informed of its marketing and
              promotional activities relating to the Services. The MSP shall
              have access to and is entitled to provide the Patients with the
              marketing material approved by the Company regarding the Services.
            </li>
            <li>
              For any Patients who choose to pay for MSP Products/Services using
              the Services, upon sanctioning of Credit Facility by the Lending
              Partner to such Patients, the Lending Partner will disburse the
              Relevant Invoice Amount to the MSP on a T+1 basis, i.e., within
              one Business Day from the date of Invoice.{" "}
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-3">
            REFUNDS
          </h5>
          <p>
            The MSP shall be liable to initiate a full refund of the Relevant
            Invoice Amount to the Lending Partner in the event that any of the
            following conditions are fulfilled in the Company’s sole discretion:
          </p>
          <ul>
            <li>
              The Patient is not contactable by the Company for a period of 24
              hours from the time the Invoice was raised.
            </li>
            <li>
              The Patient raises a dispute with respect to the Invoice which is
              not resolved within 72 hours.
            </li>
            <li>
              The Patient raises a dispute with respect to the MSP
              Product/Services offered by the MSP through its Platform.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-4">
            RESPONSIBILITIES OF MSP
          </h5>
          <p>Training</p>
          <ul>
            <li>
              The MSP shall co-ordinate and provide suitable time slots for the
              Company in order for the officials of the Company to visit the
              MSP’s Office Premises and inform and train the MSP’s associates,
              affiliates or employees with regards to the procedure for usage
              and functioning of the QR Code provided by the Company.{" "}
            </li>
            <li>
              The MSP shall ensure that the all of the designated associates,
              affiliates or employees are present during the training session
              carried out by the Company at the MSP’s Office Premises in order
              for them to facilitate the Services provided by the Company.
            </li>
          </ul>

          <p>Display</p>
          <ul>
            <li>
              The MSP shall ensure that the QR Code provided by the Company is
              displayed in a prominent location in the Office Premises including
              any such designated place where the Patients are supposed to make
              payment for buying goods or availing services from the MSP, at all
              times and shall be visible to all Patients visiting the MSP’s
              Office Premises.
            </li>
            <li>
              The MSP shall ensure that any promotional material, including but
              not limited to posters, banners, etc., supplied by the Company in
              relation to the Services and/or the Credit Facility shall be
              displayed by the MSP at prominent locations in the MSP’s Office
              Premises.{" "}
            </li>
            <li>
              The MSP shall provide the Patients an option to avail the Services
              on the payments and checkout page on the MSP Platform. The MSP
              shall ensure that the option to avail the Services is displayed
              prominently and is not placed within a nested menu where the
              options can only be accessed by opening the nested menu.
            </li>
          </ul>

          <p>Conduct</p>
          <ul>
            <li>
              The MSP shall ensure that its associates, affiliates, and/or
              employees shall explain the functioning and use of the QR Code and
              the procedure to avail Credit Facility, to the Patients as a mode
              of settling the Relevant Invoice Amount.
            </li>
            <li>
              The MSP or any of its associates, affiliates, and/or employees
              shall, in no event force, solicit, compel or coerce the Patients
              to use the QR Code and avail the Credit Facility.{" "}
            </li>
            <li>
              The MSP shall monitor the conduct of its associates, affiliates,
              and/or employees and ensure that their conduct towards the
              Patients is in line with relevant instructions provided by the
              Company from time to time.{" "}
            </li>
          </ul>

          <p>
            In the event any suit or proceedings or investigation of any nature
            is initiated or the MSP reasonably suspects that the same shall be
            initiated against any doctor or other medical professional employed
            by the MSP and providing services to Patients against which Credit
            Facility is being availed by the Patients by any third-party or any
            authority under Applicable Law, the MSP shall inform the same to the
            Company within 2 (two) days of becoming aware such information.{" "}
          </p>
          <p>
            The MSP shall at all times comply with all Applicable Laws and
            regulations with respect to its activities under this Agreement. The
            MSP further agrees that it has obtained all necessary and valid
            consents from the Patients to authorise the Company for collecting,
            storing and processing such Patient’s Personal Data. Additionally,
            the MSP shall provide the Company with a copy of the consent or any
            other proof evidencing the Patient’s grant of consent as and when
            requested by the Company.
          </p>
          <p>
            The MSP shall carry out all of its responsibilities set out in this
            Agreement in a timely and efficient manner.
          </p>

          <p>Security</p>
          <ul>
            <li>
              The MSP hereby represents that its operating system, and the
              software, including servers, database and hosting environment, for
              the Platform has and shall continue to have robust security
              measures in place.{" "}
            </li>
            <li>
              The MSP shall promptly, and in no event, later than 2 (two)
              business days from the date of identifying or learning of a
              Security Breach in the MSP’s security system, inform the Company
              of any such Security Breach.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-5">
            COMPANY’S RIGHTS AND OBLIGATIONS
          </h5>
          <ul>
            <li>
              The Company reserves the right to make changes to the Company
              Website and/or the Services including rolling back any feature
              introduced or discontinuing the Company Website and/or the
              Services, without providing any reason for such roll back or
              discontinuation.
            </li>
            <li>
              Company may collect additional information from the Patients in
              order for it to provide the Services.{" "}
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-6">
            MUTUAL OBLIGATIONS OF THE PARTIES
          </h5>
          <ul>
            <li>
              Both the Parties agree that each Party shall be responsible for
              its own costs and be responsible for providing and maintaining all
              necessary equipment and facilities at their respective ends so as
              to make the Services available on the MSP Platform.
            </li>
            <li>
              In case the Services or the MSP Platform are not accessible due to
              any break-down or other reasons directly attributable to any one
              Party to this Agreement, such Party shall apprise the other Party
              of such inaccessibility/breakdown of MSP Platform/Services. Both
              Parties shall endeavour to resolve any technical issues causing
              such inaccessibility or breakdown.
            </li>
            <li>
              Each party is responsible for all taxes imposed on such party
              under applicable laws and arising as a result of or in connection
              with this Agreement or the transactions contemplated by this
              Agreement.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-7">
            CONSIDERATION
          </h5>

          <p>
            The MSP agrees that it shall pay to the Company described percentage
            of the Relevant Invoice Amount for each transaction processed using
            the Services (“Fee”). The aforementioned Fee is exclusive of GST
            which shall be additionally payable by the Company. Further, the MSP
            authorises the Lending Partner to deduct the Fee when settling the
            Transaction Amount with the Company in accordance with the
            settlement timelines set out in Clause 2.3.
          </p>

          <h5 className="policy-heading" id="policy-8">
            DISCLAIMER
          </h5>
          <ul>
            <li>
              The Company Website and the Services are provided on an “as is”
              basis without warranty of any kind, express, implied, statutory,
              or otherwise, including the implied warranties of title,
              non-infringement, authenticity and/or accuracy of data, results of
              use, reliability, merchantability, or fitness for a particular
              purpose or use. Without limiting the foregoing, we make no
              warranty that the Company Website or the Services will meet any
              requirements or expectations.
            </li>
            <li>
              The Company does not own, control, support, employ, endorse or
              advertise any Lending Partner (or any services provided by them)
              displayed / made available through the Company Website;
            </li>
            <li>
              The Company assumes no liability for the actions of its Lending
              Partner using and accessing the Patient’s Personal Data for the
              purposes of advancing the Credit Facility;
            </li>
            <li>
              The Company is a technology facilitator used by Lending Partners
              to acquire customers for the purpose of extending Credit Facility.
              The Company is in no manner related to the FinTech Partner, is not
              the principal/agent, employee, contractor, sub-contractor etc., of
              the Lending Partner;
            </li>
            <li>
              The grant and disbursal of the Credit Facility to any Patient
              shall be at the sole discretion of the Lending Partner. Neither
              the Company nor the MSP shall have any authority in the same; and
            </li>
            <li>
              The Company shall not in any event be liable for any deficiency in
              services or any substandard or counterfeit goods provided by the
              MSP or its employees, associates or affiliates to the Patient.{" "}
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-9">
            REPRESENTATIONS AND WARRANTIES
          </h5>
          <p>Each Party represents to the other that:</p>

          <ul>
            <li>
              it is duly incorporated and validly existing under the laws of the
              state or country of its incorporation, and has the full power and
              authority to conduct its business as well as to execute this
              Agreement and perform its obligations hereunder;
            </li>
            <li>
              it has taken all necessary measures to authorize or approve the
              execution of this Agreement, and to the best of its knowledge its
              execution or performance of this Agreement is not in violation of
              any requirements of law or other provisions that are applicable to
              or binding upon it;
            </li>
            <li>
              this Agreement constitutes legal, valid, binding and enforceable
              obligations of it;
            </li>
            <li>
              it will obtain, hold and maintain all filings, licenses, permits
              and consents as may be required pursuant to any requirements of
              Applicable Law or other provisions in order for it to conduct its
              business and perform its obligations under this Agreement
            </li>
            <li>
              It shall comply with all Applicable Laws including the data
              privacy laws and Information Technology Act, 2000; and
            </li>
            <li>
              the execution, delivery and performance of this Agreement and all
              instruments or agreements required hereunder by each of them does
              not contravene, violate or constitute a default of or require any
              consent under the provisions of any other agreement or instrument
              to which each of them is bound including any order, judgment,
              decree or injunction of any court of law.
            </li>
          </ul>

          <p>The MSP represents, warrants and undertakes that:</p>
          <ul>
            <li>
              MSP has all requisite permissions and certificates from the
              relevant authorities as per Applicable Law for providing
              healthcare goods and allied medical services on its premises;
            </li>
            <li>
              Any medical professional or doctor employed by the MSP and
              providing services against which Invoice is raised for the
              Patients to avail the Credit Facility does not have any pending or
              on-going suits, proceedings, investigation of any nature including
              but not limited to any criminal proceedings, or investigation
              initiated by the Indian Medical Association (“IMA”), or any other
              authority or regulatory body instituted or designated for this
              purpose;{" "}
            </li>
            <li>
              All healthcare goods and medical services provided by the MSP meet
              the applicable standards as set under the Applicable Law;
            </li>
            <li>
              All and any information provided to the Company by the MSP is
              authentic, correct and true to the best of the MSP’s knowledge;
            </li>
            <li>
              All medical practitioners, medical personnel engaged by the MSP
              for providing healthcare goods and allied medical services hold
              valid and applicable licenses, approvals, registration etc., under
              Applicable Law and are legally eligible to undertake their
              profession in India;
            </li>
            <li>
              MSP understands that Company shall verify the documents and
              information provided by the MSP and the MSP has not
              misrepresented, cheated, lied or faked the information provided to
              the Company.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-10">
            INTELLECTUAL PROPERTY
          </h5>
          <ul>
            <li>
              For the purposes of this Agreement, the term “Intellectual
              Property Rights” shall mean and include all existing and future
              copyright rights, trademark rights (including, without limitation
              trade names, trademarks, service marks, and trade dress), patent
              rights, trade secrets and all other intellectual property rights,
              vested or registered, and all renewals and extensions thereof,
              regardless of whether such rights arise under the laws of any
              state, country or jurisdiction.
            </li>
            <li>
              The Company shall at all times retain all the Intellectual
              Property Rights in and to the Company Website and its Services.
            </li>
            <li>
              The Company shall at all times retain all the Intellectual
              Property Right in and to its trademarks, name and logos.
            </li>
            <li>
              Either Party agrees that it shall not use the other Party’s
              trademarks, name or logos for any purpose including sales and
              marketing activities without the prior written consent of the
              other Party.
            </li>
            <li>
              Each Party acknowledges that, as between the Parties, the other
              Party owns all right, title and interest in and to such other
              Party’s Intellectual Property Rights whether presently existing or
              later developed by such other Party. Except to the extent provided
              in this Agreement, neither Party shall have any right, title or
              interest in any of the other Party’s Intellectual Property Rights,
              or any right to use any of the other Party’s Intellectual Property
              Rights in any manner without obtaining prior written approval of
              such other Party.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-11">
            CONFIDENTIALITY
          </h5>
          <p>
            The Parties undertake that they shall, at all times, during the
            continuance of this Agreement, ensure that all the terms and
            conditions of this Agreement and all information relating to this
            Agreement including but not limited to the Invoices, Relevant
            Invoice Amount and all personal information of the MSP collected by
            the Company for the purpose of authentication shall be kept
            confidential (“Confidential Information”) and a Party shall not
            disclose any information relating to this Agreement to any third
            party, without the prior written consent of other Party.{" "}
          </p>
          <p>
            The restriction set forth in Clause 11.1 above shall not apply to
            any part of the Confidential Information, which:{" "}
          </p>
          <ul>
            <li>
              Is at the time of disclosure to the recipient Party, or
              thereafter, becomes part of the public domain, other than as a
              result of a disclosure by the recipient Party, their directors,
              officers or employees; or{" "}
            </li>
            <li>
              Is required to be disclosed by any governmental authority or by
              judicial, administrative or stock exchange process, any enquiry,
              investigation, action, suit, proceeding or claim or otherwise
              under the Applicable Law or by any authority under pain of
              criminal prosecution; or{" "}
            </li>
            <li>
              Is shared by the Company with a third party including a payment
              system operator, payment aggregator or a payment gateway
              registered with the Reserve Bank of India (“RBI”) for the sole
              purpose of remitting Fees, paid by the Patient, to the MSP; or{" "}
            </li>
            <li>
              Is already in the possession of the recipient Party at the time of
              the disclosure; or{" "}
            </li>
            <li>
              Is hereafter rightfully furnished to the recipient Party by a
              third party without breach of this Agreement or any separate
              non-disclosure obligation; or{" "}
            </li>
            <li>
              Was or is independently developed by the recipient Party without
              reference to the Confidential Information disclosed hereunder; or{" "}
            </li>
            <li>
              Is approved for release by written authorization of the disclosing
              Party; or{" "}
            </li>
          </ul>
          <p>
            Each Party (the Receiving Party) will notify the other Party (the
            Disclosing Party) immediately upon discovery of any unauthorized use
            or disclosure of Confidential Information or any other breach of
            this Agreement by the Receiving Party. The Receiving Party will
            cooperate with the other Party in every reasonable way to help the
            Disclosing Party regain possession of such Confidential Information
            and prevent its further unauthorized use.
          </p>

          <h5 className="policy-heading" id="policy-12">
            FORCE MAJEURE
          </h5>
          <p>
            Notwithstanding anything contained in this Agreement, the Party
            affected by a Force Majeure Event shall give notice of the Force
            Majeure Event to the other party as soon as such Party becomes aware
            of such Force Majeure Event. Upon receiving such notice both Parties
            shall mutually decide upon the recourse to be taken with respect to
            the delayed performance or non-performance of obligations under this
            Agreement owing to such Force Majeure Event. After mutually agreeing
            on the recourse as per this Clause, if the Force Majeure Event
            continues for a period of more than 30 (thirty) days, both Parties
            shall mutually re-evaluate the terms agreed upon as per this Clause
            or agree to terminate this Agreement.
          </p>

          <h5 className="policy-heading" id="policy-13">
            GOVERNING LAW AND DISPUTE RESOLUTION
          </h5>
          <p>Governing Law</p>
          <ul>
            <li>
              This Agreement shall be construed, governed and implemented in
              accordance with Applicable Laws of India.{" "}
            </li>
            <li>
              The Parties agree to submit to the exclusive jurisdiction of the
              courts at New Delhi, for any interim relief as regards any claims
              or matter arising in relation to this Agreement, including any
              other relief under Applicable Laws available to the Parties.
            </li>
          </ul>

          <p>Dispute Resolution</p>
          <ul>
            <li>
              For the resolution of any controversy or claim between the Parties
              arising from or in connection with this Agreement, including the
              alleged breach, termination, validity, interpretation and
              performance thereof and in relation to any Applicable Law in force
              (“Dispute”), shall be resolved through mediation failing which the
              dispute shall be finally decided by arbitration in accordance with
              the provisions of the Arbitration and Conciliation Act, 1996
              (“Act”).
            </li>
            <li>
              The arbitral tribunal shall comprise of a sole arbitrator
              appointed in accordance with the Act. The venue of arbitration
              shall be New Delhi. The arbitration proceedings shall be conducted
              in English language. Any award made in the arbitration shall be
              final and binding on the Parties.{" "}
            </li>
            <li>
              Subject to the above, the Parties submit to the exclusive
              jurisdiction of the competent courts in New Delhi in respect of
              any dispute or differences or claims arising between the Parties.
            </li>
          </ul>

          <h5 className="policy-heading" id="policy-14">
            INDEMNIFICATION AND REMEDY
          </h5>
          <p>
            The MSP agrees to indemnify and hold the Company harmless and keep
            it at all times fully indemnified, from and against all third-party
            claims, actions, suits and related proceedings, liabilities,
            penalties, demands and costs, awards, damages, losses and/or
            expenses howsoever arising, directly or indirectly out of (i) breach
            of Applicable Law relating to data privacy; (ii) breach of
            confidentiality; (iii) breach of any third party Intellectual
            Property Rights; or (iv) any gross negligence, wilful misconduct or
            fraud on the part of the MSP.
          </p>

          <h5 className="policy-heading" id="policy-15">
            LIMITATION OF LIABILITY
          </h5>
          <p>
            Notwithstanding any provisions to the contrary, the Company, its
            affiliates, directors, employees or officers shall not be liable to
            the MSP or any third party for any special, punitive, indirect or
            consequential, or incidental damages, including, but not limited to,
            loss of business, loss of profits, loss of goodwill arising in
            relation to this Agreement, even if it has been advised of the
            possibility of such damages.
          </p>
          <p>
            Subject to Clause 15.1, the Company’s liability to the MSP or any
            third party in respect of any claim arising in connection with this
            Agreement shall not exceed the Fee paid to the Company in the 1
            (one) month preceding the date of such claim.
          </p>

          <h5 className="policy-heading" id="policy-16">
            TERM AND TERMINATION{" "}
          </h5>
          <p>
            This Agreement shall remain in full force and effect from the
            Execution Date until terminated by the Parties mutually in writing
            or in accordance with the terms of this Clause ("Term”).
          </p>
          <p>
            In the event of breach of the terms of the Agreement, aggrieved
            party shall give 30 (Thirty) days written notice to other party to
            rectify the breach, failing which aggrieved party shall terminate
            the Agreement with immediate effect. Prior to giving notice of
            termination of this Agreement, both the Parties shall mutually
            configure the resolution to the breach and/ or the extension of the
            cure period.
          </p>
          <p>
            The Company shall have the right to immediately terminate this
            Agreement by giving a written notice in that behalf, to the other
            Party on the happening of any of the following events:
          </p>
          <ul>
            <li>
              If the MSP ceases to carry on its business or is barred by any
              government or regulatory body to carry on its business;
            </li>
            <li>
              If there is any material adverse change or any change in
              Applicable Law, rules, regulations, directives or guidelines,
              which prevents the continuing of the arrangement under this
              Agreement; or
            </li>
            <li>
              If the MSP engages in fraud or other illegal or criminal
              activities.
            </li>
          </ul>
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

          <h5 className="policy-heading" id="policy-17">
            MISCELLANEOUS
          </h5>
          <p>
            Assignments: The Company may assign, in whole or in part, the
            benefits or obligations under this Agreement by providing a 30
            (thirty) days prior intimation of such assignment to the MSP, which
            shall be binding on the Parties to this Agreement. In the event of
            any assignment of any of Company’s liability or obligations under
            this Agreement, the terms of this Agreement shall be binding upon
            the Assignee.
          </p>
          <p>
            Waiver and Amendment: No modification, amendment, extension beyond
            the Term or waiver of any provision of this Agreement shall be
            effective unless in writing or agreed over e-mail by the Parties. No
            failure or delay by either Party in exercising any right, power, or
            remedy under this Agreement shall operate as a waiver of any such
            right, power or remedy.
          </p>
          <p>
            Severability: If any provision of this Agreement is or becomes, in
            whole or in part, invalid or unenforceable but would be valid or
            enforceable if some part of that provision was deleted, that
            provision shall apply with such deletions as may be necessary to
            make it valid. If any Court/Tribunal of competent jurisdiction holds
            any of the provisions of this Agreement unlawful or otherwise
            ineffective, the remainder of this Agreement shall remain in full
            force and the unlawful or otherwise ineffective provision shall be
            substituted by a new provision reflecting the intent of the
            provision so substituted.
          </p>
          <p>
            Entire Agreement: This Agreement constitutes the entire Agreement
            and understanding between the Parties, and supersedes any previous
            agreement or understanding or promise between the Parties, relating
            to the subject matter of this Agreement. All Schedules, Recitals and
            Annexure to this Agreement shall be an integral part of this
            Agreement and will be in full force and effect as though they were
            expressly set out in the body of this Agreement.
          </p>
          <p>
            Costs: Each Party shall bear its own cost with respect to the
            execution of this Agreement or the performance of the obligations
            contained hereunder this Agreement.
          </p>
          <p>
            Counterparts: This Agreement may be executed in two or more
            counterparts, each of which, when executed and delivered, is an
            original, but all the counterparts taken together shall constitute
            one document.
          </p>
          <p>
            Notices: All notices, requests, demands, waivers and other
            communications required or permitted to be given under the Agreement
            shall be in writing through certified or registered mail, courier,
            email, facsimile or telegram to be sent to the following addresses:
          </p>

          <p>
            <strong>For Company:</strong> Attn: Legal Department – Carecoin
            Technologies Private Limited
            <br />
            Carecoin Technologies Pvt. Ltd, 408, 27, New Delhi House, Barakhamba
            Road, Connaught Place, New Delhi
          </p>

          <p>
            <strong>For MSP:</strong> In each case, at such other address as may
            be specified in writing to the other Parties in accordance with the
            requirements of this Clause. All such notices, requests, demands,
            waivers and other communications shall be deemed duly given (i) if
            by personal delivery, on the day after such delivery, (ii) if by
            certified or registered mail, on the receipt of acknowledgement of
            delivery, (iii) if by courier service or similar service, on the day
            delivered, or (iv) if by email, on the day following the day on
            which such email was sent, provided that a copy is also sent by
            registered mail.
          </p>
        </div>
      </section>
    </div>
  );
}
