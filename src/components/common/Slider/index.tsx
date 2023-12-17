import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { computeCurrentWidthFromPointerPos } from './utils';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    total: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => void;
}

const StyledContainer = styled.div`
    --slider-pointer: 0%; // when hover happens pointer is updated
    --slider-fill: 0%; // when click and drag happens fill is updated
`;
const StyledSlider = styled.div`
    height: 14px;
    background-color: red;
    position: relative;
`;

const StyledSliderFill = styled.div`
    height: 14px;
    background-color: blue;
    width: var(--slider-fill, 0%);
`;

const StyledThumb = styled.div`
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: green;

    position: absolute;
    top: 12%;
    left: var(--slider-fill, 0%);
`;

const Slider = (props: SliderProps) => {
    const { total, onClick, onMouseDown, onDrag, onDragEnd } = props;
    const rootRef = useRef<HTMLDivElement>(null);
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

        const fillWidth = computeCurrentWidthFromPointerPos(e.clientX, rect.left, total);
        rootRef.current?.style.setProperty('--slider-fill', `${fillWidth}%`);

        onClick?.(e, rect.left);
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
            const elem = rootRef.current;
            const rect = elem.getBoundingClientRect();

            const fillWidth = computeCurrentWidthFromPointerPos(e.pageX, rect.left, total);
            rootRef.current?.style.setProperty('--slider-fill', `${fillWidth}%`);
            // onDrag?.(e);
        }
    };

    const handleContainerMouseUp = () => {
        if (rootRef.current) rootRef.current.removeAttribute('data-dragging');
    };

    const handleThumbMouseDown = () => {
        if (rootRef.current) rootRef.current.setAttribute('data-dragging', 'true');
    };

    return (
        <>
            <StyledContainer
                className="slider"
                // onMouseDown={onMouseDown}
                // onDragEnd={onDragEnd}
                // onDragOver={handleDragOver}
                // onDrag={handleDrag}
                onMouseMove={handleContainerMouseMove}
                onMouseUp={handleContainerMouseUp}
                ref={rootRef}
            >
                <StyledSlider className="slider-track" onClick={handleClick} onMouseDown={onMouseDown} />
                <StyledSliderFill className="slider-fill" />
                <StyledThumb className="slider-thumb" onMouseDown={handleThumbMouseDown}></StyledThumb>
            </StyledContainer>
        </>
    );
};

export default Slider;
