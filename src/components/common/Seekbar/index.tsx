import { motion, useAnimate } from 'framer-motion';
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';

export type SeekbarProps = {
    initialPos?: number;
    onPositionChange?: (sliderRef: Ref<HTMLDivElement>) => void;
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

// Make use of imperative handle to provide access to the sliderAnimate function or sliderScope;
const Seekbar = (props: SeekbarProps, ref: Ref<HTMLDivElement>) => {
    const { initialPos = 0, onPositionChange } = props;
    // const [scope, animate] = useAnimate();
    const scope = useRef<HTMLDivElement | null>(null);
    const [sliderScope, sliderAnimate] = useAnimate();
    const [parentWidth, setParentWidth] = useState(0);

    // const onDrag = () => {
    //     if (sliderScope.current) {
    //         const transformStyle = sliderScope.current.style.transform;
    //         if (transformStyle !== 'none') {
    //             const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
    //             let newVolume = current / 48;
    //             if (newVolume <= 0.03) {
    //                 newVolume = 0;
    //             }
    //             if (newVolume > 1) {
    //                 newVolume = 1;
    //             }
    //             if (onDragEvent) onDragEvent();
    //         }
    //     }
    // };

    //   useEffect(() => {
    //     if (isHovered) {
    //       animate(
    //         scope.current,
    //         {
    //           width: 60,
    //         },
    //         { ease: "easeIn", duration: 0.2 }
    //       );
    //     } else {
    //       animate(
    //         scope.current,
    //         {
    //           width: 0,
    //         },
    //         {
    //           ease: "linear",
    //           duration: 0.2,
    //         }
    //       );
    //     }
    //   }, [isHovered, animate, scope]);

    //   useEffect(() => {
    //     sliderAnimate(
    //       sliderScope.current,
    //       {
    //         x: muted ? 0 : volume * 48,
    //       },
    //       {
    //         ease: "linear",
    //         duration: 0.1,
    //       }
    //     );
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [muted, sliderAnimate, sliderScope]);

    const onDrag = () => {
        onPositionChange?.(sliderScope);
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                sliderAnimate,
                sliderScope,
            };
        },
        [],
    );

    useEffect(() => {
        if (scope.current) {
            setParentWidth(scope.current.clientWidth);
        }
    }, []);

    return (
        <StyledPanelContainer ref={scope}>
            {/* <Slider initialPos={initialPos} parentWidth={parentWidth} onPositionChange={onPositionChange} />
             */}
            <StyledVideoSlider
                className="volume-slider"
                drag="x"
                initial={{
                    x: initialPos ? initialPos * parentWidth : 0,
                }}
                dragConstraints={{ left: 0, right: parentWidth - 10 }} // contraint the slider not till 100% till 100% - 12px of the diameter
                dragElastic={0}
                dragMomentum={false}
                onDrag={onDrag}
                ref={sliderScope}
                parentWidth={parentWidth}
            />
        </StyledPanelContainer>
    );
};

export default forwardRef(Seekbar);
