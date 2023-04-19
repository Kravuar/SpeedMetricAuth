import {useRef} from "react";
import PasswordInput from "./PasswordInput";

export default function Form({onLogin, onSignup}) {
    const username = useRef(null);
    const passwordInput = useRef(null);

    return(
        <div className="container centered">
            <div className="my-2">
                <input className="form-control my-1" type="text" placeholder="Username..." name="username" ref={username}/>
                <PasswordInput ref={passwordInput}/>
                <div className="mx-3 my-3 px-3 py-3 row rounded shadow">
                    <button className="btn btn-outline-success my-1" onClick={() => onLogin(username.current.value, passwordInput.current.passwordInput())}>Login</button>
                    <button className="btn btn-outline-success my-1" onClick={() => onSignup(username.current.value, passwordInput.current.passwordInput())}>Signup</button>
                </div>
            </div>
        </div>
    );
}