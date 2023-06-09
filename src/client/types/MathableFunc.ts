export type MathableFunc = (a: number, b: number) => number
export type UnaryFunc = (a: number) => number

export const F = {
  plus: (a, b) => a + b,
  minus: (a, b) => a - b,
  times: (a, b) => a * b,
  div: (a, b) => a / b,
  pow: (a, b) => a ** b,
} satisfies { [k in string]: MathableFunc }

export const UF = {
  squared: (a) => a * a,
  abs: (a) => Math.abs(a),
} satisfies { [k in string]: UnaryFunc }
