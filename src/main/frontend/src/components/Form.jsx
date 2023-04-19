import {useRef} from "react";

export default function Form({onSubmit, authAction, Input}) {
    const username = useRef(null);
    const passwordInput = useRef(null);

    return(
        <div className="container centered">
            <div className="my-2">
                <input className="form-control my-1" type="text" placeholder="Username..." name="username" ref={username}/>
                <Input ref={passwordInput}/>
                <div className="mx-3 my-3 px-3 py-3 row rounded shadow">
                    <button className="btn btn-outline-success my-1" onClick={() => onSubmit(username.current.value, passwordInput.current.passwordInput())}>{authAction}</button>
                </div>
            </div>
        </div>
    );
}