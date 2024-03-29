import { useContext } from 'react';
import styled from 'styled-components';
import YoutubePlayer from './components/YoutubePlayer';
import { PlayerContext, PlayerDispatchContext } from './context';
import { SELECT_SAMPLE_VIDEO, TOGGLE_CHAPTERS, TOGGLE_STATS } from './context/actions';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 350px 2fr;
    grid-template-rows: 100vh;
`;

const StyledSideBar = styled.div`
    background-color: #9fa4a2;
    padding: 0.5rem;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px 100px 100px;
    row-gap: 0.625rem;
`;

const StyledFieldSet = styled.fieldset`
    padding: 0.6rem;

    & button {
        margin-right: 1rem;
    }

    & div {
        margin-bottom: 0.5rem;
    }
`;
function App() {
    const { shouldHaveChapters, shouldhaveStats } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const toggleChapters = () =>
        dispatch({
            type: TOGGLE_CHAPTERS,
            payload: !shouldHaveChapters,
        });

    const toggleStats = () =>
        dispatch({
            type: TOGGLE_STATS,
            payload: !shouldhaveStats,
        });

    const selectSampleVideo = (videoName: string) =>
        dispatch({
            type: SELECT_SAMPLE_VIDEO,
            payload: videoName,
        });

    return (
        <StyledGrid>
            <StyledSideBar>
                <h1>Youtube Player Clone</h1>
                <StyledFieldSet className="video-sample-toggle">
                    <legend>Video Samples</legend>
                    <button onClick={() => selectSampleVideo('Sample 1')}>Sample 1</button>
                    <button onClick={() => selectSampleVideo('Sample 2')}>Sample 2</button>
                </StyledFieldSet>
                <StyledFieldSet className="video-control-toggle">
                    <legend>Toggle Video Controls</legend>

                    <div>
                        <input
                            id="enableChapters"
                            type="checkbox"
                            onChange={toggleChapters}
                            checked={shouldHaveChapters}
                        />
                        <label htmlFor="enableChapters">Enable Chapters</label>
                    </div>

                    <div>
                        <input id="enableStats" type="checkbox" onChange={toggleStats} checked={shouldhaveStats} />
                        <label htmlFor="enableStats">Enable Video Stats</label>
                    </div>
                </StyledFieldSet>
            </StyledSideBar>
            <YoutubePlayer />
        </StyledGrid>
    );
}

export default App;
