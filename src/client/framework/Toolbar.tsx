import { useRecoilValue } from "recoil"

import { SavingState } from "../context/recoil/SavingState"
import { useStyles } from "../hooks/useStyles"

export default function Toolbar() {
  const isSaving = useRecoilValue(SavingState)
  const styles = useStyles(
    () => ({
      toolbar: {
        width: "100%",
        height: 45,
        backgroundColor: isSaving ? "rgb(44, 38, 101)" : "rgb(7, 0, 78)",
        flexShrink: 0,
      },
    }),
    [isSaving]
  )

  return <div className="drag" style={styles.toolbar} />
}
