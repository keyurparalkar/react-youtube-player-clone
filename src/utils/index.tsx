import styled from "styled-components";

type IconButtonProps = {
  iconSize?: string;
};

export const StyledIconButton = styled.button<IconButtonProps>`
  background-color: transparent;
  border: none;
  width: 40px;
  float: left;
  color: inherit;
  font-size: ${(props) =>
    props.iconSize || props.iconSize !== "" ? props.iconSize : ""};
`;
