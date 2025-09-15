import React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number | string;
  height?: number | string;
};

interface IconWrapperProps extends IconProps {
  children: React.ReactNode;
  viewBox: string;
}

const Icon: React.FC<IconWrapperProps> = ({ 
  children, 
  viewBox, 
  width = 24, 
  height = 24, 
  color, 
  className = '', 
  style,
  ...props 
}) => {
  const colorClass = color ? `icon-${color}` : '';
  const combinedClassName = `icon ${colorClass} ${className}`.trim();
  const colorStyle = color ? { 
    color: `var(--color-${color})` 
  } : {};

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={combinedClassName}
      fill="currentColor"
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;