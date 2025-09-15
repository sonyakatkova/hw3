import * as React from 'react'
import Icon from '../Icon/Icon';
import type {IconProps} from '../Icon/Icon';

const CheckIcon: React.FC<IconProps> = ({ color, style, ...props }) => {
  const colorStyle = color ? { 
    color: `var(--color-${color})` 
  } : {};

  return (
    <Icon 
      viewBox="0 0 24 24" 
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      <path 
        d="M4 11.6129L9.87755 18L20 7" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"      
      />
    </Icon>
  );
};

export default CheckIcon;