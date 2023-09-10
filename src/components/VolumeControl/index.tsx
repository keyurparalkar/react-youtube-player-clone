import MuteButton from "./MuteButton";
import VolumePanel from "./VolumePanel";

export type VolumeControlProps = {
  muted?: boolean;
  volume?: number;
  onMute?: () => void;
};

const VolumeControl = ({ volume, muted, onMute }: VolumeControlProps) => {
  return (
    <div className="volume-control">
      <MuteButton muted={muted} onMute={onMute}/>
      <VolumePanel />
    </div>
  );
};

export default VolumeControl;
