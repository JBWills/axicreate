import React, { useCallback, useMemo } from "react"

import { useRecoilState } from "recoil"

import { CurrentSketchState } from "src/client/context/recoil/CurrentSketchState"
import { axiMemo } from "src/client/hooks/genericMemo"
import { loadSettings, saveCoreAppSettings } from "src/client/saveload/saveSettings"
import { SelectOption } from "src/client/types/SelectOption"
import { SketchName, SketchNames } from "src/shared/types/sketchNames"

import Row from "../../components/Row"
import AxiDropdown from "../inputs/AxiDropdown"

interface AppControlsProps {}

function AppControls({}: AppControlsProps) {
  const [currentSketchState, setAppState] = useRecoilState(CurrentSketchState)
  const AppOptions: SelectOption<SketchName>[] = useMemo(
    () => SketchNames.map((name) => ({ value: name, displayName: name })),
    []
  )

  const handleChangeSketch = useCallback(
    async (name: string) => {
      setAppState((oldState) => ({ ...oldState, name }))
      await saveCoreAppSettings()
      await loadSettings()
    },
    [setAppState]
  )

  return (
    <Row>
      <AxiDropdown
        label="App"
        value={currentSketchState.name}
        options={AppOptions}
        onChange={handleChangeSketch}
      />
    </Row>
  )
}

export default axiMemo(AppControls)
