import './App.css';
import YoutubePlayer from './components/YoutubePlayer';
import { PlayerProvider } from './context';

function App() {
    return (
        <PlayerProvider>
            <div className="App">
                <h1>Youtube Player Clone</h1>
                <YoutubePlayer />
            </div>
        </PlayerProvider>
    );
}

export default App;
