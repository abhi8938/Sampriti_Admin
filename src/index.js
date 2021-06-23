import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";

import AdminLayout from "./layouts/Admin";
import * as serviceWorker from './serviceWorker';
import Login from "./views/Login";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' render={props => <Login navigation={props}/>}/>
            <Route path="/admin" render={props => <AdminLayout {...props} />}/>
            <Redirect from="/" to="/login"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

//commands
// firebase deploy --only hosting:sampritionline-5df54
