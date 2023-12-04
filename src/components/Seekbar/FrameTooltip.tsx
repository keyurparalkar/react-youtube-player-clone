import { Duration } from '../../context';

type FrameTooltipProps = {
    duration: Duration;
    thumbnailUrl: string;
};

const FrameTooltip = (props: FrameTooltipProps) => {
    const { duration } = props;
    return (
        <div className="frame-snapshot">
            <img id="frame" src="" alt="frame tooltip" width="50" height="50" style={{ backgroundColor: 'white' }} />
            <span>{duration}</span>
        </div>
    );
};

export default FrameTooltip;
