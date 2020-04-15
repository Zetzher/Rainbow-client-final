import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import perfil from "../images/perfil.png";
import salir from "../images/logout.png";
import ocio from "../images/ocio.png";
import evento from "../images/eventos.png";
import loguearse from "../images/login.png";
import registrarse from "../images/registro1.png";

class Homepage extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;

    return (
      <div className="homepage_background">
        <header>
          <h1>
            <span className="light-red">W</span>
            <span className="light-orange">e</span>
            <span className="light-yellow">l</span>
            <span className="light-green">c</span>
            <span className="light-blue">o</span>
            <span className="light-purple">m</span>
            <span className="light-red">e </span>
            <br></br>
            <span className="light-orange">t</span>
            <span className="light-yellow">o </span>
            <br></br>
            <span className="light-green">y</span>
            <span className="light-blue">o</span>
            <span className="light-purple">u</span>
            <span className="light-red">r </span>
            <br></br>
            <span className="light-orange">A</span>
            <span className="light-yellow">P</span>
            <span className="light-green">P</span>
          </h1>
        </header>
        <nav className="navbar">
          {isLoggedin ? (
            <>
              <div className="navbarfooter">
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
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="navbarfooter">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                <div className="position-buttons-navbar">
                  <img
                    src={registrarse}
                    alt="icono home"
                    className="casita-navbar"
                  ></img>
                   <h5>Registro</h5>
                   </div>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                <div className="position-buttons-navbar">
                  <img
                    src={loguearse}
                    alt="icono loguearse"
                    className="casita-navbar"
                  ></img>
                   <h5>Ingresar</h5>
                   </div>
                </Link>
              </div>
            </>
          )}
        </nav>
        ); } }
      </div>
    );
  }
}

export default withAuth(Homepage);
