import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import getEventMethod from "../lib/eventoservice";
import { withAuth } from "../lib/AuthProvider";

class Evento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      lugar: "",
      descripcion: "",
      asistentesMostrar: [],
      asistentes: [],
      listadoEventos: [],
      infoUser: this.props.user,
      userStatus: false,
    };
  }

  getInfo = () => {
    getEventMethod
      .getEvento()
      .then((listadoEventos) => {
        const usuarios = listadoEventos.data.map(
          (idUsuarios) => idUsuarios.asistencia
        );
        this.setState({
          listadoEventos: listadoEventos.data,
          asistentes: usuarios,
        });
      })
      .catch((err) =>
        console.log("Este error pertenece a pagina evento.js:", err)
      );
  };

  pushIdEvent = async (event) => {
    const nombre = this.state.infoUser.nombre;
    const edad = this.state.infoUser.edad;
    const id = event._id;
    const participantes = event.asistencia;
    const updatedAsistentes = [...this.state.asistentesMostrar];
    const filtrados = participantes.filter((datos) => {
      return datos._id == this.state.infoUser._id;
    });
    if (filtrados.length == 0) {
      participantes.push(this.props.user)
      getEventMethod.pushUser(id, nombre, edad);
       
       this.setState({
        asistentesMostrar: updatedAsistentes,
      });


    } else {
      alert("Ya estás apuntado");
    }
    
    console.log("estos son los asistentes", this.state.asistentes);
  };

  pullIdEvent = (event) => {
    const nombre = this.state.infoUser.nombre;
    const id = event._id;
    const edad = this.state.infoUser.edad;
    const participantes = event.asistencia;
    const updatedAsistentes = [...this.state.asistentesMostrar].filter((datos) => {
      return datos._id !== this.props.user._id
    })
    const filtrados = participantes.filter((datos) => {
      return datos._id == this.state.infoUser._id;
    });
    if (filtrados.length == 1){
    participantes.splice(participantes.indexOf(this.props.user._id), 1)
    this.setState({
      asistentesMostrar: updatedAsistentes
    })
  }
    getEventMethod.pullUser(id, nombre, edad);
  };

  deleteElement = async (id) => {
    console.log('delete evento')
    const updatedList = [...this.state.listadoEventos].filter((element) => {
      return element._id !== id;
    });
    this.setState({
      listadoEventos: updatedList,
    });
    getEventMethod.deleteEvento(id);
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const allOcio = this.state.listadoEventos.map((detalle) => {
      return (
        <div key={detalle._id} className="info-evento">
          <p>Nombre del evento: {detalle.nombre}</p>
          <p>Lugar del evento:{detalle.lugar}</p>
          <p className="descripcion-evento">
            Descripción: {detalle.descripcion}
          </p>
          <div className="posicion-botones-evento">
            <Link to={`/evento/edit/${detalle._id}`}>
              <button className="estilo-botones-evento">Editar evento</button>
            </Link>
            <button
              className="estilo-botones-evento"
              onClick={(e) => this.deleteElement(detalle._id)}
            >
              Borrar evento
            </button>
          </div>
          <p>
            Nombre del participante: {detalle.asistencia.map((datos) => <div>{datos.nombre}, {datos.edad}</div>)}
            
          </p>
          <br></br>
          <div className="posicion-botones-evento">
            <button
              className="estilo-botones-evento"
              onClick={(e) => this.pushIdEvent(detalle)}
            >
              Participar en el evento
            </button>
            <button
              className="estilo-botones-evento"
              onClick={(e) => this.pullIdEvent(detalle)}
            >
              Desapuntarse
            </button>
          </div>
        </div>
      );
    });
    return (
      <>
        <Navbar />
        <div className="evento-espaciado">
          {allOcio}
          <div className="posicion-boton-añadir">
            <Link to="/evento/create" style={{ textDecoration: "none" }}>
              <h1 className="title-evento-añadir">Añadir Evento</h1>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Evento);
