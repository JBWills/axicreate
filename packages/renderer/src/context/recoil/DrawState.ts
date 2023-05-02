import { atom } from "recoil"

export const DrawState = atom({
  key: "Draw",
  default: {
    randomSeed: 0,
    numBoxes: 5,
    boxSpacing: 0.2,
    randomizeBoxSize: 0,
    randomizeBoxRotation: 0,
  },
})
