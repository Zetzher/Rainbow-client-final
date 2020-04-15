import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import casita from "../images/icono-casita.svg";
import salir from "../images/logout.png";
import registrarse from "../images/registro1.png";
import perfil from "../images/perfil.png";
import ocio from "../images/ocio.png";
import evento from "../images/eventos.png";
import loguearse from "../images/login.png";

class Navbar extends Component {
  render() {
    const { logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        {isLoggedin ? (
          <>
            <div className="navbarfooter">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="position-buttons-navbar">
                  <img
                    src={casita}
                    alt="icono home"
                    className="casita-navbar"
                  ></img>
                  <h5>Home</h5>
                </div>
              </Link>
              <Link to="/perfil" style={{ textDecoration: "none" }}>
                <div className="position-buttons-navbar">
                  <img
                    src={perfil}
                    alt="icono perfil"
                    className="casita-navbar"
                  ></img>
                  <h5>Perfil</h5>
                </div>
              </Link>
              <Link to="/ocio" style={{ textDecoration: "none" }}>
                <div className="position-buttons-navbar">
                  <img
                    src={ocio}
                    alt="icono ocio"
                    className="casita-navbar"
                  ></img>
                  <h5>Ocio</h5>
                </div>
              </Link>
              <Link to="/evento" style={{ textDecoration: "none" }}>
                <div className="position-buttons-navbar">
                  <img
                    src={evento}
                    alt="icono evento"
                    className="casita-navbar"
                  ></img>
                  <h5>Eventos</h5>
                </div>
              </Link>

              <button className="navbar-button" onClick={logout}>
                <img
                  src={salir}
                  alt="icono logout"
                  className="casita-navbar"
                ></img>
                <h5>Logout</h5>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="navbarfooter">
              <Link to="/" style={{ textDecoration: "none" }}>
                <img
                  src={casita}
                  alt="icono home"
                  className="casita-navbar"
                ></img>
                 <h5>Home</h5>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <img
                  src={registrarse}
                  alt="icono registro"
                  className="casita-navbar"
                ></img>
                 <h5>Registro</h5>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <img
                  src={loguearse}
                  alt="icono loguearse"
                  className="casita-navbar"
                ></img>
                 <h5>Ingresar</h5>
              </Link>
            </div>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
