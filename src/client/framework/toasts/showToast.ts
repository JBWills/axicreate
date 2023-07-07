import { ToastMessage } from "primereact/toast"
import { getRecoil } from "recoil-nexus"

import { ToastRef } from "../components/Toaster"

export function showToast(message: ToastMessage | string) {
  const ref = getRecoil(ToastRef)

  console.log(ref)

  if (!ref?.current) {
    return
  }

  const messageObject = typeof message === "string" ? { content: message } : message

  ref.current.show({
    life: 1500,
    severity: "info",
    sticky: false,
    closable: false,
    ...messageObject,
  })
}
