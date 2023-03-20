import { useStyles } from "../hooks/useStyles"

export default function Toolbar() {
  const styles = useStyles(
    () => ({
      toolbar: {
        width: "100%",
        height: 45,
        backgroundColor: "rgb(7, 0, 78)",
      },
    }),
    []
  )

  return <div style={styles.toolbar} />
}
