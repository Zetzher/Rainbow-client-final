import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }
  signup({ email, password }) {
    return this.auth
      .post("/signup", { email, password })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/login", { email, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/logout", {}).then(({ data }) => data);
  }

  default() {
    return this.auth.get("/").then(({ data }) => data);
  }

  perfil() {
    return this.auth.get("/perfil").then(({ data }) => data);
  }

  edit({ id, nombre, apellido, edad, photo_url }) {
    return this.auth
      .put(`/perfil/edit/${id}`, { nombre, apellido, edad, photo_url })
      .then(({ data }) => data);
  }

  handleUpload( thefile ) {
    return this.auth
    .post('/perfil/upload', thefile)
    .then ( res => res.data )
    .catch (err => console.log(err))
  }
  
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
