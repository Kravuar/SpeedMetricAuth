import {forwardRef, useImperativeHandle, useState} from "react";
import {mean} from "../Utils";

function SpeedInput({_}, ref) {
    const [password, setPassword] = useState("");
    const [intervals, setIntervals] = useState([]);

    let last = Date.now();

    useImperativeHandle(ref, () => ({
        passwordInput: () => {
            const trueIntervals = intervals.slice(1);
            const metric = mean(trueIntervals);
            const deviation = Math.sqrt(mean(trueIntervals.map(interval => (interval - metric) ** 2)));
            return ({
                password: password,
                metric: metric,
                deviation: deviation
            });
        },
        handleReset: handleReset
    }));

    const onKeyDown = (event) => {
        let key = event.key

        if (key === "Backspace") {
            handleReset();
            return;
        }
        const nonWritable = key.length !== 1
        if (nonWritable) {
            event.preventDefault();
            return;
        }

        let timestamp = Date.now();
        setIntervals([...intervals, timestamp - last])
        setPassword(password + key);
        last = timestamp;
    }

    const handleReset = () => {
        setIntervals([]);
        last = Date.now();
        setPassword("");
    }

    return (
        <div>
            <input className="form-control my-1" type="text" onKeyDown={onKeyDown} readOnly
                   placeholder="Password..." value={password}/>
            <button className="container btn btn-outline-warning" onClick={handleReset}>Reset</button>
        </div>
    );
}

export default forwardRef(SpeedInput);