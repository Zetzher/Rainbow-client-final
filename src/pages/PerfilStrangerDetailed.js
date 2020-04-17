import React, { Component } from "react";
import Navbar from "../components/Navbar";
import auth from "../lib/auth-service";
import { Link } from "react-router-dom";

class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      infoUser: {},
    };
  }
  getUserInfo = () => {
    const idStranger = this.props.match.params.id;
    auth
      .perfilStranger(idStranger)
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
    console.log(this.state.infoUser)
    return (
      <>
        <Navbar />
        <div className='background-profile'>
        <div className="profile">
          <div><img src={this.state.infoUser.photo_url} className="image_photo_url"></img></div>
          <h2 className="info-profile">Nombre: <h3 className="subinfo-profile">{this.state.infoUser.nombre}</h3></h2>
          <h2 className="info-profile">Apellido: <h3 className="subinfo-profile">{this.state.infoUser.apellido}</h3></h2>
          <h2 className="info-profile">Edad: <h3 className="subinfo-profile">{this.state.infoUser.edad}</h3></h2>
        </div>
        <div className="button-edit-profile">
          <Link to={`/evento`}>
            <button><h2 className="edit-profile">Vuelve a los eventos</h2></button>
          </Link>
        </div>
        </div>
      </>
    );
  }
}

export default Perfil;
