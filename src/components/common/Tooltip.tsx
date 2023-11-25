import { ReactElement } from 'react';
import styled from 'styled-components';

type TooltipProps = {
    content?: string | ReactElement;
    children?: ReactElement;
};

const StyledTooltip = styled.div`
    background-color: #656565;
    color: white;
    position: absolute;
`;

const Tooltip = (props: TooltipProps) => {
    const { children, content } = props;
    return (
        <div style={{ position: 'relative' }}>
            <StyledTooltip>{content}</StyledTooltip>
            {children}
        </div>
    );
};

export default Tooltip;
