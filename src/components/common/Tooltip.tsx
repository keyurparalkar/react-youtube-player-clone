import {
    autoUpdate,
    flip,
    offset,
    shift,
    useClientPoint,
    useFloating,
    useHover,
    useInteractions,
} from '@floating-ui/react';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

type TooltipProps = {
    content: string | ReactElement;
    movingTooltip?: boolean;
    children?: ReactElement;
};

const StyledTooltip = styled.div`
    display: inline-block;
    background-color: rgba(28, 28, 28, 0.9);
    color: white;
    border-radius: 4px;
    padding: 5px 9px;
    font-size: 0.8rem;
`;

const Tooltip = (props: TooltipProps) => {
    const { children, content, movingTooltip = false } = props;
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top',
        middleware: [
            offset(10),
            flip({
                fallbackAxisSideDirection: 'start',
            }),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, { move: false });
    const clientPoint = useClientPoint(context, {
        enabled: movingTooltip,
        axis: 'x',
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover, clientPoint]);

    return (
        <>
            <div className="tooltip-trigger" ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>

            {isOpen && (
                <StyledTooltip ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                    {content}
                </StyledTooltip>
            )}
        </>
    );
};

export default Tooltip;
