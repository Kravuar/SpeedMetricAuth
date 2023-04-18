import {useRef} from "react";
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

  const onLogin = (username) => {
      // axiosConfigured.post(process.env.REACT_APP_API_URL + "/login",
      //     ({
      //         username: username,
      //         key: getKey()
      //     }))
      //     .then((resp) => alert.success(`Successfully logged in as ${username}. Token: ${resp.data}`))
      //     .catch((error) => alert.error(parseError(error)));
  }

  const onSignup = (username) => {
      // axiosConfigured.post(process.env.REACT_APP_API_URL + "/signup",
      //     ({
      //         username: username,
      //         key: getKey()
      //     }))
      //     .then(() => alert.success(`Successfully signed up as ${username}.`))
      //     .catch((error) => alert.error(parseError(error)));
  }

  return (
    <div className="container my-5 py-3 px-3 shadow">
      <Form onLogin={onLogin} onSignup={onSignup}/>
    </div>
  );
}