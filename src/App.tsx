/* eslint-disable react/no-unknown-property */
import { Suspense } from "react"

import "./App.css"

import { TypographyStyle, GoogleFont } from "react-typography"

import Frame from "./framework/Frame"
import useShortcut from "./hooks/useShortcut"
import Key from "./types/keys/AllKeys"
import typography from "./util/typography"

function App() {
  useShortcut([Key.Cmd, Key.Ctrl, "y"], () => console.log("tesdt"))

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="App">
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      <Suspense />
      <Frame />
    </div>
  )
}

export default App
