import React from 'react';
import styled from 'styled-components';
import { computeCurrentWidthFromPointerPos } from './utils';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    total: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => void;
}

const StyledSlider = styled.div`
    --slider-pointer: 0%; // when hover happens pointer is updated
    --slider-fill: 0%; // when click and drag happens fill is updated
    height: 14px;
    background-color: red;
`;

const StyledSliderFill = styled.div`
    height: 14px;
    background-color: blue;
    width: var(--slider-fill, 0%);
`;

/**
 * We need a function that will translate the percentages of the css variables to the actual video durations.
 * Because:
 * 1. We need to show the tool tip for each frame
 * 2. We need to do update the video duration on click and drag
 */
const Slider = (props: SliderProps) => {
    const { total, onClick, onMouseDown, onDrag, onDragEnd } = props;
    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const elem = e.currentTarget;

    //     const rect = elem.getBoundingClientRect();
    //     console.log({ pageX: e.pageX, rectLeft: rect.left });
    //     const fillWidth = ((e.pageX - rect.left) / 800) * 100;
    //     elem.style.setProperty('--slider-pointer', `${fillWidth}%`);
    // };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;
        const rect = elem.getBoundingClientRect();
        const fillWidth = computeCurrentWidthFromPointerPos(e.pageX, rect.left, total);
        elem.style.setProperty('--slider-fill', `${fillWidth}%`);

        onDrag?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;
        const rect = elem.getBoundingClientRect();

        const fillWidth = computeCurrentWidthFromPointerPos(e.clientX, rect.left, total);
        elem.style.setProperty('--slider-fill', `${fillWidth}%`);

        onClick?.(e, rect.left);
    };

    return (
        <StyledSlider
            className="slider"
            onClick={handleClick}
            onMouseDown={onMouseDown}
            onDrag={handleDrag}
            onDragEnd={onDragEnd}
        >
            <div className="slider-track"></div>
            {/* // --slider-pointer is also appearing in the below element. Value in the parent is getting updating but the children are not getting it */}
            <StyledSliderFill className="slider-fill"></StyledSliderFill>
        </StyledSlider>
    );
};

export default Slider;
