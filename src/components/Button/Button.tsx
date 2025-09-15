import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';
import Loader from '../Loader/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;

  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  className,
  disabled,
  type = 'button',
  ...props
}) => {
 
  const isDisabled = loading || disabled === true;
  const isVisuallyDisabled = disabled === true;

  const buttonClassName = classNames(
    styles.button,
    {
      [styles.loading]: loading,
      [styles.disabled]: isVisuallyDisabled,
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={isDisabled} 
      {...props}
    >
      {loading && <Loader size='s' color='white' />}
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default Button;