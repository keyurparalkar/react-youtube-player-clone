import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from './Slider';

export type SeekbarProps = {
    initial?: number;
    onDragEvent?: () => void;
};

const StyledPanelContainer = styled.div`
    position: relative;
    width: 100%;
    height: 10px;
    overflow: hidden;
    padding-top: 5px;
`;

// type SliderProps = {
//     parentWidth: number;
// };

// const StyledVideoSlider = styled(motion.div)<SliderProps>`
//     position: absolute;
//     width: 12px;
//     height: 12px;
//     background-color: white;
//     border-radius: 50%;
//     margin-top: -5px;
//     cursor: pointer;
//     user-select: none;

//     &::before {
//         content: '';
//         background-color: white;
//         position: absolute;
//         width: ${(props) => props?.parentWidth}px;
//         height: 3px;
//         left: -${(props) => props?.parentWidth}px;
//         margin-top: 5px;
//     }

//     &::after {
//         content: '';
//         background-color: #877c7c;
//         position: absolute;
//         width: ${(props) => props?.parentWidth}px;
//         height: 3px;
//         margin-top: 5px;
//         left: 12px;
//     }
// `;

/**
 * The issue of seekbar is easy to solve. We should only load the controls whenever the video's first frame or data is available
 */
const Seekbar = (props: SeekbarProps) => {
    const { initial = 0 } = props;
    const [scope, animate] = useAnimate();
    const [parentWidth, setParentWidth] = useState(0);
    // const [sliderScope, sliderAnimate] = useAnimate();

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
    // if(scope.current){
    //     return scope.current.clientWidth
    // }
    //   const parentWidth = useMemo(() => {
    //   }, [scope.current])

    useEffect(() => {
        if (scope.current) {
            setParentWidth(scope.current.clientWidth);
        }
    }, []);

    return (
        <StyledPanelContainer ref={scope}>
            {/* <StyledVideoSlider
                className="volume-slider"
                drag="x"
                initial={{
                    x: initial * 800,
                }}
                dragConstraints={{ left: 0, right: 790 }} // contraint the slider not till 100% till 100% - 12px of the diameter
                dragElastic={0}
                dragMomentum={false}
                onDrag={onDrag}
                ref={sliderScope}
                parentWidth={parentWidth}
            /> */}
            <Slider initial={initial} parentWidth={parentWidth} />
        </StyledPanelContainer>
    );
};

export default Seekbar;
