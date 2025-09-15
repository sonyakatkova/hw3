import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number | string;
  height?: number | string;
};

const ArrowDownIcon: React.FC<IconProps> = ({ 
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
      className={combinedClassName} 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      <path 
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export default ArrowDownIcon;