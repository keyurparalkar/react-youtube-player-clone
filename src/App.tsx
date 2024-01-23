import styled from 'styled-components';
import YoutubePlayer from './components/YoutubePlayer';
import { PlayerProvider } from './context';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 300px 2fr;
    grid-template-rows: 100vh;
`;

const StyledSideBar = styled.div`
    background-color: #0af694;
`;

function App() {
    return (
        <StyledGrid>
            <StyledSideBar>
                <h1>Youtube Player Clone</h1>
            </StyledSideBar>
            <PlayerProvider>
                <YoutubePlayer />
            </PlayerProvider>
        </StyledGrid>
    );
}

export default App;
