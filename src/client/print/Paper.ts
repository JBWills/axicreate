import { Color } from "three"

import { Size } from "../types/Size"
import unreachable from "../util/unreachable"

const BLACK = new Color("#000000")
const WHITE = new Color("#FFFFFF")
const RED = new Color("#FF3900")

const InkscapeDpi = 96

const MAX_VERTICAL_IN = 13.75

// not so sure about max horizontal in
const MAX_HORIZONTAL_IN = 17.0

type PaperType = {
  longSideIn: number
  shortSideIn: number
  backgroundColor: Color
  strokeColor: Color
}

const papers = {
  LargeWhite: {
    longSideIn: 14,
    shortSideIn: 11,
    backgroundColor: WHITE,
    strokeColor: BLACK,
  },
  LargeBlack: {
    longSideIn: 18,
    shortSideIn: 12,
    backgroundColor: BLACK,
    strokeColor: WHITE,
  },
  A4White: {
    longSideIn: 11.69,
    shortSideIn: 8.27,
    backgroundColor: WHITE,
    strokeColor: BLACK,
  },
  A4Black: {
    longSideIn: 12,
    shortSideIn: 9,
    backgroundColor: BLACK,
    strokeColor: WHITE,
  },
  A4Thick: {
    longSideIn: 11.125,
    shortSideIn: 8.5,
    backgroundColor: WHITE,
    strokeColor: BLACK,
  },
  SquareBlack: {
    longSideIn: 7.87,
    shortSideIn: 7.87,
    backgroundColor: BLACK,
    strokeColor: WHITE,
  },
  ColoredPaper: {
    longSideIn: 12.5,
    shortSideIn: 9.5,
    backgroundColor: RED,
    strokeColor: WHITE,
  },
} satisfies Record<string, PaperType>

export type PaperName = keyof typeof papers

export const paperNames: PaperName[] = Object.keys(papers) as PaperName[]

export function getPaper<T extends PaperName>(paperName: T): (typeof papers)[T] {
  return papers[paperName]
}

function longSidePx(paper: PaperType) {
  return paper.longSideIn * InkscapeDpi
}

function shortSidePx(paper: PaperType) {
  return paper.longSideIn * InkscapeDpi
}

export function getPaperSizePx(paperName: PaperName, orientation: Orientation): Size {
  const paper = getPaper(paperName)
  switch (orientation) {
    case "landscape":
      return { w: longSidePx(paper), h: shortSidePx(paper) }
    case "portrait":
      return { w: shortSidePx(paper), h: longSidePx(paper) }
    default:
      unreachable(orientation)
  }
}

export type Orientation = "landscape" | "portrait"
export const DefaultPaper: PaperName = "SquareBlack"
