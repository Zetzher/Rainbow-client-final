import React, { Component } from "react";
import evento from "../lib/eventoservice";

class EditEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      nombre: "",
      descripcion: "",
      lugar: "",
    };
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { nombre, descripcion, lugar } = this.state;
    const id = this.state.id;
    evento.editEvento(id, nombre, descripcion, lugar);
    await this.getInfo();
    this.props.history.push("/evento");
  };

  getInfo = () => {
    evento
      .getEvento()
      .then((listadoocio) => {
        this.setState({ listadoocio: listadoocio.data });
      })
      .catch((err) =>
        console.log("Este error pertenece a pagina ocio.js:", err)
      );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { nombre, descripcion, lugar } = this.state;
    const id = this.state.info;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="alignform ">
          <h1 className="editevento-title">Edita tu evento</h1>

          <label>Nombre de evento:</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del evento"
            className="authinput"
            value={nombre}
            onChange={this.handleChange}
          />

          <label>Lugar del evento:</label>
          <input
            type="text"
            name="lugar"
            placeholder="Lugar del evento"
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

          <input type="submit" value="Editar" className="buttontosubmit" />
        </form>
      </div>
    );
  }
}
export default EditEvento;
