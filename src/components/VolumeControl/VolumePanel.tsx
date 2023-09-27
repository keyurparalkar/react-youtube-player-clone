import { motion, useAnimate } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { PlayerContext, PlayerDispatchContext } from "../../context";
import { VOLUME_CHANGE } from "../../context/actions";

export type VolumePanelProps = {
  isHovered: boolean;
};

const StyledPanelContainer = styled.div<VolumePanelProps>`
  position: relative;
  width: 60px;
  height: 10px;
  overflow: hidden;
  padding-top: 10px;
`;

const StyledVideoSlider = styled(motion.div)<any>`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  margin-top: -5px;
  cursor: pointer;
  user-select: none;

  &::before {
    content: "";
    background-color: white;
    position: absolute;
    width: 64px;
    height: 3px;
    left: -64px;
    margin-top: 5px;
  }

  &::after {
    content: "";
    background-color: #877c7c;
    position: absolute;
    width: 60px;
    height: 3px;
    margin-top: 5px;
    left: 12px;
  }
`;

const VolumePanel = ({ isHovered }: VolumePanelProps) => {
  const [scope, animate] = useAnimate();
  const dispatch = useContext(PlayerDispatchContext);
  const { volume } = useContext(PlayerContext);

  const thumbRef = useRef<HTMLDivElement>(null);

  const onDrag = (e: any) => {
    if (thumbRef.current) {
      const transformStyle = thumbRef.current.style.transform;
      if (transformStyle !== "none") {
        const current = parseFloat(transformStyle.replace(/[^\d.]/g, ""));
        let newVolume = current / 48;
        if (newVolume < 0) {
          newVolume = 0;
        }
        if (newVolume > 1) {
          newVolume = 1;
        }
        dispatch({
          type: VOLUME_CHANGE,
          payload: newVolume,
        });
      }
    }
  };

  useEffect(() => {
    if (isHovered) {
      animate(
        scope.current,
        {
          width: 60,
        },
        { ease: "easeIn", duration: 0.2 }
      );
    } else {
      animate(
        scope.current,
        {
          width: 0,
        },
        {
          ease: "linear",
          duration: 0.2,
        }
      );
    }
  }, [isHovered]);

  return (
    <StyledPanelContainer ref={scope} isHovered={isHovered}>
      <StyledVideoSlider
        className="volume-slider"
        drag="x"
        initial={{
          x: volume * 48,
        }}
        dragConstraints={{ left: 0, right: 48 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={onDrag}
        vol={volume}
        ref={thumbRef}
      />
    </StyledPanelContainer>
  );
};

export default VolumePanel;
