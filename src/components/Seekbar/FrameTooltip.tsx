import styled from 'styled-components';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { Duration } from '../../context';
// TODO: Add batched stripes dynamically
import { useMemo } from 'react';
import { constructUrl } from '../../utils';

const { REACT_APP_BASE_URL, REACT_APP_IMAGE_STRIPE_URL } = process.env;
const IMAGE_STRIPE_URL = constructUrl([REACT_APP_BASE_URL, REACT_APP_IMAGE_STRIPE_URL]);

dayjs.extend(duration);

type FrameTooltipProps = {
    duration: Duration;
    thumbnailUrl: string;
};

type ImageProps = {
    imageUrl: string;
    width?: string;
    height?: string;
    offsetX: string;
    offsetY: string;
};

const StyledSnapshotContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const StyledImage = styled.div<ImageProps>`
    display: inline-block;
    background: url(${(props) => props.imageUrl}) -${(props) => props.offsetX}px -${(props) => props.offsetY}px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 2px solid white;
    border-radius: 10px;
`;

const FrameTooltip = (props: FrameTooltipProps) => {
    const { duration, thumbnailUrl } = props;
    let img;
    let dims;
    // TODO: move this to a utility function
    if (thumbnailUrl) {
        img = thumbnailUrl.split('#xywh=');
        dims = img[1].split(',');
    }

    const formattedDuration = useMemo(() => dayjs.duration(duration, 'seconds').format('m:ss'), [duration]);

    return (
        <StyledSnapshotContainer className="frame-snapshot">
            {thumbnailUrl && dims ? (
                <StyledImage
                    imageUrl={IMAGE_STRIPE_URL}
                    offsetX={dims[0]}
                    offsetY={dims[1]}
                    width={dims[2]}
                    height={dims[3]}
                />
            ) : (
                <img src="" style={{ backgroundColor: 'white', width: 50, height: 50 }} />
            )}
            <span>{formattedDuration}</span>
        </StyledSnapshotContainer>
    );
};

export default FrameTooltip;
