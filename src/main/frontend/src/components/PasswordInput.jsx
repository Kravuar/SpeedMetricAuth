import {forwardRef, useImperativeHandle, useState} from "react";
import {mean} from "../Utils";
import {useAlert} from "react-alert";

export function PasswordInput({}, ref) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState(null);
    const [intervals, setIntervals] = useState([]);
    const [metrics, setMetrics] = useState([]);

    let last = Date.now();


    useImperativeHandle(ref, () => ({
        passwordInput: () => {
            const meanMetric = mean(metrics);
            const meanDeviation = mean(metrics.map(metric => metric - meanMetric));
            return ({
                password: currentPassword,
                metric: meanMetric,
                deviation: meanDeviation
            });
        }
    }));

    const onKeyDown = (event) => {
        let key = event.key

        const nonWritable = key.length !== 1
        if (nonWritable) {
            event.preventDefault();
            return;
        }

        let timestamp = Date.now();
        setIntervals([...intervals, timestamp - last])
        setCurrentPassword(currentPassword + key);
        last = timestamp;
    }

    const handleReset = () => {
        setIntervals([]);
        last = Date.now();
        setCurrentPassword("");
    }

    const alert = useAlert();
    const handleNextTry = () => {
        if (intervals.length === 0)
            alert.error(`Для начала закончите текущую попытку.`)
        setMetrics([...metrics, mean(intervals.slice(1))])
        setIntervals([]);
        last = Date.now();
        setCurrentPassword("");
    }

    const confirmPassword = () => {
        alert.success(`Пароль подтверждён. Повторяйте ввод пароля, для... короче вводи давай.`);
        setPassword(currentPassword);
        handleReset();
    }

    return (
        <div className="">
            <input className="form-control my-1" type="text" onKeyDown={onKeyDown} readOnly
                   placeholder="Password..." value={currentPassword}/>
            {password
                ? <div className="row">
                    <button className="col container btn btn-outline-warning my-1 mx-1" onClick={handleReset}>Reset Try</button>
                    <button className="col container btn btn-outline-primary my-1 mx-1" onClick={handleNextTry}>Next Try</button>
                  </div>
                : <button className="col container btn btn-outline-primary my-1 mx-1" onClick={confirmPassword}>Confirm Password</button>
            }
        </div>
    );
}

export default forwardRef(PasswordInput);