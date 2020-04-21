import React, { Component } from "react";
import Navbar from "../components/Navbar";
import eventoservice from "../lib/eventoservice";

class CrearEvento extends Component {
  state = {
    nombre: "",
    lugar: "",
    descripcion: "",
    listadoEventos: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getInfo = () => {
    eventoservice
      .getEvento()
      .then((listadoEventos) => {
        this.setState({ listadoEventos: listadoEventos.data });
      })
      .catch((err) =>
        console.log("Este error pertenece a pagina ocio.js:", err)
      );
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const id = this.props.match.params
    const { nombre, lugar, descripcion } = this.state;
    eventoservice.createEvento({ id, nombre, lugar, descripcion });
    await this.getInfo();
    this.props.history.push("/evento");
  };

  render() {
    const { nombre, descripcion, lugar } = this.state;
    return (
      <>
        <Navbar />
        <div>
          <form onSubmit={this.handleFormSubmit} className="perfil-form">
            <label>Nombre de evento:</label>
            <input
              type="text"
              name="nombre"
              placeholder="Introduce el nombre del evento"
              className="authinput"
              value={nombre}
              onChange={this.handleChange}
            />

            <label>Lugar del evento:</label>
            <input
              type="text"
              name="lugar"
              placeholder="Ej. Barcelona"
              className="authinput"
              value={lugar}
              onChange={this.handleChange}
            />

            <label>Descripción evento:</label>
            <textarea
              name="descripcion"
              className="descripcion-evento"
              value={descripcion}
              onChange={this.handleChange}
            />

            <input
              type="submit"
              value="Crear Evento"
              className="buttontosubmit"
            />
          </form>
        </div>
      </>
    );
  }
}

export default CrearEvento;
