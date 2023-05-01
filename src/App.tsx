/* eslint-disable react/no-unknown-property */
import { Suspense } from "react"

import "./App.css"

import { TypographyStyle, GoogleFont } from "react-typography"

import Frame from "./framework/Frame"
import { useStyles } from "./hooks/useStyles"
import typography from "./util/typography"
import appIcons from "../images/icons/app.png"

function App() {
  // eslint-disable-next-line no-unused-expressions
  console.log(appIcons)
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
      <Suspense />
      <Frame />
    </div>
  )
}

export default App
