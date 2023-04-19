import axios from "axios";

export const mean = array => array.reduce((a, b) => a + b, 0) / array.length;
export const parseError = error => error.response.data.messages.join(' ');

export const axiosConfigured = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});