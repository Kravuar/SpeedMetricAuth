import Form from "../components/Form";
import {axiosConfigured, parseError} from "../Utils";
import MeanInput from "../components/MeanInput";
import {useAlert} from "react-alert";

export default function SignupPage() {
    const alert = useAlert();

    const onSubmit = (username, passwordInput) => {
        axiosConfigured.post(process.env.REACT_APP_API_URL + "/signup",
            ({
                username: username,
                ...passwordInput
            }))
            .then(() => alert.success(`Успешная регистрация под именем ${username}.`))
            .catch((error) => alert.error(parseError(error)));
    }

    return (
        <div className="container my-5 py-3 px-3 shadow">
            <Form onSubmit={onSubmit} Input={MeanInput} authAction="Signup"/>
        </div>
    );
}