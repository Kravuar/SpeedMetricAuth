import {useRef} from "react";

export default function Form({onLogin, onSignup}) {
    const username = useRef(null);

    return(
        <div className="container centered">
            <div className="row my-2">
                <input className="form-control my-1" type="text" placeholder="Username..." name="username" ref={username}/>
                <button className="btn btn-outline-success my-1" onClick={() => onLogin(username.current.value)}>Login</button>
                <button className="btn btn-outline-success my-1" onClick={() => onSignup(username.current.value)}>Signup</button>
            </div>
        </div>
    );
}