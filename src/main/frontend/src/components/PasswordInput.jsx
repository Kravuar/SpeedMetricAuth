import {useState} from "react";

export default function PasswordInput() {
    const [password, setPassword] = useState("");
    const [intervals, setIntervals] = useState([]);

    let last = Date.now();

    const onKeyDown = (event) => {
        let key = event.key

        console.log(key.length);
        const nonWritable = key.length !== 1
        if (nonWritable) {
            event.preventDefault();
            return;
        }

        setIntervals([...intervals, Date.now() - last]);
        last = Date.now();
        setPassword(password + key);
    }

    const handleReset = () => {
        setIntervals([]);
        setPassword("");
    }

    return (
        <div className="">
            <input className="form-control my-1" type="text" onKeyDown={onKeyDown} readOnly
                   placeholder="Password..." value={password}/>
            <button className="container btn btn-outline-warning my-1" onClick={handleReset}>Reset</button>
        </div>
    );
}