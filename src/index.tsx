import ReactDOM from 'react-dom';
import React from 'react';
import EventStreamRegistryComponent from "./components/EventStreamRegistry/EventStreamRegistryComponent";
import reportWebVitals from './reportWebVitals';
import './index.css';

const config = require("./data.json");


ReactDOM.render(
  <React.StrictMode>
      <EventStreamRegistryComponent eventStreamRegistry={config}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
