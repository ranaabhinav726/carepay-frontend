import CustomNavbar from "../Components/Navbar";

import './css/lendingPartner.scss'
import { Contact, Footer } from "./WebHomepage";
import { useEffect } from "react";

export default function LendingPartners() {
    const treatmentData = [
        { name: "Infertility Treatment (Other than IVF)", cost: "₹70,000 - ₹1,50,000" },
        { name: "In vitro fertilization (IVF)", cost: "₹90,000 - ₹1,50,000" },
        { name: "MTPs", cost: "₹5,000 - ₹10,000" },
        { name: "Diagnostic Laparoscopy", cost: "₹20,000 - ₹50,000" },
        { name: "Polyp", cost: "₹45,000 - ₹75,000" },
        { name: "Fibroid", cost: "₹1,00,000 - ₹1,50,000" },
        { name: "Therapeutic Curettage", cost: "₹6,000 - ₹55,000" },
        { name: "Small Operations of Uterus, Cervix etc.", cost: "₹50,000 - ₹2,00,000" },
        { name: "Small Operations of Fallopian tube, Vagina etc.", cost: "₹25,000 - ₹2,00,000" },
    ]
    const treatment1 = [
        { name: "Lithotripsy", cost: "₹30,000 - ₹80,000" },
        { name: "Hydrocele", cost: "₹25,000 - ₹1,35,000" },
        { name: "Piles / Fistula", cost: "₹30,000 - ₹1,50,000" },
        { name: "Prostate", cost: "₹3,00,000 - ₹10,00,000" },
        { name: "Varicose Veins", cost: "₹50,000 - ₹1,50,000" },
        { name: "Colonoscopy / Gastroscopy", cost: "₹3,000 - ₹15,000" },
        { name: "Gastroscopy", cost: "₹5,000 - ₹15,000" },
        { name: "Appendectomy", cost: "₹20,000 - ₹40,000" },
        { name: "Cystoscopic removal of stones", cost: "₹30,000 - ₹75,000" },
        { name: "Ultrasound guided aspirations", cost: "₹2,500 - ₹5,000" },
        { name: "Hernia", cost: "₹25,000 - ₹1,50,000" }
    ]
    const treatment2 = [
        { name: "Hair transplant", cost: "₹25,000 - ₹2,50,000" },
        { name: "Stretch mark removal", cost: "₹2,500 - ₹10,000" },
        { name: "Facelift", cost: "₹50,000 - ₹2,00,000" },
        { name: "Rhinoplasty", cost: "₹15,000 - ₹2,00,000" },
        { name: "Liposuction", cost: "₹50,000 - ₹2,50,000" },
        { name: "Tummy tuck", cost: "₹80,000 - ₹1,75,000" },
        { name: "Breast Augmentation", cost: "₹75,000 - ₹3,50,000" },
        { name: "Breast Reduction and Breast Lift", cost: "₹80,000 - ₹3,50,000" },
        { name: "Breast Lift", cost: "₹60,000 - ₹1,50,000" },
        { name: "Gynecomastia (Male Breast Reduction)", cost: "₹45,000 - ₹1,50,000" },
        { name: "Vulvovaginal", cost: "₹50,000 - ₹1,20,000" },
        { name: "Buttock Augmentation", cost: "₹1,40,000 - ₹3,20,000" },
        { name: "Buttock Lift", cost: "₹1,20,000 - ₹2,40,000" },
        { name: "Blepharoplasty (Eyelid surgery)", cost: "₹50,000 - ₹2,00,000" },
        { name: "Otoplasty (Ear Pinning)", cost: "₹40,000 - ₹1,80,000" },
        { name: "Brow lift", cost: "₹57,000 - ₹1,35,000" },
        { name: "Chin Augmentation", cost: "₹60,000 - ₹1,50,000" },
        { name: "Malar or Cheek Augmentation", cost: "₹80,000 - ₹1,00,000" },
        { name: "Chemical Peel", cost: "₹1,500 - ₹20,000" },
        { name: "Botulinum toxin or Botox", cost: "₹5,000 - ₹25,000" },
        { name: "Soft Tissue Fillers", cost: "₹15,000 - ₹30,000" },
        { name: "Stem Cell Enriched Fat Graft", cost: "₹40,000 - ₹1,50,000" },
        { name: "Fat Injection/Fat Grafting", cost: "₹40,000 - ₹1,60,000" },
        { name: "Cleft Lip and Cleft Palate", cost: "₹25,000 - ₹3,00,000" }
    ]
    const treatment3 = [
        { name: "Dental Implants / Crowns & Bridges (Per tooth)", cost: "₹25,000 - ₹50,000" },
        { name: "Removable Partial Dentures (Imported)", cost: "₹15,000 - ₹30,000" },
        { name: "Removable Partial Denture (Flexible)", cost: "₹8,000 - ₹17,000" },
        { name: "Upper and Lower Complete Denture (Imported)", cost: "₹45,000 - ₹60,000" }
    ]
    const treatment4 = [
        { name: "E-Max Metal Free Crown / Veneer – Metal Free", cost: "₹10,000 - ₹18,000" },
        { name: "Ceramil / Azir (Zirconia Crowns) – Metal Free", cost: "₹5,000 - ₹30,000" },
        { name: "Zoom Advanced Whitening (3 Cycles)", cost: "₹15,000 - ₹20,000" },
        { name: "Ant.RCT/ Post.RCT or Re-RCT", cost: "₹5,000 - ₹10,000" },
        { name: "Ceramic Fillings/Inlay (Per Tooth)", cost: "₹8,000 - ₹13,000" },
        { name: "Composite Bonding", cost: "₹3,000 - ₹15,000" },
        { name: "Componeers (Per tooth)", cost: "₹8,000 - ₹10,000" }]
    const treatment5 = [
        { name: "Dental Diode Laser", cost: "₹10,000 - ₹20,000" },
        { name: "Diode Laser Frenectomy", cost: "₹4,000 - ₹8,000" },
        { name: "Laser Gum Contouring", cost: "₹10,000 - ₹25,000" },
        { name: "Laser Depigmentation", cost: "₹5,000 - ₹10,000" },
        { name: "Full Mouth Scaling & Polishing", cost: "₹1,500 - ₹5,000" },
        { name: "Deep Scaling (Curretage)", cost: "₹10,000 - ₹20,000" },
        { name: "Gum-Flap Surgery", cost: "₹10,000 - ₹50,000" },
        { name: "Bone Grafting", cost: "₹10,000 - ₹50,000" },
        { name: "Gum Graft", cost: "₹10,000 - ₹45,000" }
    ]
    const treatment6 = [
        { name: "Extraction", cost: "₹600 - ₹5,000" },
        { name: "Impaction / Wisdom Tooth Removal", cost: "₹800 - ₹5,000" },
        { name: "Biopsy", cost: "₹2,000 - ₹10,000" },
        { name: "Apicectomy", cost: "₹2,500 - ₹15,000" },
        { name: "Sinuslift", cost: "₹12,000 - ₹40,000" }
    ]
    const treatment7 = [
        { name: "Braces (Metallic) Full Mouth", cost: "₹25,000 - ₹60,000" },
        { name: "Metallic- Self Ligating (Damon)", cost: "₹35,000 - ₹85,000" },
        { name: "Clear Aligners Invisible Braces (Clear Path)", cost: "₹1,00,000 - ₹4,50,000" },
        { name: "Clear Aligners Invisible Braces (Invisalign)", cost: "₹1,50,000 - ₹3,50,000" },
        { name: "Braces (Ceramic) Full Mouth", cost: "₹30,000 - ₹60,000" }
    ]
    const treatment8 = [
        { name: "Cataract operation", cost: "₹20000 - ₹100000" },
        { name: "Corneal transplant", cost: "₹60000 - ₹150000" },
        { name: "Tear duct operations", cost: "₹10000 - ₹15000" },
        { name: "Ptosis", cost: "₹20000 - ₹55000" },
        { name: "Lasik Surgery", cost: "₹20000 - ₹150000" },
        { name: "Glaucoma", cost: "₹15000 - ₹50000" },
        { name: "Squint", cost: "₹25000 - ₹100000" },
        { name: "Vitreectomy", cost: "₹60000 - ₹100000" },
        { name: "Retinal Detachment", cost: "₹60000 - ₹70000" }
    ]
    const treatment9 = [
        { name: "Ossiculoplasty", cost: "₹70000 - ₹150000" },
        { name: "Functional Endoscopic Sinus Surgery", cost: "₹40000 - ₹150000" },
        { name: "Stapedectomy", cost: "₹20000 - ₹150000" },
        { name: "Microlaryngeal surgery", cost: "₹55000 - ₹75000" },
        { name: "Tympanoplasty", cost: "₹40000 - ₹150000" }
    ]
    const treatment10 = [
        { name: "Glossectomy", cost: "₹200000 - ₹500000" },
        { name: "Frenuloplasty", cost: "₹14000 - ₹40000" },
        { name: "Reconstruction of the tongue", cost: "₹100000 - ₹300000" }

    ]
    const treatment11 = [
        { name: "Closed reduction of fractures", cost: "₹15000 - ₹40000" },
        { name: "Operations of tendons / Tendon sheath", cost: "₹20000 - ₹50000" },
        { name: "Arthroscopic Knee Aspiration", cost: "₹70000 - ₹220000" },
        { name: "Reduction of dislocations", cost: "Not specified" }

    ]
    const treatment12 = [
        { name: "Dialysis", cost: "₹4000 - ₹15000" },
        { name: "Angiography", cost: "₹25000 - ₹45000" }
    ]


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='website-container'>
            <CustomNavbar />
            <h1>Supported<br />
                treatments</h1>
            <div style={{ textAlign: window.innerWidth > 600 ? 'center' : 'left', width:  window.innerWidth < 600?'92%':'100%', marginLeft: 'auto', marginLeft: 'auto' }}>
                <p>CarePay has partnered with healthcare service <br />
                    providers to offers financing for the <br />
                    following treatments.</p>
            </div>
            <div className="credit-table-finbit-new" style={{ width: window.innerWidth > 600 ? '60%' : '100%', marginLeft: 'auto', marginRight: 'auto', fontSize: window.innerWidth < 600 ? '10px' : 'auto', marginTop: '40px' }}>
                <table className="">
                    <thead>
                        <tr >
                            <th style={{ textAlign: 'left', borderRight: '1px dashed' }}>Treatment name
                                <div style={{ height: '2px', background: '#000', width: '100%', marginTop: '10px' }}></div>
                            </th>
                            <th style={{ textAlign: 'left' }}>Price range
                                <div style={{ height: '2px', background: '#000', width: '100%', marginTop: '10px' }}></div>
                            </th>

                        </tr>
                    </thead>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Gynaecology</div>
                     <tbody>
                        {treatmentData.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>General Surgery</div>
                     <tbody>
                        {treatment1.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Cosmetic Surgery</div>
                     <tbody>
                        {treatment2.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Dental</div>
                     <tbody>
                        {treatment3.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Cosmetic Dentistry & Endodontics</div>
                     <tbody>
                        {treatment4.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Gums Treatment</div>
                     <tbody>
                        {treatment5.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Oral Surgery</div>
                     <tbody>
                        {treatment6.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Orthodontics - Braces Treatment</div>
                     <tbody>
                        {treatment7.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Opthalmology</div>
                     <tbody>
                        {treatment8.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}> ENT</div>
                     <tbody>
                        {treatment9.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Tongue</div>
                     <tbody>
                        {treatment10.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}> Orthopedics</div>
                     <tbody>
                        {treatment11.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ marginTop:'10px',marginBottom:'10px',fontSize:'18px'}}>Others</div>
                     <tbody>
                        {treatment12.map((treatment, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px dashed' }}>{treatment.name}</td>
                                <td>{treatment.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                  
                </table>
            </div>
            <Contact />
            <Footer />
        </div>
    )
}
