import { ActionProps, StateProps } from '.';
import {
    HAS_VIDEO_LOADED,
    ON_MUTE,
    PLAY_PAUSE,
    SELECT_SAMPLE_VIDEO,
    TOGGLE_CHAPTERS,
    TOGGLE_STATS,
    UPDATE_HOVERED_DURATION,
    UPDATE_HOVERED_THUMBNAIL_URL,
    UPDATE_SEEKING,
    UPDATE_VIDEO_CURRENT_TIME,
    VOLUME_CHANGE,
} from './actions';

export const playerReducer = (state: StateProps, action: ActionProps): StateProps => {
    switch (action.type) {
        case PLAY_PAUSE: {
            return {
                ...state,
                isPlaying: action.payload,
            };
        }

        case ON_MUTE: {
            return {
                ...state,
                muted: action.payload,
            };
        }

        case VOLUME_CHANGE: {
            return {
                ...state,
                volume: action.payload,
            };
        }

        case HAS_VIDEO_LOADED: {
            return {
                ...state,
                hasVideoLoaded: action.payload.hasVideoLoaded,
                totalDuration: action.payload.totalDuration,
                chapters: action.payload.chapters,
            };
        }

        case UPDATE_VIDEO_CURRENT_TIME: {
            return {
                ...state,
                currentTime: action.payload.currentTime,
            };
        }

        case UPDATE_HOVERED_DURATION: {
            return {
                ...state,
                hoveredDuration: action.payload,
            };
        }

        case UPDATE_HOVERED_THUMBNAIL_URL: {
            return {
                ...state,
                hoveredThumbnailUrl: action.payload,
            };
        }

        case UPDATE_SEEKING: {
            return {
                ...state,
                isSeeking: action.payload,
            };
        }

        case TOGGLE_CHAPTERS: {
            return {
                ...state,
                shouldHaveChapters: action.payload,
            };
        }

        case TOGGLE_STATS: {
            return {
                ...state,
                shouldhaveStats: action.payload,
            };
        }

        case SELECT_SAMPLE_VIDEO: {
            return {
                ...state,
                selectedSampleVideo: action.payload,
            };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};
