import Health from "../assets/images/Health professional team-amico 1.svg";
import Patients from "../assets/images/Insurance-amico 1.svg";
import Attract from "../assets/images/Attract.svg";
import Satisfaction from "../assets/images/Satisfaction.svg";
import PaymentDelays from "../assets/images/PaymentDelays.svg";
import Affordable from "../assets/images/Affodable.svg";
import FlexiblePayment from "../assets/images/FlexiblePayment.svg";
import LoanApproval from "../assets/images/LoanApproval.svg";

const products = [
  {
    id: 1,
    title: "Doctors",
    img: Health,
    top: -426,
    left: -18,
    paddingTop: "10rem",
    contents: [
      {
        id: 1,
        title: "Attract More Patients:",
        desc: "Offer flexible payment options and make your services more accessible.",
        img: Attract,
      },
      {
        id: 2,
        title: "Increased Patient Satisfaction:",
        desc: "Provide patients with a stress-free payment experience.",
        img: Satisfaction,
      },
      {
        id: 3,
        title: "Reduce Payment Delays:",
        desc: "Ensure timely payments with CarePay's reliable EMI plans.",
        img: PaymentDelays,
      },
    ],
  },
  {
    id: 2,
    title: "Patients",
    img: Patients,
    top: -426,
    left: -16,
    paddingTop: "10rem",
    contents: [
      {
        id: 1,
        title: "Afforfable Heathcare:",
        desc: "Enjoy the benefits of elective treatments without worrying about the costs.",
        img: Affordable,
      },
      {
        id: 2,
        title: "Flexible Payment Options:",
        desc: "Choose from 3 or 6 zero cost EMIs to suit your financial needs.",
        img: FlexiblePayment,
      },
      {
        id: 3,
        title: "Real-Time Loan Approval:",
        desc: "Get instant loan approval with better rates then traditional banks and credit card companies.",
        img: LoanApproval,
      },
    ],
  },
];

export default products;
