const emailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const panFormat = /(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/;
const gstinFormat = /(^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9]{1})$)/;
const IFSCFormat = /(^[A-Z]{4}0[A-Z0-9]{6}$)/;

export const PersonalDetailsValidation = (Data) => {

    if ((Data?.phonenumber === '' || Data?.phonenumber === undefined) && Data?.phonenumber?.length != 10) {
        return { status: false, msg: "Please Enter Phone Number", field: 'phoneNumber' };
    }

    if (Data?.fullname === '' || Data?.fullname === undefined) {
        return { status: false, msg: "Please Enter Name", field: 'fullname' };
    }
    if (Data?.pan === '' || Data?.pan === undefined) {
        return { status: false, msg: "Please Enter Pan Number", field: 'pan' };
    }else if (!panFormat.test(Data?.pan)) {
        return { status: false, msg: "Please Enter Valid Pan Number", field: 'pan' };
    }

    if (Data?.emailid === '' || Data?.emailid === undefined) {
        return { status: false, msg: "Please Enter E-mail", field: 'email' };
    }
    else if (!emailFormat.test(Data?.emailid)) {
        return { status: false, msg: "Please Enter Valid E-mail", field: 'email' };
    }

    if (Data?.dob === '' || Data?.dob === undefined ) {
        return { status: false, msg: "Please Select Date of Birth", field: 'dateofbirth' };
    }

    return { status: true, msg: '' };

}

export const PracticeDetailsValidation = (Data) => {

    if ((Data?.licensenumber === '' || Data?.licensenumber === undefined)) {
        return { status: false, msg: "Please Enter License number", field: 'licensenumber' };
    }

    if (Data?.specialty === '' || Data?.specialty === undefined) {
        return { status: false, msg: "Please Select Specialty", field: 'Specialty' };
    }
    if (Data?.clinicname === '' || Data?.clinicname === undefined) {
        return { status: false, msg: "Please Enter Clinic Name", field: 'clinicname' };
    }

    if (Data?.DateOfEstablishment === '' || Data?.DateOfEstablishment === undefined) {
        return { status: false, msg: "Please Select Date of establishment of clinic/hospital", field: 'DateOfEstablishment' };
    }
    

    if (Data?.nameOfBusinessEntity === '' || Data?.nameOfBusinessEntity === undefined ) {
        return { status: false, msg: "Please Enter Full Name of Business Entity", field: 'nameOfBusinessEntity' };
    }
    if (Data?.typeOfEntity === '' || Data?.typeOfEntity === undefined) {
        return { status: false, msg: "Please Select Type of Entity", field: 'typeOfEntity' };
    }
    if (Data?.CINnumber === '' || Data?.CINnumber === undefined ) {
        return { status: false, msg: "Please Enter CIN/LLPIN", field: 'CINnumber' };
    }
    if (Data?.GSTINnumber === '' || Data?.GSTINnumber === undefined ) {
        return { status: false, msg: "Please Enter GSTIN", field: 'GSTINnumber' };
    }else if (!gstinFormat.test(Data?.GSTINnumber)) {
        return { status: false, msg: "Please Enter Valid GSTIN", field: 'GSTINnumber' };
    }

    return { status: true, msg: '' };

}

export const AddressDetailsValidation = (Data) => {

    if (Data?.building === '' || Data?.building === undefined) {
        return { status: false, msg: "Please Enter Building Name", field: 'building' };
    }

    if (Data?.locality === '' || Data?.locality === undefined) {
        return { status: false, msg: "Please Locality Name", field: 'locality' };
    }
    if (Data?.pincode === '' || Data?.pincode === undefined) {
        return { status: false, msg: "Please Enter Pincode Number", field: 'pincode' };
    }

    if (Data?.city === '' || Data?.city === undefined) {
        return { status: false, msg: "Please Enter City Name", field: 'city' };
    }
    

    if (Data?.state === '' || Data?.state === undefined ) {
        return { status: false, msg: "Please Select State", field: 'state' };
    }

    return { status: true, msg: '' };

}

export const BankDetailsValidation = (Data) => {

    if (Data?.accountNumber === '' || Data?.accountNumber === undefined){
        return { status: false, msg: "Please Enter Account Number", field: 'accountNumber' };
    }else if (Data?.accountNumber?.length > 25){
        return { status: false, msg: "Please Enter Valid Account Number", field: 'accountNumber' };
    }
    if (Data?.accountNumber?.length > 0 && Data?.confirmaccountNumber !== Data?.accountNumber){
        return { status: false, msg: "This Field Dosen't Match with Account Number", field: 'confirmaccountNumber' };
    }
    if (Data?.accountHolderName === '' || Data?.accountHolderName === undefined){
        return { status: false, msg: "Please Enter Account Holder's Name", field: 'accountHolderName' };
    }
    if (Data?.IFSC === '' || Data?.IFSC === undefined){
        return { status: false, msg: "Please Enter IFSC Code", field: 'IFSC' };
    }else if(!IFSCFormat.test(Data?.IFSC)){
        return { status: false, msg: "Please Valid IFSC Code", field: 'IFSC' };
    }
    if (Data?.accountType === '' || Data?.accountType === undefined){
        return { status: false, msg: "Please Select Account Type", field: 'accountType' };
    }
    if (Data?.bankName === '' || Data?.bankName === undefined){
        return { status: false, msg: "Please Enter Bank Name", field: 'bankName' };
    }
    if (Data?.branchName === '' || Data?.branchName === undefined){
        return { status: false, msg: "Please Enter Branch Name", field: 'branchName' };
    }

    

    return { status: true, msg: '' };

}

export const DocumentDetailsValidation = (Data) => {

    if (Data?.pan === ''){
        return { status: false, msg: "Please Upload PAN Documents", field: 'pan' };
    }
    if (Data?.medicalLicense === ''){
        return { status: false, msg: "Please Upload Medical License", field: 'medicalLicense' };
    }
    if (Data?.gstin === ''){
        return { status: false, msg: "Please Upload GSTIN Documents", field: 'gstin' };
    }

    if (Data?.termsCondition === false){
        return { status: false, msg: "Please Check This Field", field: 'termsCondition' };
    }
    return { status: true, msg: '' };

}