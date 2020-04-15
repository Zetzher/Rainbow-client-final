import axios from "axios";

class Ocio {
  constructor() {
    this.ocio = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getOcio() {
    return this.ocio
      .get("/ocio")
      .then((data) => (data))
      .catch((err) => console.log("error from ocio:", err));
  }
}

const ocioExports = new Ocio();
export default ocioExports;
