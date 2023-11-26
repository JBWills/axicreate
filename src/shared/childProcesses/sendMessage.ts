import { ChildProcess } from "child_process"

import { ipcRenderer } from "electron"
import { unreachable } from "src/client/util/unreachable"

import { EventData, UtilityEventKey } from "../types/MessagePortFunctions"

export function sendMessage<T extends UtilityEventKey>({
  sendFn,
  data,
}: {
  sendFn: (name: string, d: any) => void

  data: EventData<T>
}) {
  sendFn("message", data)
}

type SenderListener =
  | {
      sender: "renderer"
      listener: "main"
    }
  | {
      sender: "main"
      listener: "renderer"
    }
  | {
      sender: "main"
      listener: "process"
      process: ChildProcess
    }
  | {
      sender: "process"
      listener: "main"
    }

export function sendMessage2<T extends UtilityEventKey>({
  senderListener,
  data,
}: {
  senderListener: SenderListener
  data: EventData<T>
}) {
  switch (senderListener.sender) {
    case "renderer":
      senderListener.listener satisfies "main"
      ipcRenderer.invoke("message", data)
      break
    case "main":
      if (senderListener.listener === "process") {
        senderListener.process.send(data)
      } else if (senderListener.listener === "renderer") {
        ipcRenderer.send("message", data)
      } else {
        unreachable(senderListener)
      }
      break
    case "process":
      senderListener.listener satisfies "main"
      process.send?.(data)
      break
    default:
      unreachable(senderListener)
  }
}

export function listenForMessage<T extends UtilityEventKey>({
  senderListener,
  handler,
}: {
  senderListener: SenderListener
  handler: (EventData<T>) => void
}) {
  switch (senderListener.listener) {
    case "renderer":˜
      ipcRenderer.on("message", data)
  }
  switch (senderListener.sender) {
    case "renderer":
      senderListener.listener satisfies "main"
      ipcRenderer.invoke("message", data)
      break
    case "main":
      if (senderListener.listener === "process") {
        senderListener.process.send(data)
      } else if (senderListener.listener === "renderer") {
        ipcRenderer.send("message", data)
      } else {
        unreachable(senderListener)
      }
      break
    case "process":
      senderListener.listener satisfies "main"
      process.send?.(data)
      break
    default:
      unreachable(senderListener)
  }
}