/* eslint-disable react/no-unknown-property */
import { Suspense } from "react"

import "./App.css"

import Frame from "./framework/Frame"
import useShortcut from "./hooks/useShortcut"
import Key from "./types/keys/AllKeys"

function App() {
  useShortcut([Key.Cmd, Key.Ctrl, "y"], () => console.log("tesdt"))

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="App">
      <Suspense />
      <Frame />
    </div>
  )
}

export default App
