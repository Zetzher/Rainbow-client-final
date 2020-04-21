import React, { Component } from 'react'
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";
import Anonroute from "./components/Anonroute";
import PrivateRoute from "./components/Privateroute";
import Homepage from "./pages/Homepage";
import Evento from "./pages/Evento";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Ocio from "./pages/Ocio";
import PerfilDetailed from "./pages/PerfilDetailed";
import EventoCreate from "./pages/CrearEvento";
import EditEvento from "./pages/EditEvento";
import PerfilStrangerDetailed from "./pages/PerfilStrangerDetailed";

class App extends Component {
    render() {
        return (
            <AuthProvider>
              <Switch>
                <Anonroute exact path='/signup' component={Signup} />
                <Anonroute exact path='/login' component={Login} />
                <Route exact path='/' component={Homepage} />
                <Route exact path='/ocio' component={Ocio} />
                <PrivateRoute exact path='/perfil' component={Perfil} />
                <PrivateRoute exact path='/perfil/edit/:id' component={PerfilDetailed} />
                <PrivateRoute exact path='/perfil/:id' component={PerfilStrangerDetailed} />
                <PrivateRoute exact path='/evento' component={Evento} />
                <PrivateRoute exact path='/evento/edit/:id' component={EditEvento} />
                <PrivateRoute exact path='/evento/create/:id' component={EventoCreate} />
              </Switch>
          </AuthProvider>
        )
    }
}

export default App
