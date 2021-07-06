import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./components/app";
import Admin from "./components/admin/admin";
import { createLocalStorage } from "./utils/local-store";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

createLocalStorage();
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
