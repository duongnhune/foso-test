// RoundedSector.tsx
import React from 'react';
import { Sector, SectorProps } from 'recharts';
import { SVGProps } from 'react';

interface RoundedSectorProps extends SectorProps, SVGProps {
    cornerRadius?: number;
}

const RADIAN = Math.PI / 180;

const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => ({
    x: cx + radius * Math.cos(-angle * RADIAN),
    y: cy + radius * Math.sin(-angle * RADIAN),
});

const getPath = (x: number, y: number, radius: number, startAngle: number, endAngle: number, cornerRadius: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const outerRadius = Math.max(0, radius);
    const innerRadius = Math.max(0, radius - cornerRadius);

    if (cornerRadius === 0 || outerRadius === 0) {
        return `M ${start.x},${start.y} A ${outerRadius},${outerRadius},0,${largeArcFlag},0,${end.x},${end.y} L ${x},${y} Z`;
    }

    const startCorner = polarToCartesian(x, y, innerRadius, endAngle);
    const endCorner = polarToCartesian(x, y, innerRadius, startAngle);

    return `
        M ${start.x},${start.y}
        A ${outerRadius},${outerRadius},0,${largeArcFlag},0,${endCorner.x},${endCorner.y}
        L ${endCorner.x},${endCorner.y}
        A ${cornerRadius},${cornerRadius},0,0,1,${startCorner.x},${startCorner.y}
        L ${startCorner.x},${startCorner.y}
        A ${outerRadius},${outerRadius},0,${largeArcFlag},1,${start.x},${start.y}
        Z
    `;
};

const RoundedSector: React.FC<RoundedSectorProps> = (props) => {
    const { cx, cy, outerRadius, innerRadius, startAngle, endAngle, fill, cornerRadius = 0, ...rest } = props;
    const path = getPath(cx, cy, outerRadius, startAngle, endAngle, cornerRadius);

    console.log("RoundedSector props:", props); // Log toàn bộ props nhận được
    console.log("RoundedSector fill:", fill);
    console.log("RoundedSector cornerRadius:", cornerRadius);

    return <path d={path} fill={fill} {...rest} />;
};

export default RoundedSector;