import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import evento from "../lib/eventoservice";

class Evento extends Component {
  state = {
    nombre: "",
    lugar: "",
    descripcion: "",
    listadoocio: [],
  };

  getInfo = () => {
    evento
      .getevento()
      .then((listadoocio) => {
        this.setState({ listadoocio: listadoocio.data });
      })
      .catch((err) =>
        console.log("Este error pertenece a pagina ocio.js:", err)
      );
  };

  deleteElement = async (id) => {
    const updatedList = [...this.state.listadoocio].filter((element) => {
      return element._id !== id;
    });
    this.setState({
      listadoocio: updatedList,
    });
    evento.deleteEvento(id);
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const allOcio = this.state.listadoocio.map((detalle) => {
      return (
        <div key={detalle._id} className="info-evento">
          <p>Nombre del evento: {detalle.nombre}</p>
          <p>Lugar del evento:{detalle.lugar}</p>
          <p className='descripcion-evento'>Descripción: {detalle.descripcion}</p>
          <button onClick={(e) => this.deleteElement(detalle._id)}>
            Borrar evento
          </button>
          <Link to={`/evento/edit/${detalle._id}`}>
            <button>Editar evento</button>
          </Link>
        </div>
      );
    });

    return (
      <>
        <Navbar />
        <div className='evento-espaciado'>
          {allOcio}
          <Link to="/evento/create" style={{ textDecoration: 'none' }}><h1 className='title-evento-añadir'>Añadir Evento</h1></Link>
        </div>
      </>
    );
  }
}

export default Evento;
