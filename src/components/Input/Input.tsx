import React, { useState, useRef } from 'react';
import styles from './Input.module.css';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  afterSlot,
  className = '',
  placeholder = 'Текст',
  style: propStyle, 
  onFocus: propOnFocus,
  onBlur: propOnBlur,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    propOnFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    propOnBlur?.(event);
  };

  const combinedStyle = isFocused
    ? { ...propStyle, border: '2px solid #B5460F', outline: 'none' }
    : propStyle; 

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <input
        {...props} 
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.input}
        placeholder={placeholder}
        style={combinedStyle}
      />
      {afterSlot && <div className={styles.afterSlot}>{afterSlot}</div>}
    </div>
  );
};

export default Input;