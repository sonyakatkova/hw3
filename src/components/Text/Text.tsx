import * as React from 'react'
import './Text.css';

export type TextProps = {
    className?: string;
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'accent';
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
  ...rest
}) => {
   const baseClass = 'text';
  const viewClass = view ? `text--view-${view}` : '';
  const weightClass = weight ? `text--weight-${weight}` : '';
  const colorClass = color ? `text--color-${color}` : '';
  const maxLinesClass = maxLines !== undefined ? 'text--max-lines' : '';
  
  const classes = [
    baseClass,
    viewClass,
    weightClass,
    colorClass,
    maxLinesClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const style = maxLines !== undefined 
    ? { WebkitLineClamp: maxLines } 
    : undefined;

  return (
    <Tag 
      className={classes} 
      style={style} 
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Text;