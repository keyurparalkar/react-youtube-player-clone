import React from 'react';
import styled from 'styled-components';

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
const Slider = () => {
    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const elem = e.currentTarget;

    //     const rect = elem.getBoundingClientRect();
    //     console.log({ pageX: e.pageX, rectLeft: rect.left });
    //     const fillWidth = ((e.pageX - rect.left) / 800) * 100;
    //     elem.style.setProperty('--slider-pointer', `${fillWidth}%`);
    // };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;

        const rect = elem.getBoundingClientRect();
        console.log({ pageX: e, rectLeft: rect.left });
        const fillWidth = ((e.clientX - rect.left) / 800) * 100;
        elem.style.setProperty('--slider-fill', `${fillWidth}%`);
    };

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;

        const rect = elem.getBoundingClientRect();
        console.log({ pageX: e, rectLeft: rect.left });
        const fillWidth = ((e.pageX - rect.left) / 800) * 100;
        elem.style.setProperty('--slider-fill', `${fillWidth}%`);
    };

    return (
        <StyledSlider className="slider" onClick={handleClick} onDrag={handleDrag}>
            <div className="slider-track"></div>
            {/* // --slider-pointer is also appearing in the below element. Value in the parent is getting updating but the children are not getting it */}
            <StyledSliderFill className="slider-fill"></StyledSliderFill>
        </StyledSlider>
    );
};

export default Slider;
