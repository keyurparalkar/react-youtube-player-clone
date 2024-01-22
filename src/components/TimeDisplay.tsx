import { useContext } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import styled from 'styled-components';
import { PlayerContext } from '../context';

dayjs.extend(duration);

const StyledContainer = styled.span`
    margin: 0.4rem 1rem 0.7rem 0rem;
    font-size: 85%;
    color: #ddd;
`;

const TimeDisplay = () => {
    const { currentTime, totalDuration } = useContext(PlayerContext);

    const formattedCurrentTime = dayjs.duration(currentTime, 'seconds').format('m:ss') || '0:00';
    const formattedTotalDuration = dayjs.duration(totalDuration, 'seconds').format('m:ss') || '0:00';

    return (
        <StyledContainer className="time-display-control">
            <span className="control-current-time">{formattedCurrentTime}</span>
            <span className="control-separator"> / </span>
            <span className="control-totaltime">{formattedTotalDuration}</span>
        </StyledContainer>
    );
};

export default TimeDisplay;
