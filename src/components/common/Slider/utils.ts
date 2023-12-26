/**
 * Computes the width in percentage for the slider fill track
 * @param xDistance: This can be clientX or pageX
 * @param left: Distance of the left edge from the viewport i.e. getClientBoundingRect().left;
 * @param totalWidth: total width of the slider track
 * @returns: width in percentage;
 */
export const computeCurrentWidthFromPointerPos = (xDistance: number, left: number, totalWidth: number) =>
    ((xDistance - left) / totalWidth) * 100;
