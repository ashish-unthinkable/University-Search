import axios from "axios";

export const GET = (url) => {
    return axios.get(url);
}

export const POST = (url, formData) => {
    return axios.post(url, formData)
}

export const PATCH = (url, updatedData) => {
    return axios.patch(url, updatedData);
}
