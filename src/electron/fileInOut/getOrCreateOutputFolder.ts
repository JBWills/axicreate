import fs from "fs"

import ConfigStore from "../store/ConfigStore"

export function getOrCreateOutputFolder() {
  ConfigStore.get("outputSaveFolder")

  if (!saveFolder || !fs.existsSync(saveFolder)) {
    saveFolder = await selectExportFolder()
    if (!saveFolder || !fs.existsSync(saveFolder)) {
      return { success: false }
    }

    ConfigStore.set("outputSaveFolder", saveFolder)
  }
}
