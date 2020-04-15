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
      photo_url: "",
    };
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { nombre, apellido, edad, photo_url } = this.state;
    const id = this.state.infoUser._id;
    auth.edit({ id, nombre, apellido, edad, photo_url });
    await this.getUserInfo();
    this.props.history.push("/perfil");
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

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const { nombre, apellido, edad } = this.state;
    return (
      <>
        <Navbar />
        <div>
          <form onSubmit={this.handleFormSubmit} className="alignform">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              placeholder={this.state.infoUser.nombre}
              className="authinput"
              value={nombre}
              onChange={this.handleChange}
            />

            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              placeholder={this.state.infoUser.apellido}
              className="authinput"
              value={apellido}
              onChange={this.handleChange}
            />

            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              placeholder={this.state.infoUser.edad}
              className="authinput"
              value={edad}
              onChange={this.handleChange}
            />

            <input type="submit" value="Save" className="buttontosubmit" />
          </form>
          <Link to={`/perfil`}>Back to your profile</Link>
        </div>
      </>
    );
  }
}

export default withAuth(PerfilDetailed);
