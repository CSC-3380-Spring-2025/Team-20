'use client';

import React from 'react';
interface ButtonStyle{
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string; 
  fontWeight?: string; 

}

interface My_Button extends ButtonStyle {
  children: React.ReactNode;
  onClick? : () => void; 
}

const Button: React.FC<My_Button> = ({
  backgroundColor,
  color, 
  fontSize,
  padding,
  borderRadius,
  fontWeight,
  children,
  onClick,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor,
    color,
    fontSize,
    padding,
    borderRadius,
    fontWeight,
    cursor: 'pointer',
    border: 'none',

  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button; 