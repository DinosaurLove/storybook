import clsx from 'clsx';
import React, { memo } from 'react';

interface IButtonProps {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  type?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

interface IRecord {[size: string]: string }

const Button = ({
  label,
  size = 'medium',
  type = 'primary',
  onClick = () => {},
  backgroundColor = '',
  ...props
}: IButtonProps) => {

  const sizeClasses: IRecord = {
    small: 'text-xs py-2 px-4',
    medium: 'text-sm py-2.5 px-5',
    large: 'text-base py-3 px-6',
  };

  const primaryClasses: IRecord = {
    primary: 'text-white bg-blue-500 hover:bg-blue-600 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-center',
    secondary : 'text-gray-800 shadow-inner border border-gray-300 hover:text-gray-700'
  }

  const style = backgroundColor ? { backgroundColor } : undefined;

  return (
    <button
      type="button"
      className={
        clsx(
          'transition-all ease-in duration-75 inline-block font-bold cursor-pointer leading-none border rounded-full',
          sizeClasses[size], 
          primaryClasses[type]
        )
      }
      onClick={onClick}
      style={style}
      {...props}
    >
      {label}
    </button>
  );
};

export default memo(Button);
