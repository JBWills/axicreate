import { DragEventHandler } from "react";

// eslint-disable-next-line import/prefer-default-export
export const getEmptyImage = (): HTMLImageElement => {
  const img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  return img;
};

export const clearDragGhostImage: DragEventHandler<Element> = (event) => {
  event.dataTransfer.setDragImage(getEmptyImage(), 0, 0);
};
