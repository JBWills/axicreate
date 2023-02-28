import "./Label.css"
import { useMemo } from "react"

interface LabelProps {
  text: string
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

export default function Label({
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: LabelProps) {
  const style = useMemo(
    () => ({ marginTop, marginBottom, marginLeft, marginRight }),
    [marginTop, marginBottom, marginLeft, marginRight]
  )
  return (
    <h5 className="Label" style={style}>
      {text}
    </h5>
  )
}
