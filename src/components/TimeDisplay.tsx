import styled from 'styled-components';

const StyledContainer = styled.span`
    font-size: 85%;
    color: #ddd;
`;

const TimeDisplay = () => {
    return (
        <StyledContainer className="time-display-control">
            <span className="control-current-time">0:51</span>
            <span className="control-separator"> / </span>
            <span className="control-totaltime">1:10</span>
        </StyledContainer>
    );
};

export default TimeDisplay;
