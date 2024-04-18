import React, { useEffect, useState } from "react";
import Amount from './imagesscouts/rupee.png'
import Person from './imagesscouts/person.png'
import Treatment from './imagesscouts/treatment.png'
import Doctor from './imagesscouts/doctor.png'
import { CopyAll, Download, WhatsApp } from "@mui/icons-material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";
import routes from "../layout/Routes";
import { getDoctorDataById, getParentDoctorDataById, getParentSCoutDataById, getScoutDataById } from "./actioncreator";
import OverviewUi from './overview'
import { FaAngleDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const MainScout = () => {

    const [tabType, settabType] = useState('txn')
    const [objectData, setOjectData] = useState([])
    const [filter, setfilter] = useState('');

    const handlefilters = (type) => {
        setfilter((prevFilter) => (prevFilter === type ? '' : type));
    }
    let navigate = useNavigate()
    useEffect(() => {
        if (window.sessionStorage.getItem('scoutMobile') === 'null' || window.sessionStorage.getItem('scoutMobile') === null) {
            navigate(routes.SCOUTS_MAIN)

        } else {
            if (window.sessionStorage.getItem('role') === 'SCOUT') {
                getScoutDataById(window.sessionStorage.getItem('scoutId'), callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
            }
            if (window.sessionStorage.getItem('role') === 'DOCTOR') {
                getDoctorDataById(window.sessionStorage.getItem('doctorId'), callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
            }
            if (window.sessionStorage.getItem('role') === 'PARENT_DOCTOR') {
                getParentDoctorDataById(window.sessionStorage.getItem('parentDoctorId'), callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
            }
            if (window.sessionStorage.getItem('role') === 'PARENT_SCOUT') {
                getParentSCoutDataById(window.sessionStorage.getItem('parentScoutId'), callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        setOjectData(callback.data)
                    }
                })
            }
        }
    }, [])
    let data = {
        "status": 200,
        "data": [
            {
                "userId": "aQgFXXOc72YfqG52n8vMEiKrm57fxbvb",
                "loanId": "5XvyFE5BxO5TfQ7eNUZjPBNdoqggtMYN",
                "loanAmount": 15000,
                "loanReason": "Hair Patch",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "CHANDERKANT      ",
                "patientPhoneNo": 7056138879,
                "loanApplyDate": "2024-04-01 20:56:01.914",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Application",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "pgYooaGvoesaMarzRz9JOfKZzBjphP3K",
                "loanId": "0lwQbZjFdy1D5KW1oEhUzw9La7gf7PPO",
                "loanAmount": 120000,
                "loanReason": "Breast Implant",
                "clinicName": "Essence Cosmetic Surgery Center",
                "doctorName": "Dr. Deepak",
                "patientName": "Aarshi Galrani",
                "patientPhoneNo": 9163928703,
                "loanApplyDate": "2024-03-05 09:50:48.634",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Occupation",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Expired",
                "onboardingUrl": "http://52.66.174.28:3003/patient/Gautam_Buddha_Nagar/Essence_Cosmetic_Surgery_Center/Dr._Deepak/dGoHyWGEnUpHZ29FYbfISqeYq0ZX3dig/"
            },
            {
                "userId": "8FftbiuQZFLqA10OUXrwjpVVrawohENT",
                "loanId": "98ASElODaG1weKHpnFpdfI5wOZHvLFdL",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Rajkumar ",
                "patientPhoneNo": 9540662208,
                "loanApplyDate": "2023-10-25 09:30:08.699",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "IdcXK5ACSkDSo8SBQ7os0QB2n21zTELH",
                "loanId": "wZcUhlUxYuBFCPec3vToeZ2grlKZ8SzC",
                "loanAmount": 70000,
                "loanReason": "Santosh kumar",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Santosh kumar daas",
                "patientPhoneNo": 7206678312,
                "loanApplyDate": "2023-10-22 08:56:15.632",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "REJECTED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Ready to disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "IdcXK5ACSkDSo8SBQ7os0QB2n21zTELH",
                "loanId": "jwFSuDOFycdrwiwHTDsPcF1TlLqsGuDb",
                "loanAmount": 70000,
                "loanReason": "Santosh kumar",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Santosh kumar daas",
                "patientPhoneNo": 7206678312,
                "loanApplyDate": "2023-10-21 14:07:30.155",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "REJECTED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "bb8KrKxDrGtTVi9Nhl46mrQJfFWoSwfB",
                "loanId": "efPGhSijXvrjsWIf9nlzRswdfEX6NUbw",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Ajay Singh rajavat ",
                "patientPhoneNo": 9560311732,
                "loanApplyDate": "2023-10-21 11:22:25.748",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Approved",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "bb8KrKxDrGtTVi9Nhl46mrQJfFWoSwfB",
                "loanId": "efPGhSijXvrjsWIf9nlzRswdfEX6NUbw",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Ajay Singh rajavat ",
                "patientPhoneNo": 9560311732,
                "loanApplyDate": "2023-10-21 11:22:25.748",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SELF_EMPLOYED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Document Required",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "xYKu4cR0axgqwSweG3xSNBbhJGRruLri",
                "loanId": "641Jd7iyOmJKzM2lbhKe0IcqzfVQAPFE",
                "loanAmount": 50000,
                "loanReason": "Suraj kumar jha",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Suraj kumar jha",
                "patientPhoneNo": 8178147224,
                "loanApplyDate": "2023-10-20 20:10:30.471",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "REJECTED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Under Review",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "uQqoLViafb6X8yDquwZjSv3UdfdXFP6F",
                "loanId": "mjkwFJIeHayq2aP6qRitqbLetvcZB2Jh",
                "loanAmount": 10000,
                "loanReason": "Hair patch",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "RAVI      ",
                "patientPhoneNo": 8285251230,
                "loanApplyDate": "2023-10-20 12:50:40.223",
                "chanceOfApproval": 0.0,
                "esignUrl": "https://lnk.creditfair.in/2yhU",
                "loanStatus": "Disbursed",
                "employmentType": "SELF_EMPLOYED",
                "userActivity": "PUSHED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "2023-10-23 18:30:03.163",
                "type": "Disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "sx4NF99fgpLqyEukc8YNzcOtaBKk92bb",
                "loanId": "CokFzRNHBagsaODAiJCZebo9YC9xjIEs",
                "loanAmount": 50000,
                "loanReason": "Hair treatment ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "AJAY KUMAR ",
                "patientPhoneNo": 9069823656,
                "loanApplyDate": "2023-10-18 12:17:40.884",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SELF_EMPLOYED",
                "userActivity": "REJECTED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "gtiGLRTI8xoYOdYGqmFxgIp7dpiWmAEJ",
                "loanId": "HgqTACL1nSUaTrnXnQ8GPMagFs9ZUgqa",
                "loanAmount": 90000,
                "loanReason": "Hair treatment",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "FAISAL SHAFAT ALI ",
                "patientPhoneNo": 8505847426,
                "loanApplyDate": "2023-10-17 13:29:51.902",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Pending disbursal",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "omcGLwC7wfbHnitfvQ7lvtDNrRVO9HV5",
                "loanId": "fuaxifBPmguwlLvokQZLyHCTkLOGqfPL",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Ajeet Singh ",
                "patientPhoneNo": 9599896840,
                "loanApplyDate": "2023-10-16 09:35:10.396",
                "chanceOfApproval": 0.0,
                "esignUrl": "https://lnk.creditfair.in/ENYH",
                "loanStatus": "Disbursed",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "2023-10-21 10:25:05.51",
                "type": "Disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "omcGLwC7wfbHnitfvQ7lvtDNrRVO9HV5",
                "loanId": "fuaxifBPmguwlLvokQZLyHCTkLOGqfPL",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Ajeet Singh ",
                "patientPhoneNo": 9599896840,
                "loanApplyDate": "2023-10-16 09:35:10.396",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Disbursed",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "2023-10-21 10:25:05.51",
                "type": "Disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "bb8KrKxDrGtTVi9Nhl46mrQJfFWoSwfB",
                "loanId": "I5EEoBQsQVFJeQtvSVJJkXzM0hZ6GZjC",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Ajay Singh rajavat ",
                "patientPhoneNo": 9560311732,
                "loanApplyDate": "2023-10-15 15:18:47.265",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "bb8KrKxDrGtTVi9Nhl46mrQJfFWoSwfB",
                "loanId": "I5EEoBQsQVFJeQtvSVJJkXzM0hZ6GZjC",
                "loanAmount": 50000,
                "loanReason": "Hair transplant ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Ajay Singh rajavat ",
                "patientPhoneNo": 9560311732,
                "loanApplyDate": "2023-10-15 15:18:47.265",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SELF_EMPLOYED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "tutVWhBM77Gho9Q4WsBi08MaswfTUCng",
                "loanId": "gBis84c3KiYUAxL0R1BlKrHFMhjag8Ib",
                "loanAmount": 90000,
                "loanReason": "Hair Patch treatment ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "MINI BAKSHI ",
                "patientPhoneNo": 8377856357,
                "loanApplyDate": "2023-10-15 12:51:18.894",
                "chanceOfApproval": 0.0,
                "esignUrl": "https://lnk.creditfair.in/D2ez",
                "loanStatus": "Disbursed",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "BJHRHKsDFAC1I7JCHwTvwpEWoHgTsE8W",
                "loanId": "Q7HPHloobgqUqgSUkLbg1hUy4UODElac",
                "loanAmount": 500000,
                "loanReason": "Hair patches and hair treatment ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Rajan chauhan",
                "patientPhoneNo": 9910357207,
                "loanApplyDate": "2023-10-12 15:29:47.754",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "HzfwJCugibsPctvIzwsz5xDXMkE8eNI7",
                "loanId": "tqBMAZXX48RfyPiHjNOeslrbn2IxZN5f",
                "loanAmount": 100000,
                "loanReason": "Hair patch",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Sukesh kumar",
                "patientPhoneNo": 8130508677,
                "loanApplyDate": "2023-10-12 13:19:58.74",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "REJECTED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "ekYLLDPldtbb7LveNEtToejjR428N7Fa",
                "loanId": "L2kf52wx68aY9zYWOMtVnb7lL7F0TkEs",
                "loanAmount": 14000,
                "loanReason": "Hair ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "BRIJESH KUMAR ",
                "patientPhoneNo": 9559212965,
                "loanApplyDate": "2023-10-11 18:36:08.044",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "MOuADIyXyuwBVtV9fBTadc4yR2ZEfPrd",
                "loanId": "vsLGSMq34KwbfyG4Wa5GKtN3nZDahYkd",
                "loanAmount": 12000,
                "loanReason": "Hair",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "Sourabh bhati",
                "patientPhoneNo": 8851231008,
                "loanApplyDate": "2023-10-08 20:08:25.002",
                "chanceOfApproval": 0.0,
                "esignUrl": "https://lnk.creditfair.in/JidS",
                "loanStatus": "Approved",
                "employmentType": "SALARIED",
                "userActivity": "Register",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "e4r9rLxAtxBvAgmfczVL2SLDaox1ZYKH",
                "loanId": "pYVJ56p0nDC1Ipe2os1tYnWr0fJbz47Z",
                "loanAmount": 25000,
                "loanReason": "Hiar ",
                "clinicName": "Radiance hair studio",
                "doctorName": "Santosh kumar",
                "patientName": "RAMAN      ",
                "patientPhoneNo": 9540511209,
                "loanApplyDate": "2023-10-06 20:46:20.967",
                "chanceOfApproval": 0.0,
                "esignUrl": "https://lnk.creditfair.in/Pu5Z",
                "loanStatus": "Rejected",
                "employmentType": "SALARIED",
                "userActivity": "REJECTED",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/West_Delhi/Radiance_hair_studio/Santosh_kumar/5BFlnNZkXE3ZvK1toUgpCzFMFeku6WRU/"
            },
            {
                "userId": "KAQadwZE9RmjsUp57IWCzVZSTD4ga2Hs",
                "loanId": "7OB5mwdDsKAC0X9X28GabYSRWBhN0XjA",
                "loanAmount": 48000,
                "loanReason": "Veeners",
                "clinicName": "GoodSmyle Multispeciality Dental Care",
                "doctorName": "Surujean Surendiran",
                "patientName": "A MALLIKARJUNA ",
                "patientPhoneNo": 9916274275,
                "loanApplyDate": "2023-09-22 12:41:07.925",
                "chanceOfApproval": 0.0,
                "esignUrl": "https://lnk.creditfair.in/qDDn",
                "loanStatus": "Approved",
                "employmentType": "SALARIED",
                "userActivity": "Occupation",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangaluru/GoodSmyle_Multispeciality_Dental_Care/Surujean_Surendiran/74d1c8f5776643c597ab26d62619087d/"
            },
            {
                "userId": "f9CKCf7XqbAYoHTUtiazZHx5ZqaQhxGL",
                "loanId": "p0qKkQk6dJDC0INTp0KAwJVOTtU3yU41",
                "loanAmount": 120000,
                "loanReason": "Skin Treatment ",
                "clinicName": "Aurilueur Esthetic Clinic",
                "doctorName": "Abeena CA",
                "patientName": "PRANJALI ROY CHOUDHURY ",
                "patientPhoneNo": 8473806922,
                "loanApplyDate": "2023-09-16 14:45:54.296",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Occupation",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Application",
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangaluru/Aurilueur_Esthetic_Clinic/Abeena_CA/4244502445fd4712b736b3435b86fed2/"
            },
            {
                "userId": "7rDqAuVMdRqj65RYjZO5jmqqDTRxs31h",
                "loanId": "TRtfdTrYy2cT5fj9TrTcUoE0xZJ1rncr",
                "loanAmount": 140000,
                "loanReason": "Coolsculpting",
                "clinicName": "Aurilueur Esthetic Clinic",
                "doctorName": "Abeena CA",
                "patientName": "SUSEENDRANNARESH      ",
                "patientPhoneNo": 8667003093,
                "loanApplyDate": "2023-09-06 14:51:01.52",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Occupation",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Application",
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangaluru/Aurilueur_Esthetic_Clinic/Abeena_CA/4244502445fd4712b736b3435b86fed2/"
            },
            {
                "userId": "LXrjfmLmQ4h7rmjYWuJ8aAQo96rUem3S",
                "loanId": "nrZUygRIjlSWOqZwnaYLLKGp9ct5uLZS",
                "loanAmount": 50000,
                "loanReason": "Hair",
                "clinicName": "HAIRCOSMOS DIAGNOSTIC AND HEALTH CARE PRIVATE LIMITED",
                "doctorName": "Mr. Mohammed Junaid",
                "patientName": "Parthibanc",
                "patientPhoneNo": 8870341457,
                "loanApplyDate": "2023-09-02 16:22:58.533",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "SALARIED",
                "userActivity": "Occupation",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Application",
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/HAIRCOSMOS_DIAGNOSTIC_AND_HEALTH_CARE_PRIVATE_LIMITED/Mr._Mohammed_Junaid/AQ8UEg0jthKRpM3wnz16D03BNYcIQDqW/"
            },
            {
                "userId": "1bNO3llaLmpNCGgPdd8HrxSue65RIini",
                "loanId": "BQU9dZ0HKz2szNWt4PDLoIag7TdZD5Yf",
                "loanAmount": 59000,
                "loanReason": "Hair Transplant",
                "clinicName": "HAIRCOSMOS DIAGNOSTIC AND HEALTH CARE PRIVATE LIMITED",
                "doctorName": "Mr. Mohammed Junaid",
                "patientName": "Sk Nabab",
                "patientPhoneNo": 7890516335,
                "loanApplyDate": "2023-08-28 17:58:10.955",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/HAIRCOSMOS_DIAGNOSTIC_AND_HEALTH_CARE_PRIVATE_LIMITED/Mr._Mohammed_Junaid/AQ8UEg0jthKRpM3wnz16D03BNYcIQDqW/"
            },
            {
                "userId": "kcyP4PLSJ3CRktQnpKueoCAjwAsIu2yk",
                "loanId": "2ajb3chvNcNRvHWx6sFY7ScNWEk3Bw2G",
                "loanAmount": 35000,
                "loanReason": "Dental Treatment",
                "clinicName": "V G Kamala Multispeciality Clinic",
                "doctorName": "R Vinoda",
                "patientName": "Manjunath chandramouli",
                "patientPhoneNo": 9164359429,
                "loanApplyDate": "2023-08-22 21:58:24.474",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/V_G_Kamala_Multispeciality_Clinic/R_Vinoda/a4af6bb6f3404296b360079aa45e9276/"
            },
            {
                "userId": "5Lo2xcQ9hn5RJggopbI5RcsY6pEfdrj6",
                "loanId": "6GTWqRAXsRqLP2a3z4HxqEixE978Fr1M",
                "loanAmount": 85000,
                "loanReason": "Weight Loss Treatment",
                "clinicName": "Aurilueur Esthetic Clinic",
                "doctorName": "Abeena CA",
                "patientName": "Vinodh M",
                "patientPhoneNo": 8951764427,
                "loanApplyDate": "2023-07-31 18:03:10.575",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangaluru/Aurilueur_Esthetic_Clinic/Abeena_CA/4244502445fd4712b736b3435b86fed2/"
            },
            {
                "userId": "DSmJkZbViXGk4QiNY5N6QWFAcwHe2tam",
                "loanId": "Zr7U3cE4C55K1u5oOCL4J8FamPXIbtbH",
                "loanAmount": 37000,
                "loanReason": "Root canal and extraction ",
                "clinicName": "V G Kamala Multispeciality Clinic",
                "doctorName": "R Vinoda",
                "patientName": "Md Tanwir Akhtar",
                "patientPhoneNo": 8340349906,
                "loanApplyDate": "2023-07-31 14:34:20.756",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Disbursed",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Disbursed",
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/V_G_Kamala_Multispeciality_Clinic/R_Vinoda/a4af6bb6f3404296b360079aa45e9276/"
            },
            {
                "userId": "9fnbJDHkOGrPdzIGXDK2LiGOxBTvQNJ4",
                "loanId": "aLQsbnh4bNZI1QPNT7zDUWFGe9Z5p4eX",
                "loanAmount": 110000,
                "loanReason": "Implant",
                "clinicName": "V G Kamala Multispeciality Clinic",
                "doctorName": "R Vinoda",
                "patientName": "Ravi Ranjan",
                "patientPhoneNo": 9916257765,
                "loanApplyDate": "2023-07-21 12:57:54.025",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Rejected",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": "Rejected",
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/V_G_Kamala_Multispeciality_Clinic/R_Vinoda/a4af6bb6f3404296b360079aa45e9276/"
            },
            {
                "userId": "K8y9vaxNFTRUga2Y0vw5HuGLvOPYicUn",
                "loanId": "a42KzYjmBq4uB4uokzjcEpRRuNBucvmA",
                "loanAmount": 180000,
                "loanReason": "implamt",
                "clinicName": "Vogue Dental Studio",
                "doctorName": "Shameel Ahmed Shariff",
                "patientName": "M inayatpasha ",
                "patientPhoneNo": 9739090917,
                "loanApplyDate": "2023-07-19 04:12:19.302",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/Vogue_Dental_Studio/Shameel_Ahmed_Shariff/63aa069e26a54b76a4c50cda8017943d/"
            },
            {
                "userId": "5zym1qdgzKEriK32YS8R9vVsLAKv1FBL",
                "loanId": "RwSGD67RwimA68VpTMyyRfhhpBwYpW3I",
                "loanAmount": 85000,
                "loanReason": "implant",
                "clinicName": "Ayesha Dental Polyclinic",
                "doctorName": "Modinsab Nadaf",
                "patientName": "Shamshad Alam",
                "patientPhoneNo": 8789218313,
                "loanApplyDate": "2023-07-17 15:46:30.657",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangalore/Ayesha_Dental_Polyclinic/Modinsab_Nadaf/fb40a709b2d2445590199fe5938b768a/"
            },
            {
                "userId": "iEljgyFxjZVSdUB6PzVrabQSFDB4rLVj",
                "loanId": "UoNVbsddobDS9VY5Hn5kNygtkvvQExvp",
                "loanAmount": 125000,
                "loanReason": "Dental Treatment",
                "clinicName": "DentalDost",
                "doctorName": "Trismus Healthcare Technologies PVT Ltd ",
                "patientName": "Aditya Jain",
                "patientPhoneNo": 8087265498,
                "loanApplyDate": "2023-07-15 04:15:38.774",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Pune/DentalDost/Trismus_Healthcare_Technologies_PVT_Ltd_/IC2m6mQhOYFug0TqSWhOEReIL8vYoxxO/"
            },
            {
                "userId": "B9uoAyl17SEqDGRXGX1kY9QeMVj51ERQ",
                "loanId": "KjFs2O3WxzL7K0HMMazvyV5ABPq7FfVj",
                "loanAmount": 115000,
                "loanReason": "Dental treatment",
                "clinicName": "Pari Dental Care",
                "doctorName": "Sajin Sameer",
                "patientName": "Lalitha Mary",
                "patientPhoneNo": 8050827708,
                "loanApplyDate": "2023-07-13 08:50:41.32",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bengaluru/Pari_Dental_Care/Sajin_Sameer/vr1O2gDCKPRHErf2cV1ww6GTbDE4ZXCd/"
            },
            {
                "userId": "o9zQo5WBfJYZiwbagWGoJQFh4xbCxlc1",
                "loanId": "uJEqlNXSVCcMXeSUU9de4sFW1dOpVAIb",
                "loanAmount": 115000,
                "loanReason": "Medical ",
                "clinicName": "Aurilueur Esthetic Clinic",
                "doctorName": "Abeena CA",
                "patientName": "SAHANA karanam ",
                "patientPhoneNo": 9731034526,
                "loanApplyDate": "2023-05-26 10:22:05.139",
                "chanceOfApproval": 0.0,
                "esignUrl": "",
                "loanStatus": "Pending",
                "employmentType": "",
                "userActivity": "",
                "utrNo": "",
                "daUrl": null,
                "disberseDate": "2023-09-03 11:15:31.796",
                "type": null,
                "onboardingUrl": "http://52.66.174.28:3003/patient/Bangaluru/Aurilueur_Esthetic_Clinic/Abeena_CA/4244502445fd4712b736b3435b86fed2/"
            }
        ],
        "attachment": null,
        "message": "success"
    }
    const copyText = (data) => {
        const textToCopy = data // Change this to the actual text you want to copy
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard');
                alert('Text copied to clipboard')
                // Optionally, you can show a success message to the user
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                // Optionally, you can show an error message to the user
            });
    };


    return (
        <>
            <div className="over-view-component px-2 " style={{ zIndex: 1, position: 'sticky', top: '55px', width: '100%', background: '#fff', borderBottom: '5px solid #f2f2f2', paddingBottom: '10px' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '40%', fontSize: '20px', marginTop: '5px' }}>All loans</div>
                    <div className="text-center" style={{ width: '60%', background: '#ECEBFF', borderRadius: '5px', padding: '5px' }}>
                        <div style={{ width: '100%', display: 'flex' }}>
                            <div style={{ width: '50%' }}><button onClick={() => settabType('overview')} style={{ width: '100%', background: tabType === 'overview' ? '#fff' : 'transparent', outline: 'none', padding: '5px 4px', border: 'none', borderRadius: '5px', color: tabType === 'overview' ? '#8f8dbd' : '#000', fontSize: '12px' }} className="">Overview</button></div>
                            <div style={{ width: '50%' }}><button onClick={() => settabType('txn')} style={{ width: '100%', background: tabType === 'txn' ? '#fff' : 'transparent', outline: 'none', padding: '5px 4px', border: 'none', borderRadius: '5px', color: tabType === 'txn' ? '#8f8dbd' : '#000', fontSize: '12px' }} className="">Transaction</button></div>
                        </div>
                    </div>


                </div>
                {console.log(filter)}
                {/* <div className="dashboard">
                    <div className="filters">
                        <div className={`box ${filter === 'scouts' ? 'active' : ''}`} onClick={() => handlefilters('scouts')}>
                            <h5>Scouts (5)</h5> &nbsp;
                            <span><FaAngleDown /></span>
                        </div>
                        <div className={`box ${filter === 'amount' ? 'active' : ''}`} onClick={() => handlefilters('amount')}>
                            <h5>Amount</h5> &nbsp;
                            <span><FaAngleDown /></span>
                        </div>
                    </div>
                </div> */}

            </div>
            {tabType === 'txn' ?
                <div style={{ marginTop: '20px' }}>
                    {data.data.length > 0 && data.data && (data.data).map((carddata, i) => {
                        return (
                            <div className="txn-card">
                                <div className="mt-1" style={{ fontSize: '14px' }}>
                                    <img src={Amount} style={{ width: '25px' }} />&nbsp;{carddata.loanAmount}
                                </div>
                                <div className="mt-1" style={{ fontSize: '14px' }}>
                                    <img src={Person} style={{ width: '25px' }} />&nbsp;{carddata.patientName}
                                </div>
                                <div className="mt-1" style={{ fontSize: '14px' }}>
                                    <img src={Treatment} style={{ width: '25px' }} />&nbsp;{carddata.loanReason}
                                </div>
                                <div className="mt-1" style={{ fontSize: '14px' }}>
                                    <img src={Doctor} style={{ width: '25px' }} />&nbsp;{carddata.clinicName}
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '10px' }}>Applied at&nbsp; {carddata.loanApplyDate}</p>
                                <div>

                                    {carddata.type === 'Approved' ?
                                        <>
                                            <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#E0FFEB', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                                Approved
                                            </div>
                                            <div className="text-center">
                                                <a target="_blank" href={carddata.onboardingUrl}> <button className="carepay-button-card"><WhatsApp />&nbsp;Share link</button></a>
                                            </div>
                                            <div className="approved-div"><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Approved</div>
                                        </>
                                        : ""}
                                    {carddata.type === 'Application' ?
                                        <div className="text-center" style={{ background: '#D6F5FF', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                            Application
                                        </div>
                                        : ""}
                                    {carddata.type === 'Under Review' ?
                                        <>

                                            <div className="d-flex w-100">
                                                <div style={{ width: '50%' }}>
                                                    <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>
                                                    <div className="text-center" style={{ width: '50%', background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                                        Under Review
                                                    </div>
                                                </div>

                                                &nbsp;&nbsp;
                                                <div style={{ width: '50%', textAlign: 'center' }}>
                                                    <div style={{ marginTop: '-10px', fontSize: '12px', marginLeft: '10px' }}>Expect decision by:</div>
                                                    <div className="text-center" style={{ float: 'right', background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                                        not in api
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="approved-div" style={{
                                                background: carddata.chanceOfApproval <= 20 ? '#EE6E6E' :
                                                    (carddata.chanceOfApproval > 20 && carddata.chanceOfApproval <= 50 ? '#E4900A' : '')
                                            }}>
                                                {carddata.chanceOfApproval}% Chances of approval
                                            </div>
                                        </>
                                        : ""}
                                    {carddata.type === 'Document Required' ?
                                        <>
                                            {/* <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>

                                        <div className="text-center" style={{ background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '160px', borderRadius: '5px', fontSize: '12px' }}>
                                            Document Required
                                        </div> */}
                                            <div style={{ background: '#FFEEE4', borderRadius: '5px', borderLeft: '4px solid #E4900A', fontSize: '12px', padding: '8px' }}>Bank Statement, ITR, Owned House Proof</div>
                                            <div className="d-flex w-100 mt-3">
                                                <div style={{ width: '50%' }}>
                                                    <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>
                                                    <div className="text-center" style={{ background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '160px', borderRadius: '5px', fontSize: '12px' }}>
                                                        Document Required
                                                    </div>
                                                </div>

                                                &nbsp;&nbsp;
                                                <div style={{ width: '50%', textAlign: 'center' }}>
                                                    <div style={{ marginTop: '-10px', fontSize: '12px', marginLeft: '10px' }}>Expect decision by:</div>
                                                    <div className="text-center" style={{ float: 'right', background: '#FFEEE4', color: '#C44D0E', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                                        not in api
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="approved-div" style={{
                                                background: carddata.chanceOfApproval <= 20 ? '#EE6E6E' :
                                                    (carddata.chanceOfApproval > 20 && carddata.chanceOfApproval <= 50 ? '#E4900A' : '')
                                            }}>
                                                {carddata.chanceOfApproval}% Chances of approval
                                            </div>
                                        </>
                                        : ""}
                                    {carddata.type === 'eSign & eMandate' ?
                                        <>
                                            <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#E0FFEB', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                                eSign & eMandate
                                            </div>
                                            <div className="approved-div"><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Approved</div>

                                        </>
                                        : ""}
                                    {carddata.type === 'Pending disbursal' ?
                                        <>
                                            <div style={{ marginTop: '-10px', fontSize: '12px' }}>Status:</div>
                                            <div className="text-center" style={{ background: '#E0FFEB', color: '#13906A', padding: '5px', width: '150px', borderRadius: '5px', fontSize: '12px' }}>
                                                Pending disbursal
                                            </div>
                                            <div className="text-center">
                                                <a target="_blank" href={carddata.onboardingUrl}> <button className="carepay-button-card"><Download />&nbsp;Download D.A.</button></a>
                                            </div>
                                            <div className="approved-div"><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Approved</div>

                                        </>
                                        : ""}
                                    {carddata.type === 'Disbursed' ?
                                        <>
                                        {carddata.utrNo?
                                            <div className="w-100 d-flex">
                                                <div style={{ color: '#00000066', fontSize: '12px' }} className="w-50">
                                                    UTR : {carddata.utrNo}
                                                </div>
                                                
                                                <div className="w-50" style={{ color: '#00000066', fontSize: '12px', textAlign: 'right' }}>
                                                    <CopyAll onClick={() => copyText(carddata.utrNo)} />&nbsp;Copy
                                                </div>
                                            </div>
                                            :""}
                                            <div className="approved-div" style={{ background: '#857FC2' }}><DoneAllIcon style={{ fontSize: '14px' }} />&nbsp;Disbursed at {carddata.disberseDate}</div>
                                        </>
                                        : ""}



                                </div>

                            </div>
                        )
                    })}


                </div>
                : ""}
            {tabType === 'overview' ?
                <OverviewUi handlefilters={handlefilters} filter={filter} setfilter={setfilter} />
                : ""}
{
          filter === 'scouts' ?

          <div className="over-view-component background-blur">
            <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'scouts' ? 'show' : ''}`}>
              <div className="filterscout">
                <div className="filterbox">
                  <h5>Scouts</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                </div>
                <div className="checkboxes">
                  <div class="mb-3 form-check checkboxgrp">
                    <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                    <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                  </div>
                  <div class="mb-3 form-check checkboxgrp">
                    <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                    <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                  </div>
                </div>
                <div className="row filter-btn">
                  <button className='apply-filter'>Apply Filter</button>
                </div>
              </div>
            </div>
            </div>
            : filter === 'amount' ?
            <div className="over-view-component background-blur">

              <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'amount' ? 'show' : ''}`}>
                <div className="filterscout">
                  <div className="filterbox">
                    <h5>Amount</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                  </div>
                  <div className="inputsamount">
                    <div className="inputboxes">
                      <label htmlFor="minamount" className='iconruppee'>₹</label>
                      <input type="number" name="" className='amount' id='minamount' placeholder='Minimum amount' min='0' />
                    </div>
                    <h5>TO</h5>
                    <div className="inputboxes">
                      <label htmlFor="maxamount" className='iconruppee'>₹</label>
                      <input type="number" name="" className='amount' id='maxamount' placeholder='Maximum amount' min='0' />
                    </div>
                  </div>
                  <div className="row filter-btn">
                    <button className='apply-filter'>Apply Filter</button>
                  </div>
                </div>
              </div>
              </div>
              : ''}

        </>
    )
}
export default MainScout