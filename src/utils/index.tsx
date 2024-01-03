import styled from 'styled-components';

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
    font-size: ${(props) => (props.iconSize || props.iconSize !== '' ? props.iconSize : '')};
`;

export const constructUrl = (urls: Array<string | undefined>) => {
    return urls.reduce((acc: string, url) => acc + (url ?? ''), '');
};

export const numberToFixed = (num: number, fixedPos: number) => Number(num.toFixed(fixedPos));
