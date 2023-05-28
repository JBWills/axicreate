import Store from "electron-store"

export default new Store<{
  outputSaveFolder: string | null
}>({
  name: "preferences",
  schema: {
    outputSaveFolder: {
      type: ["string", "null"],
      default: null,
    },
  },
})
