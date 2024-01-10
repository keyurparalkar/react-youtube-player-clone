import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { StateProps } from '../../../context';
import { COLORS } from './constants';
import { computeCurrentWidthFromPointerPos, getCSSVariableAbsoluteValue, SliderCSSVariableTypes } from './utils';

interface SliderProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onDrag' | 'onMouseUp' | 'onMouseMove'> {
    $total: number;
    $chapters?: StateProps['chapters'];
    $fillColor?: string;
    onClick?: (currentPercentage: number) => void;
    onDrag?: (completedPercentage: number) => void;
    onMouseUp?: () => void;
    onMouseMove?: (pointerPercentage: number) => void;
}

export interface SliderRefProps {
    updateSliderFill: (completedPercentage: number) => void;
}

type StyledContainerProps = Pick<SliderProps, '$fillColor' | '$total'>;

const StyledContainer = styled.div<StyledContainerProps>`
    --slider-pointer: 0%; // when hover happens pointer is updated
    --slider-fill: 0%; // when click and drag happens fill is updated
    --slider-track-bg-color: ${COLORS.TRACK_BG_COLOR};
    --slider-fill-color: ${(props) => props.$fillColor};

    position: relative;
    height: 30px;
    width: ${(props) => props.$total};
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;

    // For animating ring behind the thumb;
    &[data-dragging] {
        & .slider-thumb::before {
            opacity: 1;
        }
    }

    // Make thumb visible when hovered on this container;
    & .slider-thumb {
        opacity: 1;
    }
    &:hover {
    }
`;

const StyledTrack = styled.div`
    width: 100%;
    height: 5px;
    background-color: var(--slider-track-bg-color);
    position: absolute;
    pointer-events: auto;
`;

const StyledSliderFill = styled.div`
    height: 5px;
    background-color: var(--slider-fill-color);
    width: var(--chapter-fill, 0%);
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
    background-color: var(--slider-fill-color);
    position: absolute;
    /* bottom: 35%; */
    left: var(--slider-fill, 0%);
    transform: translate(-50%, 15%);
    z-index: 1;
    opacity: 0;
    transition:
        opacity 0.2s ease,
        box-shadow 0.3s ease;

    /**
     * This psuedo-element adds a ring behind the thumb of lighter color of --slidedr-fill-color.
     * This ring gets applied when dragging happens i.e. whenever data-dragging attribute is present. Check out the StyledContainer component above.
     * Articles to read for this:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/filter
     * https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness
     * https://developer.mozilla.org/en-US/docs/Web/CSS/::before
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
     */
    &::before {
        content: ' ';
        display: inline-block;
        background-color: var(--slider-fill-color);
        height: 24px;
        width: 24px;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.2s ease;
        filter: opacity(0.5);
        transform: translate(-18%, -18%);
    }
`;

const Slider = (props: SliderProps, ref: Ref<SliderRefProps>) => {
    const { $chapters, $total, onClick, onDrag, onMouseUp, onMouseMove, $fillColor = COLORS.WHITE } = props;
    const rootRef = useRef<HTMLDivElement>(null);

    const updateSliderFillByEvent = (variableName: SliderCSSVariableTypes, e: React.MouseEvent<HTMLDivElement>) => {
        const elem = rootRef.current;
        if (elem) {
            const rect = elem.getBoundingClientRect();

            const fillWidth = computeCurrentWidthFromPointerPos(e.pageX, rect.left, $total);
            if (fillWidth < 0 || fillWidth > 100) {
                return;
            }

            rootRef.current?.style.setProperty(variableName, `${fillWidth}%`);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (rootRef.current) {
            updateSliderFillByEvent('--slider-fill', e);
            const width = getCSSVariableAbsoluteValue('--slider-fill', rootRef);
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
            updateSliderFillByEvent('--slider-fill', e);
            const width = getCSSVariableAbsoluteValue('--slider-fill', rootRef);
            onDrag?.(width);
        }

        updateSliderFillByEvent('--slider-pointer', e);
        const pointerPos = getCSSVariableAbsoluteValue('--slider-pointer', rootRef);
        onMouseMove?.(pointerPos);
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
        <StyledContainer
            className="slider"
            $fillColor={$fillColor}
            onMouseMove={handleContainerMouseMove}
            onMouseUp={handleContainerMouseUp}
            ref={rootRef}
            $total={$total}
        >
            {$chapters && $chapters.length > 0 ? (
                $chapters.map((chapter, index) => (
                    <div
                        key={`key-${chapter.percentageTime}`}
                        style={{
                            width: `${chapter.percentageTime}%`,
                            height: '5px',
                            display: 'inline-block',
                            marginRight: '10px',
                            position: 'relative',
                        }}
                        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                            // console.log({ pageX: e.pageX, rect: e.target.getBoundingClientRect() });
                            if (rootRef.current && rootRef.current.getAttribute('data-dragging')) {
                                const elem = e.currentTarget;
                                const rect = elem.getBoundingClientRect();
                                const totalChapterWidth = (Number(chapter.percentageTime) * $total) / 100;

                                const chapterFillWidth = computeCurrentWidthFromPointerPos(
                                    e.pageX,
                                    rect.left,
                                    totalChapterWidth,
                                );
                                elem.style.setProperty('--chapter-fill', `${chapterFillWidth}%`);
                            }
                        }}
                    >
                        <StyledTrack className="slider-track" onClick={handleClick} />
                        <StyledSliderFill className="slider-fill" style={{ backgroundColor: `#FF${index}E33` }} />
                    </div>
                ))
            ) : (
                <>
                    <StyledTrack className="slider-track" onClick={handleClick} />
                    <StyledSliderFill className="slider-fill" />
                </>
            )}

            <StyledThumb className="slider-thumb" onMouseDown={handleThumbMouseDown}></StyledThumb>
        </StyledContainer>
    );
};

export default forwardRef(Slider);
