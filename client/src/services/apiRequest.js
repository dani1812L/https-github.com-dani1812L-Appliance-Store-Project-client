import axios from "axios";

const apiGet = async (url, data) => {
    try {
        const resp = await axios({
            method: "GET",
            url,
            data
        })
        return resp
    } catch (error) {
        throw error;
    }
}
const apiPost = async (url, data) => {
    try {
        const resp = await axios({
            method: "POST",
            url,
            data
        })
        return resp
    } catch (error) {
        throw error;
    }
}
const apiPut = async (url, data) => {
    try {
        const resp = await axios({
            method: "PUT",
            url,
            data
        })
        return resp
    } catch (error) {
        throw error;
    }
}
const apiDelete = async (url, data) => {
    try {
      const resp = await axios({
        method: "DELETE",
        url,
        data,
      });
      return resp;
    } catch (error) {
      throw error;
    }
  };  


export { apiGet, apiPost, apiPut, apiDelete }