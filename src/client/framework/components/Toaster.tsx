import React, { RefObject, useEffect, useRef } from "react"

import { Toast } from "primereact/toast"
import { atom, useSetRecoilState } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"

interface ToasterProps {}

export const ToastRef = atom<RefObject<Toast | null> | undefined>({
  key: "ToastRef",
  default: undefined,
  dangerouslyAllowMutability: true,
})

function Toaster({}: ToasterProps) {
  const ref = useRef<Toast | null>(null)
  const setToastRef = useSetRecoilState(ToastRef)

  useEffect(() => {
    setToastRef(ref)
  }, [ref, setToastRef])

  return <Toast ref={ref} position="bottom-center" />
}

export default axiMemo(Toaster)
