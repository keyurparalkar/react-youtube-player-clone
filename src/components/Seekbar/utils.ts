/**
 * Returns the video duration w.r.t to slider's position;

 * @param pageX: X coordinate at which the mouse is clicked from the left edge of the document. https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
 * @param parentLeft: distance of the element from the left edge of the viewport. https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * @param totalDuration: total duration of the video
 * @param progressBarWidth: width of the progress bar
 * @returns
 */
export const computeVideoDurarionFromSliderPosition = (
    pageX: number,
    parentLeft: number,
    totalDuration: number,
    progressBarWidth: number,
) => {
    const pos = pageX - parentLeft;

    /**
     * In Video.tsx, we have an useEffect that exuecutes on change of hoveredDuration.
     * Below value that is returned is the hoveredDuration.
     * By making use of Math.round we have optimised and reduced the unnessary re-renders of all context attached components.
     * Scenario:
     * - Without Math.round the value of hoveredDuration changed by a very small amount while hovering i.e. 25.6789 to 25.6790 etc
     * - With Math.round this value is always rounded to nearest integer i.e. Even for small change like above the value of hoveredDuration remains 25.
     * We don't need to re-run the above useEffect for such a small change, hence for the optimsation purposes Math.round is used.
     */
    return Math.round((Math.abs(pos) * totalDuration) / progressBarWidth);
};
