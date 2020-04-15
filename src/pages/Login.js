import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <section className="auth-background">
        <Navbar />
        <div className="authform">
          <h1>Iniciar sesión</h1>

          <form onSubmit={this.handleFormSubmit} className="alignform">
            <label>Username:</label>
            <input
              type="text"
              name="email"
              placeholder="Escribe aquí tu username"
              className="authinput"
              value={email}
              onChange={this.handleChange}
            />

            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="authinput"
              value={password}
              onChange={this.handleChange}
            />

            <input type="submit" value="Login" className="buttontosubmit" />
          </form>
          <span>¿Quieres registrarte?</span>
          <Link to={"/signup"}> Signup</Link>
        </div>
      </section>
    );
  }
}

export default withAuth(Login);
