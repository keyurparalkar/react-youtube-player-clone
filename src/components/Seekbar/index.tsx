import { useContext, useEffect, useMemo, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { UPDATE_HOVERED_DURATION, UPDATE_SEEKING, UPDATE_VIDEO_CURRENT_TIME } from '../../context/actions';
import { numberToFixed } from '../../utils';
import Slider, { SliderRefProps } from '../common/Slider';
import Tooltip from '../common/Tooltip';
import FrameTooltip from './FrameTooltip';
import { VIDEO_INFO_1, VIDEO_INFO_2 } from '../../utils/constants';

const tooltipStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
};

const Seekbar = () => {
    const {
        chapters,
        currentTime,
        totalDuration,
        hoveredDuration,
        hoveredThumbnailUrl,
        isSeeking,
        shouldHaveChapters,
        selectedSampleVideo,
    } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const sliderRef = useRef<SliderRefProps>(null);

    const onPositionChangeByDrag = (completedPercentage: number) => {
        let currentTime = (completedPercentage * totalDuration) / 100;
        currentTime = numberToFixed(currentTime, 4);

        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime },
        });
        dispatch({
            type: UPDATE_SEEKING,
            payload: true,
        });
    };

    const handleMouseUp = () => {
        dispatch({
            type: UPDATE_SEEKING,
            payload: false,
        });
    };

    const onPositionChangeByClick = (currentPercentage: number) => {
        let newCurrentTime = (currentPercentage * totalDuration) / 100;
        newCurrentTime = numberToFixed(newCurrentTime, 2);

        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime: newCurrentTime },
        });

        dispatch({
            type: UPDATE_SEEKING,
            payload: true,
        });
    };

    const handleMouseMove = (pointerPercentage: number) => {
        let hoveredDuration = (pointerPercentage * totalDuration) / 100;
        hoveredDuration = numberToFixed(hoveredDuration, 2);
        dispatch({ type: UPDATE_HOVERED_DURATION, payload: hoveredDuration });
    };

    const currentChapter = chapters?.filter(
        (chapter) => currentTime && currentTime > chapter.startTime && currentTime < chapter.endTime,
    );

    const hoveredChapter = chapters?.filter(
        (chapter) => hoveredDuration && hoveredDuration > chapter.startTime && hoveredDuration < chapter.endTime,
    );

    const [spriteName, coords] = hoveredThumbnailUrl.split('#xywh=');

    const dims = coords?.split(',');

    const thumbnailUrl = useMemo(() => {
        if (selectedSampleVideo === 'Sample 2') {
            return `${VIDEO_INFO_2.sprite}/${spriteName}?${VIDEO_INFO_2.spriteKey}`;
        }

        return `${VIDEO_INFO_1.sprite}/${spriteName}?${VIDEO_INFO_1.spriteKey}`;
    }, [selectedSampleVideo, spriteName]);

    // Update CSS variables that drives the slider component
    useEffect(() => {
        if (sliderRef.current && !isSeeking) {
            const newPosPercentage = (currentTime / totalDuration) * 100;
            sliderRef.current.updateSliderFill(newPosPercentage);

            //TODO(Keyur): To add comments and optimize the below solution;
            if (currentChapter.length > 0) {
                const { index, endTime, startTime } = currentChapter[0];
                const totalChapterDuration = endTime - startTime;
                const currentChapterFillWidth =
                    index === 0
                        ? (currentTime / totalChapterDuration) * 100
                        : ((currentTime - chapters[index - 1].endTime) / totalChapterDuration) * 100;
                sliderRef.current.updateChapterFill(index, currentChapterFillWidth);
            }
        }
    }, [currentTime, isSeeking]);

    return (
        <div style={{ width: 780 }}>
            <Tooltip
                content={
                    // TODO(Keyur): To move the thumbnail URL construction in this component rahter than parent
                    <FrameTooltip
                        dims={dims}
                        duration={hoveredDuration}
                        thumbnailUrl={thumbnailUrl}
                        chapterName={hoveredChapter[0]?.chapterName}
                    />
                }
                movingTooltip
                tooltipStyles={tooltipStyles}
            >
                <Slider
                    $currentChapter={currentChapter?.[0]}
                    $chapters={chapters}
                    $currentTime={currentTime}
                    $total={780}
                    $fillColor="#ff0000"
                    $shouldDisplayChapters={shouldHaveChapters}
                    onClick={onPositionChangeByClick}
                    onDrag={onPositionChangeByDrag}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    ref={sliderRef}
                />
            </Tooltip>
        </div>
    );
};

export default Seekbar;
