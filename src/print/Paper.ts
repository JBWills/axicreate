import { Color } from "three"

const BLACK = new Color(0, 0, 0)
const WHITE = new Color(1, 1, 1)
const RED = new Color(1, 0, 0)

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

export function getPaper<T extends PaperName>(
  paperName: T
): (typeof papers)[T] {
  return papers[paperName]
}
