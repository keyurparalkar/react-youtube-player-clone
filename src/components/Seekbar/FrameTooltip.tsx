import styled from 'styled-components';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { Duration } from '../../context';
import { useMemo } from 'react';

dayjs.extend(duration);

type FrameTooltipProps = {
    duration: Duration;
    thumbnailUrl: string;
    dims: Array<string>;
    chapterName?: string;
};

type ImageProps = {
    $imageUrl: string;
    width?: string;
    height?: string;
    $offsetX: string;
    $offsetY: string;
};

const StyledSnapshotContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const StyledImage = styled.div<ImageProps>`
    display: inline-block;
    // important to provide negative values to x and y offset because we need to start sliding from left to right on the grid
    background: url(${(props) => props.$imageUrl}) -${(props) => props.$offsetX}px -${(props) => props.$offsetY}px;
    background-color: #2c2c2c;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 2px solid white;
    border-radius: 10px;
`;

const FrameTooltip = (props: FrameTooltipProps) => {
    const { duration, thumbnailUrl, dims, chapterName = '' } = props;

    const formattedDuration = useMemo(() => dayjs.duration(duration, 'seconds').format('m:ss'), [duration]);

    return (
        <StyledSnapshotContainer className="frame-snapshot">
            {thumbnailUrl && dims ? (
                <StyledImage
                    $imageUrl={thumbnailUrl}
                    $offsetX={dims[0]}
                    $offsetY={dims[1]}
                    width={dims[2]}
                    height={dims[3]}
                />
            ) : (
                <img src="" style={{ backgroundColor: 'white', width: 200, height: 83 }} />
            )}
            <span>{chapterName}</span>
            <span>{formattedDuration}</span>
        </StyledSnapshotContainer>
    );
};

export default FrameTooltip;
