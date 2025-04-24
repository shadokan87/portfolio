import React from 'react';

type JustifyType = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

interface FlexProps {
    children: React.ReactNode;
    row?: boolean;
    gap?: number;
    justify?: JustifyType;
    className?: string;
}

const Flex = ({ children, row = true, gap = 0, justify = 'start', className = '' }: FlexProps) => {
    return (
        <div
            className={`flex ${row ? 'flex-row' : 'flex-col'} ${
                gap ? `gap-${gap}` : ''
            } ${justify ? `justify-${justify}` : ''} ${className}`}
        >
            {children}
        </div>
    );
};

export default Flex;