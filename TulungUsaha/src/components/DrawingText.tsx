import React from 'react';

type Props = {
  className?: string;
  width?: number;
  height?: number;
  duration?: number;
  delay?: number;
  color?: string;
};

export default function DrawingText({ className, width = 300, height = 72, duration = 2, delay = 0, color = '#000' }: Props) {
  // Simple placeholder SVG that emulates a drawing animation using stroke-dasharray
  return (
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={Math.min(48, height * 0.6)} fill={color}>
        Showcase
      </text>
    </svg>
  );
}
