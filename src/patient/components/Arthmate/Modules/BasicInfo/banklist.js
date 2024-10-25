import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import routes from "../../../../../layout/Routes";
import ScreenTitle from "../../comps/ScreenTitle";
import { Header } from "../../comps/Header";

// Import bank logos (update paths as needed)
import sbiLogo from "../../../../assets/Bankslogos/Banks Logo/SBI Logo.png";
import hdfcLogo from "../../../../assets/Bankslogos/Banks Logo/HDFC bank logo.png";
import iciciLogo from "../../../../assets/Bankslogos/Banks Logo/ICICI Logo.png";
import axisLogo from "../../../../assets/Bankslogos/Banks Logo/Axis logo.png";
import kotakLogo from "../../../../assets/Bankslogos/Banks Logo/Kotak Logo.png";
// Import more logos as needed

export default function DataVerified() {
    const navigate = useNavigate();
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [banks, setBanks] = useState([
        { id: 1, name: "State Bank of India", logo: sbiLogo },
        { id: 2, name: "HDFC Bank", logo: hdfcLogo },
        { id: 3, name: "ICICI Bank", logo: iciciLogo },
        { id: 4, name: "Axis Bank", logo: axisLogo },
        { id: 5, name: "Kotak Mahindra Bank", logo: kotakLogo },
        // Add more banks with logos as needed
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [customBank, setCustomBank] = useState("");

    useEffect(() => {
        // Any initialization logic if needed
    }, []);

    const handleBankSelection = (bankId) => {
        setSelectedBanks((prevSelected) =>
            prevSelected.includes(bankId)
                ? prevSelected.filter((id) => id !== bankId)
                : [...prevSelected, bankId]
        );
    };

    const searchHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddCustomBank = () => {
        if (customBank.trim() === "") return;
        const newBank = {
            id: banks.length + 1,
            name: customBank.trim(),
            logo: null, // Custom banks won't have a logo initially
        };
        setBanks([...banks, newBank]);
        setSelectedBanks([...selectedBanks, newBank.id]);
        setCustomBank("");
    };

    // Filter banks based on the search term
    const filteredBanks = banks.filter(bank =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="bankDetails personalDetails" style={{ position: "relative" }}>
            <Header progressbarDisplay="block" progress="80" canGoBack={routes.ARTH_CREDIT_DETAILS} />
            <h3>Banks selection</h3>
            <div style={{ background: '#FAE1CD', borderRadius: '5px', padding: '7px 9px' }}>
                <p><b>Important:</b> Kindly select all your banks with active accounts for a better experience.</p>
            </div>
            <div style={{ padding: '0px 0px' }}>
                <input
                    onChange={searchHandler}
                    className="scout-search"
                    style={{ width: '100%', marginTop: '5px' }}
                    placeholder="Search bank by name"
                    value={searchTerm}
                />
            </div>
            <div style={{ marginTop: "10px", maxHeight: "200px", overflowY: "auto" }}>
                {filteredBanks.map((bank) => (
                    <div key={bank.id} style={{ margin: "5px 0", display: "flex", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                checked={selectedBanks.includes(bank.id)}
                                onChange={() => handleBankSelection(bank.id)}
                                style={{ marginRight: "10px" }}
                            />
                            {bank.logo && (
                                <img src={bank.logo} alt={`${bank.name} logo`} style={{ width: "30px", height: "30px", marginRight: "10px" }} />
                            )}
                            {bank.name}
                        </label>
                    </div>
                ))}
                {searchTerm && !filteredBanks.some(bank => bank.name.toLowerCase() === searchTerm.toLowerCase()) && (
                    <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                checked={customBank !== ""}
                                onChange={() => {}}
                                disabled
                            />
                            <input
                                type="text"
                                placeholder="Add your bank"
                                style={{ marginLeft: "10px", width: "70%" }}
                                value={customBank}
                                onChange={(e) => setCustomBank(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddCustomBank()}
                            />
                            <button onClick={handleAddCustomBank} style={{ marginLeft: "5px" }}>Add</button>
                        </label>
                    </div>
                )}
            </div>
        </main>
    );
}
