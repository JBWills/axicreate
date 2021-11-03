import { V2, V3 } from "types/Vec";
import { v2, v3 } from "util/conversions/createVec";

type V2Input = { name: "vector2"; type: V2 };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type V3Input = { name: "vector3"; type: V3 };
type NumberInput = { name: "number"; type: number };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type BoolInput = { name: "boolean"; type: boolean };

export type InputType = V2Input | V3Input | NumberInput | BoolInput;

export type ControlName = keyof typeof controls;

export type ControlValue<N extends ControlName> =
  typeof controls[N]["defaultValue"];

type ControlConfig<N extends ControlName, I extends InputType> = {
  name: N;
  typeName: I["name"];
  defaultValue: I["type"];
};

const number = <N extends ControlName>(
  name: N,
  defaultValue: number
): ControlConfig<N, NumberInput> => ({
  name,
  typeName: "number",
  defaultValue,
});

const vector2 = <N extends ControlName>(
  name: N,
  defaultValue: V2
): ControlConfig<N, V2Input> => ({
  name,
  typeName: "vector2",
  defaultValue,
});

const vector3 = <N extends ControlName>(
  name: N,
  defaultValue: V3
): ControlConfig<N, V3Input> => ({
  name,
  typeName: "vector3",
  defaultValue,
});

const bool = <N extends ControlName>(
  name: N,
  defaultValue: boolean
): ControlConfig<N, BoolInput> => ({
  name,
  typeName: "boolean",
  defaultValue,
});

// eslint-disable-next-line import/prefer-default-export
export const controls: {
  readonly CameraPosition: ControlConfig<"CameraPosition", V3Input>;
  readonly ShowControl: ControlConfig<"ShowControl", BoolInput>;
  readonly PreviewScale: ControlConfig<"PreviewScale", NumberInput>;
  readonly PreviewOffset: ControlConfig<"PreviewOffset", V2Input>;
} = {
  CameraPosition: vector3("CameraPosition", v3(0, 0, 0)),
  ShowControl: bool("ShowControl", true),
  PreviewScale: number("PreviewScale", 1.0),
  PreviewOffset: vector2("PreviewOffset", v2(0, 0)),
} as const;
