import { useEffect, useState } from "react";

export default function Timer({ seconds = 10, onTimerEnd }) {

    const [resendTime, setResendTime] = useState(seconds);
    let min = Math.floor(resendTime / 60);
    let sec = resendTime % 60;

    function reduceTime() {
        setResendTime((resendTime) => resendTime - 1);
    }
    useEffect(() => {
        if (resendTime === 0) {
            onTimerEnd();
            return;
        }
        const interval = setInterval(() => reduceTime(), 1000);
        return () => clearInterval(interval);
    }, [resendTime])

    return (
        <span>{` ${min} : ${sec}`}</span>
    )
}