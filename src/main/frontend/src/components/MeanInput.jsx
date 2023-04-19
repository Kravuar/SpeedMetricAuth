import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {mean} from "../Utils";
import {useAlert} from "react-alert";
import SpeedInput from "./SpeedInput";

function MeanInput({_}, ref) {
    const [password, setPassword] = useState(null);
    const [metrics, setMetrics] = useState([]);
    const passwordInput = useRef(null);

    useImperativeHandle(ref, () => ({
        passwordInput: () => {
            const meanMetric = mean(metrics.map(metric => metric.metric));
            const deviation = mean(metrics.map(metric => metric.deviation));
            return ({
                password: password,
                metric: meanMetric,
                deviation: deviation
            });
        }
    }));

    const alert = useAlert();
    const handleNextTry = () => {
        const tryData = passwordInput.current.passwordInput();
        if (tryData.password === "") {
            alert.error(`Для начала закончите текущую попытку.`);
            return;
        }
        if (tryData.password !== password)
            alert.error(`Неверно введён пароль. Попробуйте ещё раз.`);
        else {
            alert.success(`Попытка засчитана, продолжайте.`);
            setMetrics([...metrics, ({metric: tryData.metric, deviation: tryData.deviation})]);
        }
        passwordInput.current.handleReset();
    }

    const confirmPassword = () => {
        const tryData = passwordInput.current.passwordInput();
        setPassword(tryData.password);
        alert.success(`Пароль подтверждён. Повторяйте ввод пароля, для усреднения данных.`);
        passwordInput.current.handleReset();
    }

    return (
        <div className="">
            <SpeedInput ref={passwordInput}/>
            { password
                ? <button className="col container btn btn-outline-primary my-1" onClick={handleNextTry}>Next Try</button>
                : <button className="container btn btn-outline-primary my-1" onClick={confirmPassword}>Confirm Password</button>
            }
        </div>
    );
}

export default forwardRef(MeanInput);