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

    return (Math.abs(pos) * totalDuration) / progressBarWidth;
};
