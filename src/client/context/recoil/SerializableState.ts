import { RecoilState } from "recoil"
import { getRecoil, setRecoil } from "recoil-nexus"

import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"

export type SerializableState<T, R extends SimpleSerializableValue = string> = {
  key: string
  defaultValue: T
  recoilState: RecoilState<T>
  toJson: (data: T) => R
  fromJson: (s: R | undefined, defaultValue: T) => T
}

const SerializableStates: SerializableState<any, SimpleSerializableValue>[] = []

export function isSerializableStateRegistered(): boolean {
  return SerializableStates.length > 0
}

export function registerSerializableState<T>(state: SerializableState<T, SimpleSerializableValue>) {
  if (SerializableStates.find((s) => s.key === state.key)) {
    throw new Error(`Tried to register two serializable states with the same key: ${state.key}`)
  }

  SerializableStates.push(state)
}

export function loadStates(json: Record<string, SimpleSerializableValue>) {
  for (const s of SerializableStates) {
    if (s.key in json) {
      const jsonVal = json[s.key]
      setRecoil(s.recoilState, s.fromJson(jsonVal, s.defaultValue))
    }
  }
}

export function serializeState(): Record<string, SimpleSerializableValue> {
  const obj: Record<string, SimpleSerializableValue> = {}
  for (const s of SerializableStates) {
    const value = getRecoil(s.recoilState)
    if (!value) {
      continue
    }

    obj[s.key] = s.toJson(value)
  }

  return obj
}
