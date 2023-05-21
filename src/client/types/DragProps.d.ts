import { DragEventHandler } from "react"

export type DragProps = {
  onDrag?: DragEventHandler | undefined
  onDragCapture?: DragEventHandler | undefined
  onDragEnd?: DragEventHandler | undefined
  onDragEndCapture?: DragEventHandler | undefined
  onDragEnter?: DragEventHandler | undefined
  onDragEnterCapture?: DragEventHandler | undefined
  onDragExit?: DragEventHandler | undefined
  onDragExitCapture?: DragEventHandler | undefined
  onDragLeave?: DragEventHandler | undefined
  onDragLeaveCapture?: DragEventHandler | undefined
  onDragOver?: DragEventHandler | undefined
  onDragOverCapture?: DragEventHandler | undefined
  onDragStart?: DragEventHandler | undefined
  onDragStartCapture?: DragEventHandler | undefined
  onDrop?: DragEventHandler | undefined
  onDropCapture?: DragEventHandler | undefined
}
