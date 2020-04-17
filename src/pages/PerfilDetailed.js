import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import auth from "../lib/auth-service";
import { withAuth } from "../lib/AuthProvider";

class PerfilDetailed extends Component {
  constructor() {
    super();
    this.state = {
      infoUser: {},
      nombre: "",
      apellido: "",
      edad: "",
      photo_url: ""
    };
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { nombre, apellido, edad, photo_url } = this.state;
    const id = this.state.infoUser._id;
    await auth.edit({ id, nombre, apellido, edad, photo_url })
    this.setState({infoChange: true})
  };

  getUserInfo = () => {
    auth
      .perfil()
      .then((user) => {
       this.setState({ infoUser: user });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (event) => {
  const uploadData = new FormData();
  uploadData.append("photo_url", event.target.files[0]);
  const fileName = event.target.files[0].name
  
  auth.handleUpload(uploadData)
  .then(response =>{
   this.setState({photo_url: response.photo_url, fileName: fileName})
  })
  .catch(err => {console.log("Error while uploading the file: ", err)});
  } 
  


  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    const { nombre, apellido, edad, photo_url } = this.state;
    return (
      <>
        <Navbar />
        <div>
          <form onSubmit={this.handleFormSubmit}  className="perfil-form">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              placeholder={this.state.infoUser.nombre}
              className="auth-input"
              value={nombre}
              onChange={this.handleChange}
            />

            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              placeholder={this.state.infoUser.apellido}
              className="auth-input"
              value={apellido}
              onChange={this.handleChange}
            />

            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              placeholder={this.state.infoUser.edad}
              className="auth-input"
              value={edad}
              onChange={this.handleChange}
            />

            <label>Foto:</label>
            <input
              type="file"
              name="photo_url"
              className="image_photo_url"
              onChange={(e) => this.handleFileUpload(e)}
            />
{ 
  this.state.infoChange ? <Link to="/perfil" style={{ textDecoration: "none" }}><p className="buttontoprofile">Vuelve a tu perfil</p></Link> :  <input type="submit" value="Save" className="buttontosubmit" />
}
           
          </form>
          
        </div>
      </>
    );
  }
}

export default withAuth(PerfilDetailed);
