import { motion, useAnimate } from "framer-motion";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { PlayerContext, PlayerDispatchContext } from "../../context";
import { VOLUME_CHANGE } from "../../context/actions";

export type VolumePanelProps = {
  isHovered: boolean;
};

const StyledPanelContainer = styled.div`
  position: relative;
  width: 60px;
  height: 10px;
  overflow: hidden;
  padding-top: 5px;
`;

const StyledVideoSlider = styled(motion.div)`
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
  const [sliderScope, sliderAnimate] = useAnimate();
  const dispatch = useContext(PlayerDispatchContext);
  const { volume, muted } = useContext(PlayerContext);

  const onDrag = () => {
    if (sliderScope.current) {
      const transformStyle = sliderScope.current.style.transform;
      if (transformStyle !== "none") {
        const current = parseFloat(transformStyle.replace(/[^\d.]/g, ""));
        let newVolume = current / 48;
        if (newVolume <= 0.03) {
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
  }, [isHovered, animate, scope]);

  useEffect(() => {
    sliderAnimate(
      sliderScope.current,
      {
        x: muted ? 0 : volume * 48,
      },
      {
        ease: "linear",
        duration: 0.1,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted, sliderAnimate, sliderScope]);

  return (
    <StyledPanelContainer ref={scope}>
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
        ref={sliderScope}
      />
    </StyledPanelContainer>
  );
};

export default VolumePanel;
