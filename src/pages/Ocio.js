import React, { Component } from "react";
import Navbar from "../components/Navbar";
import ocio from "../lib/ocio-service";

class Ocio extends Component {
  state = {
    listadoOcio: [],
    filterArray: [],
    isLoading: true,
  };

  getInfo = () => {
    ocio
      .getOcio()
      .then((listadoOcio) => {
        this.setState({ listadoOcio: listadoOcio.data, isLoading: false });
      })
      .catch((err) =>
        console.log("Este error pertenece a pagina ocio.js:", err)
      );
  };

  componentDidMount() {
    this.getInfo();
  }

  filterType = (e) => {
    const filterOcio = [...this.state.listadoOcio];
    const filterArray = filterOcio.filter((element) => {
      return element.type.includes(e.target.name);
    });
    this.setState({
      filterArray: filterArray,
    });
  };

  render() {
    const allOcio = this.state.filterArray.map((detalle) => {
      return (
        <h1 className="ocio-dbase">
          <h1 className="title-ocio">{detalle.nombre}</h1>
          <br></br>
          <h2 className="descripcion-ocio">{detalle.descripcion}</h2>
          <br></br>
          <h3 className="info-ocio">{detalle.calle}</h3>
          <br></br>
          <h3 className="info-ocio">{detalle.horario}</h3>
          <br></br>
          <img
            src={detalle.image_url}
            className="foto-filter"
            alt="imagen local"
          ></img>
          <br></br>
          <a href={`${detalle.website}`}>{detalle.website}</a>
        </h1>
      );
    });

    return (
      <div className="ocio">
        <h1 className="ocio-title">¿Qué estás buscando?</h1>
        <div className="ocio-column">
          <button name="pub" onClick={(e) => this.filterType(e)}>
            Pubs
          </button>
          <button name="sauna" onClick={(e) => this.filterType(e)}>
            Sauna
          </button>
          <button name="cruising" onClick={(e) => this.filterType(e)}>
            Cruising
          </button>
          <button name="sexshop" onClick={(e) => this.filterType(e)}>
            Sexshop
          </button>
          <button name="fetish" onClick={(e) => this.filterType(e)}>
            Fetish
          </button>
          <button name="hotel" onClick={(e) => this.filterType(e)}>
            Hotel
          </button>
          <button name="restaurante" onClick={(e) => this.filterType(e)}>
            Restaurante
          </button>
        </div>

        <div className="ocio-column2">
          {!this.state.isLoading ? <div>{allOcio}</div> : <p>Está cargando</p>}
        </div>
        <Navbar />
      </div>
    );
  }
}

export default Ocio;
