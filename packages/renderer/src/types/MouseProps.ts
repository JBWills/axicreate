import { MouseEventHandler } from "react"

export type MouseProps = {
  onClick?: MouseEventHandler | undefined
  onClickCapture?: MouseEventHandler | undefined
  onContextMenu?: MouseEventHandler | undefined
  onContextMenuCapture?: MouseEventHandler | undefined
  onDoubleClick?: MouseEventHandler | undefined
  onDoubleClickCapture?: MouseEventHandler | undefined
  onMouseDown?: MouseEventHandler | undefined
  onMouseDownCapture?: MouseEventHandler | undefined
  onMouseEnter?: MouseEventHandler | undefined
  onMouseLeave?: MouseEventHandler | undefined
  onMouseMove?: MouseEventHandler | undefined
  onMouseMoveCapture?: MouseEventHandler | undefined
  onMouseOut?: MouseEventHandler | undefined
  onMouseOutCapture?: MouseEventHandler | undefined
  onMouseOver?: MouseEventHandler | undefined
  onMouseOverCapture?: MouseEventHandler | undefined
  onMouseUp?: MouseEventHandler | undefined
  onMouseUpCapture?: MouseEventHandler | undefined
}
