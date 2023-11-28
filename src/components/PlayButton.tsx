import { useContext } from 'react';
import { HiMiniPlay, HiMiniPause } from 'react-icons/hi2';
import { PlayerContext, PlayerDispatchContext } from '../context';
import { PLAY_PAUSE } from '../context/actions';
import { StyledIconButton } from '../utils';
import Tooltip from './common/Tooltip';

const PlayButton = () => {
    const { isPlaying } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const onPlayPause = () => {
        dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
    };

    return (
        <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
            <StyledIconButton onClick={onPlayPause}>
                {isPlaying ? <HiMiniPause size="25px" /> : <HiMiniPlay size="25px" />}
            </StyledIconButton>
        </Tooltip>
    );
};

export default PlayButton;
