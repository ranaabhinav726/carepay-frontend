import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../../comps/Header";
import { getBankListApi } from "../../servicesAndUtility/api";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import routes from "../../../../../layout/Routes";
import axios from "axios";
import { env } from "../../../../environment/environment";

export default function DataVerified() {
    const navigate = useNavigate();
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [banks, setBanks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [customBank, setCustomBank] = useState("");
    const [listType, setListType] = useState("view");
    const [treatment, setTreatment] = useState("");

    let doctorId = localStorage.getItem("doctorId")
    let doctorName = localStorage.getItem("doctorName")
    let userId = localStorage.getItem("userId");
   let borrower=localStorage.getItem('borrower')
    const servicableForMyself = [
        "Infertility Treatment (Other than IVF)", "In vitro fertilization (IVF)", "MTPs",
        "Diagnostic Laparoscopy", "Minor Surgeries like Polyp, Fibroid etc.", "Therapeutic Curettage",
        "Small operations of Uterus, Cervix etc.", "Small operations of Fallopian tube, Vagina etc.",
        "Lithotripsy", "Hydrocele", "Piles / Fistula", "Prostate", "Varicose Veins",
        "Colonoscopy / Gastroscopy", "Appendectomy", "Cystoscopic removal of stones",
        "Ultrasound guided aspirations", "Hernia", "Hair transplant", "Stretch mark removal",
        "Facelift", "Rhinoplasty", "Liposuction", "Tummy tuck", "Breast Augmentation",
        "Breast Reduction and Breast Lift", "Gynecomastia (Male Breast Reduction)",
        "Vulvovaginal", "Buttock Augmentation", "Buttock Lift", "Blepharoplasty (Eyelid surgery)",
        "Rhinoplasty (Nose Surgery)", "Otoplasty (Ear Pinning)", "Brow lift",
        "Chin Augmentation", "Malar or Cheek Augmentation", "Chemical Peel", "Botulinum toxin or Botox",
        "Soft Tissue Fillers", "Stem Cell Enriched Fat Graft", "Fat Injection/Fat Grafting",
        "Cleft Lip and Cleft Palate", "Dental Implants / Crowns & Bridges",
        "Removable Partial Dentures (Imported)", "Removable Partial Denture (Flexible)",
        "Upper and Lower Complete Denture (Imported)", "E-Max Metal Free Crown / Veneer – Metal Free",
        "Ceramil / Azir (Zirconia Crowns) – Metal Free", "Zoom Advanced Whitening (3 Cycles)",
        "Ant.RCT/ Post.RCT or Re-RCT", "Ceramic Fillings/Inlay (Per Tooth)", "Dental Jewellery (Dental Crystal)",
        "Composite Bonding", "Componeers", "Night Guard", "Dental Diode Laser", "Diode Laser Frenectomy",
        "Laser Gum Contouring", "Laser Depigmentation", "Full Mouth Scaling & Polishing", "Deep Scaling (Curretage)",
        "Gum- Flap Surgery", "Bone Grafting", "Gum Graft", "Extraction", "Impaction / Wisdom Tooth Removal",
        "Biopsy", "Apicectomy", "Sinuslift", "Braces (Metallic) Full Mouth", "Metallic- Self Ligating (Damon)",
        "ORTHODONTI - BRACES TREATEMENT", "Clear Aligners Invisible Braces (Clear Path)",
        "Clear Aligners Invisible Braces (Invisalign)", "Clear Aligners Invisible Braces (Others)",
        "Braces (Ceramic) Full Mouth", "Invisalign", "Cataract operation.", "Removal of foreign body.",
        "Corneal transplant", "Tear duct operations.", "Ptosis", "Lasik Surgery", "Glaucoma",
        "Squint", "Vitreous surgery (Vitreoretinal surgery)", "Retinal Detachment", "Ossiculoplasty",
        "Functional Endoscopic Sinus Surgery", "Stapedectomy.", "Microlaryngeal surgery",
        "Foreign body removal.", "Tympanoplasty.", "Glossectomy", "Frenuloplasty", "Reconstruction of the tongue.",
        "Closed reduction of fractures", "Operations of tendons / Tendon sheath", "Arthroscopic Knee Aspiration",
        "Reduction of dislocations", "Dialysis", "Angiography"
    ];

    const servicableForSomeoneElse = servicableForMyself.concat([
        "Heart Attack", "Stroke", "Kidney Failure", "Multiple Sclerosis",
        "Parkinson Disease", "Alzheimer’s Disease", "Paralysis", "Muscular Dystrophy",
        "Cardiomyopathy", "Loss of Speech", "Chronic Aplastic Anemia", "Organ Transplants(All Types)",
        "Hepatitis", "Coronary Artery, By-Pass Surgery Disease", "Head Trauma", "Angioplasty",
        "BMT", "Operable Cancers", "Early-Stage Cancers", "Heart Valve Surgery",
        "Pediatric Cancers", "Neurosurgeries", "RTA", "Brain Surgery"
    ]);

    const notServiceable = [
        "Bacterial Meningitis", "End Stage Renal Disease", "End Stage Liver Disease",
        "Sepsis", "HIV", "COMA", "End Stage Lung and Liver Cancer", "Blood Cancers Adults",
        "Third Degree Burns", "Terminal Illness", "Encephalitis"
    ];

    useEffect(() => {
        getBankListApi((callback) => {
            const formattedBanks = callback.data.map((bank, index) => ({
                id: index + 1,
                name: bank.bankName,
                logo: getBankLogo(bank.bankName),
                bankId:bank.bankId
            }));
            setBanks(formattedBanks);
            console.log(formattedBanks)
         
        });
    }, []);

    const getBankLogo = (bankName) => {
        switch (bankName) {
            case "SBI":
                return require("../../../../assets/Bankslogos/Banks Logo/SBI Logo.png");
            case "HDFC Bank":
                return require("../../../../assets/Bankslogos/Banks Logo/HDFC bank logo.png");
            case "ICICI":
                return require("../../../../assets/Bankslogos/Banks Logo/ICICI Logo.png");
            case "Axis":
                return require("../../../../assets/Bankslogos/Banks Logo/Axis logo.png");
            case "Kotak":
                return require("../../../../assets/Bankslogos/Banks Logo/Kotak Logo.png");
            case "IndusInd":
                return require("../../../../assets/Bankslogos/Banks Logo/Indusind Logo.png");
            case "Federal Bank":
                return require("../../../../assets/Bankslogos/Banks Logo/Federal Bank Logo.png");
            case "IDFC":
                return require("../../../../assets/Bankslogos/Banks Logo/IDFC Logo.png");
            case "RBL Bank":
                return require("../../../../assets/Bankslogos/Banks Logo/RBL Logo.png");
            case "YES Bank":
                return require("../../../../assets/Bankslogos/Banks Logo/Yes bank logo.png");
            default:
                return null;
        }
    };

    const handleBankSelection = (bankId) => {
        console.log(bankId)
        setSelectedBanks((prevSelected) =>
            prevSelected.includes(bankId)
                ? prevSelected.filter((id) => id !== bankId)
                : [...prevSelected, bankId]
        );
    };

    const searchHandler = (e) => {
        setSearchTerm(e.target.value);
        setListType(e.target.value ? "list" : "view");
    };

    const handleAddCustomBank = () => {
        if (customBank.trim() === "") return;
        const newBank = {
            id: banks.length + 1,
            name: customBank.trim(),
            logo: null,
        };
        setBanks([...banks, newBank]);
        setSelectedBanks([...selectedBanks, newBank.bankId]);
        setCustomBank("");
    };

    const filteredBanks = banks.filter(bank =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedBanks = banks.slice(0, 6);
    useEffect(() => {
        if (!!userId) {
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.status === 200) {
                        let data = response.data.data;
                        if (!!data) {
                            setTreatment(data.loanReason);
                        }
                    }
                }).catch(() => {

                });
        }
    }, [])
    const saveDataCredit=()=>{
        if (treatment !== 'Other') {
            if (borrower === 'myself') {
                if (servicableForMyself.includes(treatment)) {
                    // navigate(routes.ARTH_PERSONAL_DETAILS);
                    axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
                        .then(response => {
                            if (response.data.data === 'true' && response.data.message === 'success') {
                                navigate(routes.FLEX_WAIT_SCREEN)
                            } else {
                                // navigate(routes.RAZORPAY_OFFERS);
                                axios.get(env.api_Url + 'getActiveFlow')
                                    .then((response) => {
                                        if (response.data.data === 'PAYU') {
                                            axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                            .then((loandata) => {
                                                const loanId = loandata?.data?.data?.loanId;
                                                if (loanId) {
                                                    axios
                                                        .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                        .then(response => {
                                                            console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                            axios
                                                                .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                .then(eligibilityResponse => {
                                                                    console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                    if (eligibilityResponse.data.message === 'success') {
                                                                        navigate(routes.PAY_SCREEN)
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    console.error('Error fetching customer eligibility:', err);
                                                                });
                                                        })
                                                        .catch(err => {
                                                            console.error('Error fetching checkout details:', err);
                                                        });
                                                } else {
                                                    console.error('Loan ID not found');
                                                }
                                            })
                                            .catch(err => {
                                                console.error('Error fetching loan details:', err);
                                            });
                                        }
                                        if (response.data.data === 'RAZORPAY') {
                                            navigate(routes.RAZORPAY_OFFERS)
                                        }
                                        if (response.data.data === 'MASTER') {
                                            navigate(routes.ARTH_PERSONAL_DETAILS)


                                        }
                                    }
                                    )
                            }


                        }).catch(() => {

                        });
                    // navigate(routes.FLEX_WAIT_SCREEN)
                } else if (notServiceable.includes(treatment)) {
                    navigate(routes.NOT_SERVICEABLE);
                } else {
                    navigate(routes.NOT_SERVICEABLE);
                }
            } else if (borrower === 'someone else') {
                if (servicableForSomeoneElse.includes(treatment)) {
                    if (!notServiceable.includes(treatment)) {
                        // navigate(routes.ARTH_PERSONAL_DETAILS);
                        // navigate(routes.FLEX_WAIT_SCREEN)
                        axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
                            .then(response => {
                                console.log(response.data)
                                if (response.data.data === 'true' && response.data.message === 'success') {
                                    navigate(routes.FLEX_WAIT_SCREEN)
                                } else {
                                    axios.get(env.api_Url + 'getActiveFlow')
                                        .then((response) => {
                                            if (response.data.data === 'PAYU') {
                                                axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                    .then((loandata) => {
                                                        const loanId = loandata?.data?.data?.loanId;
                                                        if (loanId) {
                                                            axios
                                                                .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                                .then(response => {
                                                                    console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                    axios
                                                                        .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                        .then(eligibilityResponse => {
                                                                            console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                            if (eligibilityResponse.data.message === 'success') {
                                                                                navigate(routes.PAY_SCREEN)
                                                                            }
                                                                        })
                                                                        .catch(err => {
                                                                            console.error('Error fetching customer eligibility:', err);
                                                                        });
                                                                })
                                                                .catch(err => {
                                                                    console.error('Error fetching checkout details:', err);
                                                                });
                                                        } else {
                                                            console.error('Loan ID not found');
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.error('Error fetching loan details:', err);
                                                    });
                                            }
                                            if (response.data.data === 'RAZORPAY') {
                                                navigate(routes.RAZORPAY_OFFERS)
                                            }
                                            if (response.data.data === 'MASTER') {
                                                navigate(routes.ARTH_PERSONAL_DETAILS)


                                            }
                                        }
                                        )
                                    // navigate(routes.ARTH_PERSONAL_DETAILS);
                                    // navigate(routes.RAZORPAY_OFFERS);
                                    axios.get(env.api_Url + 'getActiveFlow')
                                        .then((response) => {
                                            if (response.data.data === 'PAYU') {
                                                axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                .then((loandata) => {
                                                    const loanId = loandata?.data?.data?.loanId;
                                                    if (loanId) {
                                                        axios
                                                            .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                            .then(response => {
                                                                console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                axios
                                                                    .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                    .then(eligibilityResponse => {
                                                                        console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                        if (eligibilityResponse.data.message === 'success') {
                                                                            navigate(routes.PAY_SCREEN)
                                                                        }
                                                                    })
                                                                    .catch(err => {
                                                                        console.error('Error fetching customer eligibility:', err);
                                                                    });
                                                            })
                                                            .catch(err => {
                                                                console.error('Error fetching checkout details:', err);
                                                            });
                                                    } else {
                                                        console.error('Loan ID not found');
                                                    }
                                                })
                                                .catch(err => {
                                                    console.error('Error fetching loan details:', err);
                                                });
                                            }
                                            if (response.data.data === 'RAZORPAY') {
                                                navigate(routes.RAZORPAY_OFFERS)
                                            }
                                            if (response.data.data === 'MASTER') {
                                                navigate(routes.ARTH_PERSONAL_DETAILS)


                                            }
                                        }
                                        )
                                }


                            }).catch(() => {

                            });
                    } else {
                        navigate(routes.NOT_SERVICEABLE);
                    }
                } else {
                    navigate(routes.NOT_SERVICEABLE);
                }
            }
        } else if (treatment === 'Other') {
            // navigate(routes.ARTH_PERSONAL_DETAILS);
            // navigate(routes.FLEX_WAIT_SCREEN)
            axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
            .then(response => {
                if (response.data.data === 'true' && response.data.message === 'success') {
                    navigate(routes.FLEX_WAIT_SCREEN)
                } else {
                    // navigate(routes.ARTH_PERSONAL_DETAILS);
                    // navigate(routes.RAZORPAY_OFFERS);
                    axios.get(env.api_Url + 'getActiveFlow')
                        .then((response) => {
                            if (response.data.data === 'PAYU') {
                                axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                .then((loandata) => {
                                    const loanId = loandata?.data?.data?.loanId;
                                    if (loanId) {
                                        axios.post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                            .then(response => {
                                                console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                axios.get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                    .then(eligibilityResponse => {
                                                        console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                        if (eligibilityResponse.data.message === 'success') {
                                                            navigate(routes.PAY_SCREEN)
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.error('Error fetching customer eligibility:', err);
                                                    });
                                            })
                                            .catch(err => {
                                                console.error('Error fetching checkout details:', err);
                                            });
                                    } else {
                                        console.error('Loan ID not found');
                                    }
                                })
                                .catch(err => {
                                    console.error('Error fetching loan details:', err);
                                });
                            }
                            if (response.data.data === 'RAZORPAY') {
                                navigate(routes.RAZORPAY_OFFERS)
                            }
                            if (response.data.data === 'MASTER') {
                                navigate(routes.ARTH_PERSONAL_DETAILS)


                            }
                        }
                        )
                }


            }).catch(() => {

            });

        }
    }
    const saveUsersBankInformation = () => {
        axios.post(env.api_Url + 'saveUsersBankInformation', {
          userId: userId,
          banksList: selectedBanks
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('Response:', response.data);
          saveDataCredit()
        })
        .catch(error => {
          console.error('Error saving bank information:', error);
        });
      };

    return (
        <main className="bankDetails personalDetails " style={{ position: "relative" }}>
            <Header progressbarDisplay="block" progress="80" canGoBack={routes.ARTH_CREDIT_DETAILS} />
            <h3>Banks Selection</h3>
            <div style={{ background: '#FAE1CD', borderRadius: '5px', padding: '7px 9px' }}>
                <p><b>Important:</b> Kindly select all your banks with active accounts for a better experience.</p>
            </div>
            <input
                onChange={searchHandler}
                className="scout-search"
                style={{ width: '100%', marginTop: '5px' }}
                placeholder="Search bank by name"
                value={searchTerm}
            />
            {listType === "list" && searchTerm && filteredBanks.length > 0 && (
                <div style={{
                    border: "1px solid #ECEBFF",
                    borderRadius: "5px",
                    padding: "5px",
                    backgroundColor: "#FFF",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 100,
                    marginTop: "10px",
                    position: "relative"
                }}>
                    {filteredBanks.map(bank => (
                        <div
                            key={bank.bankId}
                            style={{
                                display: "flex", alignItems: "center", padding: "10px", cursor: "pointer",
                                backgroundColor: selectedBanks.includes(bank.bankId) ? '#DFF0D8' : 'transparent', 
                            }}
                            onClick={() => handleBankSelection(bank.bankId)}
                        >
                            {bank.logo ? (
                                <img src={bank.logo} alt={`${bank.name} logo`} style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                            ) : (
                                <AccountBalanceIcon style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                            )}
                            <span>{bank.name}</span>
                        </div>
                    ))}
                </div>
            )}
         <div className="" style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
    {displayedBanks.map((bank) => (
        <div key={bank.bankId}  style={{ display: "flex", alignItems: "center", justifyContent: 'left' }}>
            <div className="bankinput-checkbox" style={{
                border: '2px solid #ECEBFF',
                borderRadius: '5px',
                padding: '5px 12px',
                boxSizing: 'border-box',
            }}>
                <label htmlFor={`bank-checkbox-${bank.bankId}`} style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}>
                    {bank.logo ? (
                        <img src={bank.logo} alt={`${bank.name} logo`} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                    ) : (
                        <AccountBalanceIcon style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                    )}
                    <div className="bankinput-checkbox round">
                        <input
                            type="checkbox"
                            id={`bank-checkbox-${bank.bankId}`}
                            checked={selectedBanks.includes(bank.bankId)}
                            onChange={() => handleBankSelection(bank.bankId)}
                            style={{ marginRight: "10px" }}
                        />
                        <label htmlFor={`bank-checkbox-${bank.bankId}`} ></label>
                    </div>
                </label>
                <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '5px' }}>{bank.name}</div>
            </div>
        </div>
    ))}
</div>


            <div className="bankinput-checkbox" style={{ marginTop: "20px" }}>
                <h4>Selected Banks:</h4>
                <div style={{ marginTop: "20px" }}>
                    {selectedBanks.map(bankId => {
                        const bank = banks.find(b => b.bankId === bankId);
                        return bank ? (
                            <div key={bank.bankId} style={{ display: 'flex', alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: '10%' }}>
                                    {bank.logo ? (
                                        <img src={bank.logo} alt={`${bank.name} logo`} style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                                    ) : (
                                        <AccountBalanceIcon style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                                    )}
                                </div>
                                <div style={{ width: '80%' }}>
                                    {bank.name}
                                </div>
                                    <div className="round">

                                        <input
                                            type="checkbox"
                                            id={`selected-bank-checkbox-${bank.bankId}`}
                                            checked={selectedBanks.includes(bankId)}
                                            onChange={() => handleBankSelection(bankId)}
                                            style={{ marginRight: "10px", width: '15px', height: '15px', float: 'right' }}
                                        />
                                        <label  htmlFor={`bank-checkbox-${bank.bankId}`}></label>

                                    </div>

                            </div>
                        ) : null;
                    })}
                </div>
                {console.log(selectedBanks)}
            </div>
            <button className="submit"onClick={()=>saveUsersBankInformation()}>
                Continue with selected banks
            </button>
        </main>
    );
}
