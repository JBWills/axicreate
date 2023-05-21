import React from "react"

import { createRoot } from "react-dom/client"
import { RecoilRoot } from "recoil"
// theme
import "primereact/resources/themes/lara-light-indigo/theme.css"

// core
import "primereact/resources/primereact.min.css"

// icons
import "primeicons/primeicons.css"

import App from "./App"

import "./index.css"

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
