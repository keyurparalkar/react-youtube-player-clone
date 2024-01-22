import { numberToFixed } from '../../../utils';

/**
 * Computes the width in percentage for the slider fill track
 * @param xDistance: This can be clientX or pageX
 * @param left: Distance of the left edge from the viewport i.e. getClientBoundingRect().left;
 * @param totalWidth: total width of the slider track
 * @returns: width in percentage;
 */
export const computeCurrentWidthFromPointerPos = (xDistance: number, left: number, totalWidth: number) =>
    numberToFixed(((xDistance - left) / totalWidth) * 100, 2);

export type SliderCSSVariableTypes = '--slider-fill' | '--slider-pointer' | '--chapter-fill';

export const getCSSVariableValue = (
    variableName: SliderCSSVariableTypes,
    ref: React.RefObject<HTMLDivElement> | HTMLDivElement,
) => {
    if ('current' in ref) {
        return ref.current?.style.getPropertyValue(variableName) || '0%';
    } else {
        return ref.style.getPropertyValue(variableName) || '0%';
    }
};

export const getCSSVariableAbsoluteValue = (
    variableName: SliderCSSVariableTypes,
    ref: React.RefObject<HTMLDivElement> | HTMLDivElement,
) => {
    const value = getCSSVariableValue(variableName, ref);
    return Number(value.split('%')[0]);
};
