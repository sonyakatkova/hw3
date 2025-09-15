import * as React from 'react'
import Icon from '../Icon/Icon';
import type {IconProps} from '../Icon/Icon';

const ArrowBackIcon: React.FC<IconProps> = ({ color, style, ...props }) => {
  const colorStyle = color ? { 
    color: `var(--color-${color})` 
  } : {};

  return (
    <Icon 
      viewBox="0 0 24 24" 
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1201 22.56L2.42678 13.8667C1.40012 12.84 1.40012 11.16 2.42678 10.1333L11.1201 1.44" stroke="#B5460F" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



    </Icon>
  );
};

export default ArrowBackIcon;