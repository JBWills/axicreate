import fs from "fs"

// eslint-disable-next-line import/no-extraneous-dependencies
import electron from "electron"

import ConfigStore from "../store/ConfigStore"

const { dialog } = electron

type Filename = `${string}.svg`

export async function saveSvg(
  savePath: [...string[], Filename],
  svg: string
): Promise<{ success: true; path: string } | { success: false }> {
  let saveFolder = ConfigStore.get("outputSaveFolder")

  if (!saveFolder || !fs.existsSync(saveFolder)) {
    saveFolder = await selectExportFolder()
    if (!saveFolder || !fs.existsSync(saveFolder)) {
      return { success: false }
    }

    ConfigStore.set("outputSaveFolder", saveFolder)
  }
  const folders = savePath.slice(0, savePath.length - 1)

  const finalFolderPath = [saveFolder, ...folders].join("/")

  await mkdirAsync(finalFolderPath, { recursive: true })

  const filename = savePath[savePath.length - 1] as Filename

  const validFilePath = getValidFilePath(finalFolderPath, filename)
  await writeFileAsync(validFilePath, svg)

  return { success: true, path: validFilePath }
}

function getValidFilePath(path: fs.PathLike, filename: string): string | undefined {
  const extensionStart = filename.lastIndexOf(".")

  if (extensionStart === -1) {
    return undefined
  }

  const fileWithoutExtension = filename.slice(0, extensionStart)
  const fileExtension = filename.slice(extensionStart)

  let x = 0

  while (x < 1000) {
    const numberedSuffix = x === 0 ? "" : ` (${x})`
    const newFilePath = `${path}/${fileWithoutExtension}${numberedSuffix}${fileExtension}`
    if (!fs.existsSync(newFilePath)) {
      return newFilePath
    }
    x += 1
  }

  return undefined
}

async function writeFileAsync(
  file: fs.PathOrFileDescriptor,
  data: string,
  options?: fs.WriteFileOptions
) {
  return new Promise<void>((resolve) => {
    fs.writeFile(file, data, options, (err) => {
      if (err) {
        throw new Error(err.message)
      }
      resolve()
    })
  })
}

async function mkdirAsync(path: fs.PathLike, options: fs.Mode | fs.MakeDirectoryOptions) {
  return new Promise((resolve) => {
    fs.mkdir(path, options, resolve)
  })
}

async function selectExportFolder(): Promise<string | undefined> {
  const result = await dialog.showOpenDialog({
    title: "Choose a folder",
    message: "Pick a folder to save SVGs to.",
    properties: ["openDirectory"],
  })

  return result.filePaths[0] || undefined
}
