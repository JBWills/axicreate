import React, { useMemo } from "react"

import { useRecoilState } from "recoil"

import { PaperState } from "src/client/context/recoil/PaperState"
import { axiMemo } from "src/client/hooks/genericMemo"
import { useAtomUpdater } from "src/client/hooks/useAtomUpdater"
import { PaperName, paperNames } from "src/client/print/Paper"
import { SelectOption } from "src/client/types/SelectOption"

import Row from "../../components/Row"
import AxiDropdown from "../inputs/AxiDropdown"
import AxiSelectButton from "../inputs/AxiSelectButton"

interface PaperControlsProps {}

function PaperControls({}: PaperControlsProps) {
  const [{ name: paperName, orientation }, setPaperState] = useRecoilState(PaperState)
  const paperOptions: SelectOption<PaperName>[] = useMemo(
    () => paperNames.map((name) => ({ value: name, displayName: name })),
    []
  )

  const handleChangePaper = useAtomUpdater(setPaperState, "name")
  const handleChangePaperOrientation = useAtomUpdater(setPaperState, "orientation")

  return (
    <Row>
      <AxiDropdown
        label="Paper"
        value={paperName}
        options={paperOptions}
        onChange={handleChangePaper}
      />
      <AxiSelectButton
        label="Orientation"
        value={orientation}
        onChange={handleChangePaperOrientation}
        options={["portrait", "landscape"]}
      />
    </Row>
  )
}

export default axiMemo(PaperControls)
