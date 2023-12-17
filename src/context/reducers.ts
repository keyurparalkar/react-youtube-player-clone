import { ActionProps, StateProps } from '.';
import {
    HAS_VIDEO_LOADED,
    ON_MUTE,
    PLAY_PAUSE,
    UPDATE_HOVERED_DURATION,
    UPDATE_HOVERED_THUMBNAIL_URL,
    UPDATE_VIDEO_CURRENT_TIME,
    VOLUME_CHANGE,
} from './actions';

export const playerReducer = (state: StateProps, action: ActionProps) => {
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
                hasVideoLoaded: action.payload,
                totalDuration: action.payload.totalDuration,
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

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};
