import Vec2 from "models/Vec2";
import Size from "types/Size";

export const toPxString = (value: number): string => `${value}px`;
export const toRemString = (value: number): string => `${value}rem`;
export const toPercentString = (value: number): string => `${value}%`;

export const expanded = (size: Size, amount: number | Size | Vec2): Size => {
  const amountAsVec2 = Vec2.toVec2(amount);
  return {
    width: size.width + amountAsVec2.x,
    height: size.height + amountAsVec2.y,
  };
};
