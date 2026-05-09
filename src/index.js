import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container);
const routerBasename = window.location.pathname.startsWith('/preschool')
  ? '/preschool'
  : '';

root.render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
