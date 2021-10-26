import { Vec } from "types/Vec";

export const getX = (p: Vec): number => {
  if (typeof p === "number") return p;

  if ("type" in p) return p.x;

  return p[0];
};

export const getYOrNull = (p: Vec): number | null => {
  if (typeof p === "number") return null;

  if ("type" in p) return p.type === "v3" || p.type === "v2" ? p.y : null;

  return p[1] || null;
};

export const getY = (p: Vec): number => getYOrNull(p) || 0;

export const getZOrNull = (p: Vec): number | null => {
  if (typeof p === "number") return null;

  if ("type" in p) return p.type === "v3" ? p.z : null;

  return p[2] || null;
};

export const getZ = (p: Vec): number => getZOrNull(p) || 0;
