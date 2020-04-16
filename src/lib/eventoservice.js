import axios from "axios";

class Evento {
    constructor() {
        this.evento = axios.create({
            baseURL: process.env.REACT_APP_API_URI,
            withCredentials: true,
        });
    }

    pushUser(id) {
        return this.evento
        .post(`/eventos/${id}`)
        .then((data) =>(data))
        .catch ((err) =>console.log("error from edit evento:", err) )
    }

    pullUser(id) {
        return this.evento
        .post(`/eventos/${id}/delete`)
        .then((data) =>(data))
        .catch ((err) =>console.log("error from edit evento:", err) )
    }

    getEvento() {
        return this.evento
            .get("/eventos")
            .then((data) => (data))
            .catch((err) => console.log("error from evento:", err));
    }
    createEvento({ nombre, descripcion, lugar }) {
        return this.evento
            .post("/eventos/create", { nombre, descripcion, lugar })
            .then((data) => (data))
            .catch
    }

    editEvento(id, nombre,descripcion,lugar){
        return this.evento
        .put(`/eventos/edit/${id}`, {nombre,descripcion,lugar})
        .then((data) =>(data))
        .catch ((err) =>console.log("error from edit evento:", err) )
    }

    deleteEvento(id) {
        console.log('service', id)  
        return this.evento
            .delete(`/eventos/${id}/delete`)
            .then((data) => (data))
            .catch((err) => console.log("error from delete evento:", err));
    }
}

const eventoExports = new Evento();
export default eventoExports;