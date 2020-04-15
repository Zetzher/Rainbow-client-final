import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";

class Signup extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signup({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <section className="auth-background">
        <div className="authform">
          <Navbar />
          <h1>Crea tu cuenta</h1>

          <form onSubmit={this.handleFormSubmit} className="alignform">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Escribe aquí tu email"
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

            <input type="submit" value="Signup" className="buttontosubmit" />
          </form>

          <span>¿Tienes una cuenta?</span>
          <Link to={"/login"}> Login</Link>
        </div>
      </section>
    );
  }
}

export default withAuth(Signup);
