import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


if (import.meta.env.VITE_SECRET_KEY !== 'myspecialkey') {
  alert("Can't run login");
  throw new Error("Access denied");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
