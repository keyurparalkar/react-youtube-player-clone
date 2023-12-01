import { motion } from 'framer-motion';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export type ProgressBarProps = {
    initialPos?: number;
    onPositionChangeByDrag?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
    onPositionChangeByClick?: (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => void;
    onDragEnd?: () => void;
    onMouseDown?: () => void;
};

type SliderProps = {
    parentWidth: number;
};

const StyledPanelContainer = styled.div`
    position: relative;
    width: 100%;
    height: 10px;
    overflow: hidden;
    padding-top: 5px;
`;

const StyledVideoSlider = styled(motion.div)<SliderProps>`
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    margin-top: -5px;
    cursor: pointer;
    user-select: none;

    &::before {
        content: '';
        background-color: white;
        position: absolute;
        width: ${(props) => props?.parentWidth}px;
        height: 3px;
        left: -${(props) => props?.parentWidth}px;
        margin-top: 5px;
    }

    &::after {
        content: '';
        background-color: #877c7c;
        position: absolute;
        width: ${(props) => props?.parentWidth}px;
        height: 3px;
        margin-top: 5px;
        left: 12px;
    }
`;

/**
 * A resuable components that displays a progressbar with a knob.
 * SliderRef have access to the knob present on the bar.
 * With the help of this ref you can do multiple animations on the knob from the parent component.
 */
const ProgressBar = (props: ProgressBarProps, sliderRef: Ref<HTMLDivElement>) => {
    const { initialPos = 0, onPositionChangeByDrag, onPositionChangeByClick, onDragEnd, onMouseDown } = props;
    const scope = useRef<HTMLDivElement | null>(null);
    const [parentWidth, setParentWidth] = useState(0);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scope.current) {
            const rect = scope.current.getBoundingClientRect();
            onPositionChangeByClick?.(e, rect.left);
        }
    };

    useEffect(() => {
        if (scope.current) {
            setParentWidth(scope.current.clientWidth);
        }
    }, []);

    return (
        <StyledPanelContainer ref={scope}>
            <StyledVideoSlider
                drag="x"
                initial={{
                    x: initialPos ? initialPos * parentWidth : 0,
                }}
                dragConstraints={{ left: 0, right: parentWidth - 12 }} // contraint the slider not till 100% till 100% - 12px of the diameter
                dragElastic={0}
                dragMomentum={false}
                onDrag={onPositionChangeByDrag}
                onDragEnd={onDragEnd}
                onMouseDown={onMouseDown}
                onClick={handleClick}
                ref={sliderRef}
                parentWidth={parentWidth}
            />
        </StyledPanelContainer>
    );
};

export default forwardRef(ProgressBar);
