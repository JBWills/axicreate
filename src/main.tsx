import React from "react"

import ReactDOM from "react-dom/client"

// theme
import "primereact/resources/themes/lara-light-indigo/theme.css"

// core
import "primereact/resources/primereact.min.css"

// icons
import "primeicons/primeicons.css"

import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
