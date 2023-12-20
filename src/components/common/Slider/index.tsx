import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { computeCurrentWidthFromPointerPos } from './utils';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onDrag' | 'onMouseUp'> {
    total: number;
    onClick?: (currentPercentage: number) => void;
    onDrag?: (completedPercentage: number) => void;
    onMouseUp?: () => void;
}

export interface SliderRefProps {
    updateSliderFill: (completedPercentage: number) => void;
}

const StyledContainer = styled.div`
    --slider-pointer: 0%; // when hover happens pointer is updated
    --slider-fill: 0%; // when click and drag happens fill is updated
    position: relative;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
`;
const StyledTrack = styled.div`
    width: 100%;
    height: 5px;
    background-color: red;
    position: absolute;
    pointer-events: auto;
`;

const StyledSliderFill = styled.div`
    height: 5px;
    background-color: blue;
    width: var(--slider-fill, 0%);
    position: absolute;
    pointer-events: none;
    /** https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#none
     * <--- Very usefull. This helped to disable any pointer interaction being caught in the target.
     * This helped us to catch the pointer-events present in its decendants i.e. In the styledtrack.
     * We did this because there was a bug that didn't allowed to select the video duration that was already visited(Since trackfill is an overlay over styledtrack, so any click event happening on this element did appeared on the styledtrack)
     * So now even clicking this element, the below element i.e. styled track component will recieve the pointer events
     */
`;

const StyledThumb = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: green;
    position: absolute;
    bottom: 35%;
    left: var(--slider-fill, 0%);
    transform: translateX(-50%);
`;

const Slider = (props: SliderProps, ref: Ref<SliderRefProps>) => {
    const { total, onClick, onDrag, onMouseUp } = props;
    const rootRef = useRef<HTMLDivElement>(null);
    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const elem = e.currentTarget;

    //     const rect = elem.getBoundingClientRect();
    //     console.log({ pageX: e.pageX, rectLeft: rect.left });
    //     const fillWidth = ((e.pageX - rect.left) / 800) * 100;
    //     elem.style.setProperty('--slider-pointer', `${fillWidth}%`);
    // };

    const updateSliderFillByEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        const elem = rootRef.current;
        if (elem) {
            const rect = elem.getBoundingClientRect();

            const fillWidth = computeCurrentWidthFromPointerPos(e.pageX, rect.left, total);
            rootRef.current?.style.setProperty('--slider-fill', `${fillWidth}%`);
            return fillWidth;
        }

        return 0;
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (rootRef.current) {
            const width = updateSliderFillByEvent(e);
            onClick?.(width);
        }
    };

    // Slider Thumb movement logic ===========================
    const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        /**
         * NOTE: 'data-dragging' attribute is available only when we are dragging the slider-thumb.
         * Thumb is said to be dragged when onMouseDown gets triggered on the .slider-thumb -> [data-dragging] is added to .slider
         * -> then handleMouseMove off .slider gets executed.
         * The dragging of thumb gets stopped when the data-dragging attribute is removed from .slider
         * We remove this attribute on MouseUp of .slider because on mouseup the target element can be different during dragging if the mouseup where on .slider-thumb
         * To have better dragging experience the data-dragging is removed on the mouseup of .slider
         */
        if (rootRef.current?.getAttribute('data-dragging')) {
            const width = updateSliderFillByEvent(e);
            onDrag?.(width);
        }
    };

    const handleContainerMouseUp = () => {
        if (rootRef.current) rootRef.current.removeAttribute('data-dragging');

        onMouseUp?.();
    };

    const handleThumbMouseDown = () => {
        if (rootRef.current) rootRef.current.setAttribute('data-dragging', 'true');
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                updateSliderFill(percentageCompleted: number) {
                    rootRef.current?.style.setProperty('--slider-fill', `${percentageCompleted}%`);
                },
            };
        },
        [],
    );

    return (
        <>
            <StyledContainer
                className="slider"
                onMouseMove={handleContainerMouseMove}
                onMouseUp={handleContainerMouseUp}
                ref={rootRef}
            >
                <StyledTrack className="slider-track" onClick={handleClick} />
                <StyledSliderFill className="slider-fill" />
                <StyledThumb className="slider-thumb" onMouseDown={handleThumbMouseDown}></StyledThumb>
            </StyledContainer>
        </>
    );
};

export default forwardRef(Slider);
