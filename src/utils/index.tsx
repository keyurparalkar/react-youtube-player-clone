import styled from "styled-components";

type IconButtonProps = {
  iconSize?: string;
};

export const StyledIconButton = styled.button<IconButtonProps>`
  background-color: transparent;
  border: none;
  width: 45px;
  float: left;
  margin-bottom: 3px;
  color: inherit;
  font-size: ${(props) =>
    props.iconSize || props.iconSize !== "" ? props.iconSize : ""};
`;
