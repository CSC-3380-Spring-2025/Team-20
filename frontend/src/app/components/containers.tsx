import React from 'react';

interface ContainerStyle {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  fontWeight?: string;
  width?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  marginLeft?: string; 
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  height?: string;
  position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky'; 
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  transform?: string;
  boxShadow?: string;
  transition?: string;
  overflowY?: 'auto' | 'scroll' | 'hidden' | 'visible';
  style?: React.CSSProperties;
  zIndex?: string; 
  margin?:string;
  
}


interface DivContainerProps extends ContainerStyle {
  children: React.ReactNode;
}

const DivContainer: React.FC<DivContainerProps> = ({
  backgroundColor,
  color,
  fontSize,
  padding,
  borderRadius,
  fontWeight,
  width,
  display,
  justifyContent,
  margin,
  alignItems,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  height,
  position,
  top,
  left,
  right,
  bottom,
  opacity,
  transform,
  boxShadow,
  transition,
  overflowY,
  style,
  children,
  zIndex,
}) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor,
    color,
    fontSize,
    padding,
    borderRadius,
    fontWeight,
    width,
    display,
    justifyContent,
    alignItems,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    height,
    position,
    top,
    left,
    right,
    bottom,
    opacity,
    transform,
    boxShadow,
    transition,
    overflowY,
    ...style,
    zIndex,
    margin,
  };

  return <div style={containerStyle}>{children}</div>;
};

export default DivContainer;