/* eslint-disable react/no-unknown-property */
import { Suspense } from "react"

import "./App.css"

import { TypographyStyle, GoogleFont } from "react-typography"
import RecoilNexus from "recoil-nexus"

import Frame from "./framework/Frame"
import { useStyles } from "./hooks/useStyles"
import typography from "./util/typography"

function App() {
  const styles = useStyles(
    () => ({
      app: {
        backgroundColor: "rgb(207, 229, 248)",
        width: "100%",
        height: "100%",
      },
    }),
    []
  )

  return (
    <div style={styles.app}>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      <RecoilNexus />
      <Suspense />
      <Frame />
    </div>
  )
}

export default App
