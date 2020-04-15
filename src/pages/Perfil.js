import React, { Component } from "react";
import Navbar from "../components/Navbar";
import auth from "./../lib/auth-service";
import { Link } from "react-router-dom";

class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      infoUser: {},
    };
  }
  getUserInfo = () => {
    auth
      .perfil()
      .then((user) => {
        this.setState({ infoUser: user });
      })
      .catch(
        (err) => console.log(err)
      );
  };

  componentDidMount() {
    this.getUserInfo();
  }

  shouldComponentUpdate(state, prevState) {
    return (
      JSON.stringify(prevState.infoUser) !== JSON.stringify(state.infoUser)
    );
  }

  render() {
    return (
      <>
        <Navbar />
        <div>
          <h2>Nombre: {this.state.infoUser.nombre}</h2>
          <h2>Apellido: {this.state.infoUser.apellido}</h2>
          <h2>Edad: {this.state.infoUser.edad}</h2>
          <h2>Foto: {this.state.infoUser.photo_url}</h2>

          <Link to={`/perfil/edit/${this.state.infoUser._id}`}>
            <button className="navbar-button">Edit Profile</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Perfil;
