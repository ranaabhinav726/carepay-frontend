import React from 'react';

const LogoGrid = ({ userData }) => {
    if (!userData || !Array.isArray(userData.bankLogo) || userData.bankLogo.length === 0) {
        return null;
    }

    return (
        <div className="logo-grid">
            {userData.bankLogo.map((logo, index) => (
                logo && <img key={index} src={logo} alt={`Bank Logo ${index}`} className="bank-logo" />
            ))}
        </div>
    );
};

export default LogoGrid;
