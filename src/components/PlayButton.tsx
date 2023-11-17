import { useContext } from 'react';
import { HiMiniPlay, HiMiniPause } from 'react-icons/hi2';
import { PlayerContext, PlayerDispatchContext } from '../context';
import { PLAY_PAUSE } from '../context/actions';
import { StyledIconButton } from '../utils';

const PlayButton = () => {
    const { isPlaying } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const onPlayPause = () => {
        dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
    };

    return (
        <StyledIconButton onClick={onPlayPause}>
            {isPlaying ? <HiMiniPause size="25px" /> : <HiMiniPlay size="25px" />}
        </StyledIconButton>
    );
};

export default PlayButton;
