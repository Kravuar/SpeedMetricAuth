import Form from "../components/Form";
import SpeedInput from "../components/SpeedInput";
import {axiosConfigured, parseError} from "../Utils";
import {useAlert} from "react-alert";

export default function LoginPage() {
    const alert = useAlert();

    const onSubmit = (username, passwordInput) => {
        console.log(passwordInput);
        axiosConfigured.post(process.env.REACT_APP_API_URL + "/login",
            ({
                username: username,
                ...passwordInput
            }))
            .then((resp) => alert.success(`Успешная авторизация под именем ${username}. Токен: ${resp.data}`))
            .catch((error) => alert.error(parseError(error)));
    }

    return (
        <div className="container my-5 py-3 px-3 shadow">
            <Form onSubmit={onSubmit} Input={SpeedInput} authAction="Login"/>
        </div>
    );
}