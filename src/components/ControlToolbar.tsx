import { motion } from 'framer-motion';
import { useContext } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../context';
import PlayButton from './PlayButton';
import VolumeControl from './VolumeControl';
import Seekbar from './Seekbar';
import Slider from './common/Slider';

const StyledVideoControl = styled(motion.div)<{ isPlaying?: boolean }>`
    position: absolute;
    width: 100%;
    color: #eee;
    bottom: 0rem;
    background: #ffffff00;
    background: linear-gradient(180deg, #ffffff00, #010101);
    ${(props) => (!props.isPlaying ? 'opacity: 1 !important' : '')};
`;

const StyledInteractionGroup1 = styled.div`
    display: flex;
`;

const ControlToolbar = () => {
    const { isPlaying } = useContext(PlayerContext);

    return (
        <StyledVideoControl className="video-controls" isPlaying={isPlaying}>
            <Seekbar />
            <Slider />
            <StyledInteractionGroup1 className="interaction-group-1">
                <PlayButton />
                <VolumeControl />
            </StyledInteractionGroup1>
        </StyledVideoControl>
    );
};

export default ControlToolbar;
