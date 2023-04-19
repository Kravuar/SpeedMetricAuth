import Form from "./components/Form";
import axios from "axios";
import {useAlert} from "react-alert";

const axiosConfigured = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default function App() {
  const alert = useAlert();

  const parseError = (error) => {
      return error.response.data.messages.join(' ');
  }

  const onLogin = (username, passwordInput) => {
      axiosConfigured.post(process.env.REACT_APP_API_URL + "/login",
          ({
              username: username,
              ...passwordInput
          }))
          .then((resp) => alert.success(`Успешная авторизация под именем ${username}. Токен: ${resp.data}`))
          .catch((error) => alert.error(parseError(error)));
  }

  const onSignup = (username, passwordInput) => {
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
      <Form onLogin={onLogin} onSignup={onSignup}/>
    </div>
  );
}