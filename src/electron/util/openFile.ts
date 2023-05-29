// eslint-disable-next-line import/no-extraneous-dependencies
import { shell } from "electron"

export async function openFile(path: string): Promise<boolean> {
  const error = await shell.openPath(path)

  if (error) {
    return false
  }

  return true
}
