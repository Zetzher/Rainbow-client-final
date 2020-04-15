import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import evento from "../lib/eventoservice";
import { withAuth } from "../lib/AuthProvider";

class Evento extends Component {
  constructor(props){
    super(props)
    this.state = {
      nombre: "",
      lugar: "",
      descripcion: "",
      asistentes: [],
      listadoEventos: [],
      infoUser: this.props.user,
      userStatus: false
    };
  }
  

  getInfo = () => {
    
    evento
      .getEvento()
      .then((listadoEventos) => {
        this.setState({ 
          listadoEventos: listadoEventos.data
        });
      })
      .catch((err) =>
        console.log("Este error pertenece a pagina evento.js:", err)
      );
  };

  comprobacion = () => {
    const mapId = this.state.listadoEventos.map((detalle) => detalle.asistencia.map((datos) => datos._id))
    mapId.includes(this.state.infoUser._id) ? this.setState({ userStatus : false }) : this.setState({ userStatus : true })
    
}

  pushIdEvent =  (id) => {
    const nombre = this.state.infoUser.nombre;
    const edad = this.state.infoUser.edad;
     this.state.userStatus ? evento.pushUser(id, nombre, edad) : alert('¡Ya te has apuntado a este evento!')
}

  pullIdEvent = async (id) => {
  const nombre = this.state.infoUser.nombre;
  const edad = this.state.infoUser.edad;
  evento
  .pullUser(id, nombre, edad)
}
  

  deleteElement = async (id) => {
    const updatedList = [...this.state.listadoEventos].filter((element) => {
      return element._id !== id;
    });
    this.setState({
      listadoEventos: updatedList,
    });
    evento.deleteEvento(id);
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
          <p className='descripcion-evento'>Descripción: {detalle.descripcion}</p>
          <div className='posicion-botones-evento'>
          <Link to={`/evento/edit/${detalle._id}`}>
            <button className='estilo-botones-evento'>Editar evento</button>
          </Link>
          <button className='estilo-botones-evento' onClick={(e) => this.deleteElement(detalle._id)}>
            Borrar evento
          </button>
          </div>
          <p>Nombre del participante: {detalle.asistencia.map((detalle) => <div>{detalle.nombre} ({detalle.edad})</div>)
    }</p>
          <br></br>
          <div className='posicion-botones-evento'>
          <button className='estilo-botones-evento' onClick={(e) => this.pushIdEvent(detalle._id)}>Participar en el evento</button>
          <button className='estilo-botones-evento' onClick={(e) => this.pullIdEvent(detalle._id)}>Desapuntarse</button>
          </div>
        </div>
      );
    });
    return (
      <>
        <Navbar />
        <div className='evento-espaciado'>
          {allOcio}
          <div className='posicion-boton-añadir'>
          <Link to="/evento/create" style={{ textDecoration: 'none' }}><h1 className='title-evento-añadir'>Añadir Evento</h1></Link>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Evento);
