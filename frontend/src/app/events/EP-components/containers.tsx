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
  marginRight?:string;
  marginTop?: string;
  marginBottom?:string;
  height?:string;
  position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky'; 
  top?:string;
  overflowY?: 'auto' | 'scroll' | 'hidden' | 'visible';
  style?: React.CSSProperties;

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
  alignItems,
  children,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  height,
  position,
  top,
  overflowY,
  style,
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
    overflowY,
    ...style,
  };

  return <div style={containerStyle}>{children}</div>;
};

export default DivContainer;
