import { StrictMode } from 'react'
import ReactDOM from "react-dom";
import Home from './Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Home />
  </StrictMode>,
  rootElement
);