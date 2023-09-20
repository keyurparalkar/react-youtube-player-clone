import { useState } from "react";
import styled from "styled-components";
import MuteButton from "./MuteButton";
import VolumePanel, { VolumePanelProps } from "./VolumePanel";

const StyledVolumeControl = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
`;

const VolumeControl = () => {
  const [isVolumeControlHovered, setIsVolumeControlHovered] = useState(false);

  const onMouseEnter = () => {
    setIsVolumeControlHovered(true);
  };

  const onMouseLeave = () => {
    setIsVolumeControlHovered(false);
  };
  return (
    <StyledVolumeControl
      className="volume-control"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MuteButton />
      <VolumePanel isHovered={isVolumeControlHovered} />
    </StyledVolumeControl>
  );
};

export default VolumeControl;
