import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
        <footer><a href="http://www.freepik.com">Designed by pikisuperstar / Freepik</a></footer>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
