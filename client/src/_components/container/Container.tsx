import React, { CSSProperties } from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  customStyles?: CSSProperties;
  display?: CSSProperties["display"];
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
  gridRow?: CSSProperties["gridRow"];
  gridColumn?: CSSProperties["gridColumn"];
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
  gridTemplateRows?: CSSProperties["gridTemplateRows"];
  flexDirection?: CSSProperties["flexDirection"];
  flex?: CSSProperties["flex"];
  alignItems?: CSSProperties["alignItems"];
  alignSelf?: CSSProperties["alignSelf"];
  justifyContent?: CSSProperties["justifyContent"];
  justifyItems?: CSSProperties["justifyItems"];
  justifySelf?: CSSProperties["justifySelf"];
  backgroundColor?: CSSProperties["backgroundColor"];
  color?: CSSProperties["color"];
  fontSize?: CSSProperties["fontSize"];
  padding?: CSSProperties["padding"];
  paddingLeft?: CSSProperties["paddingLeft"];
  paddingRight?: CSSProperties["paddingRight"];
  paddingTop?: CSSProperties["paddingTop"];
  paddingBottom?: CSSProperties["paddingBottom"];
  borderRadius?: CSSProperties["borderRadius"];
  textAlign?: CSSProperties["textAlign"];
  cursor?: CSSProperties["cursor"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  border?: CSSProperties["border"];
  borderRight?: CSSProperties["borderRight"];
  borderLeft?: CSSProperties["borderLeft"];
  borderTop?: CSSProperties["borderTop"];
  borderBottom?: CSSProperties["borderBottom"];
  borderColor?: CSSProperties["borderColor"];
  overflow?: CSSProperties["overflow"];
  maxHeight?: CSSProperties["maxHeight"];
  minHeight?: CSSProperties["minHeight"];
  minWidth?: CSSProperties["minWidth"];
  maxWidth?: CSSProperties["maxWidth"];
  whiteSpace?: CSSProperties["whiteSpace"];
  textOverflow?: CSSProperties["textOverflow"];
  boxShadow?: CSSProperties["boxShadow"];
  position?: CSSProperties["position"];
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  left?: CSSProperties["left"];
  bottom?: CSSProperties["bottom"];
  wordWrap?: CSSProperties["wordWrap"];
}
function Container(props: Props) {
  const style: CSSProperties = props.customStyles || {
    display: props.display,
    gap: props.gap,
    gridRow: props.gridRow,
    gridColumn: props.gridColumn,
    gridTemplateRows: props.gridTemplateRows,
    gridTemplateColumns: props.gridTemplateColumns,
    flexDirection: props.flexDirection,
    flex: props.flex,
    alignItems: props.alignItems,
    alignSelf: props.alignSelf,
    justifyContent: props.justifyContent,
    justifyItems: props.justifyItems,
    justifySelf: props.justifySelf,
    backgroundColor: props.backgroundColor,
    color: props.color,
    fontSize: props.fontSize,
    padding: props.padding,
    borderRadius: props.borderRadius,
    textAlign: props.textAlign,
    cursor: props.cursor,
    width: props.width,
    height: props.height,
    maxHeight: props.maxHeight,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    border: props.border,
    borderColor: props.borderColor,
    overflow: props.overflow,
    whiteSpace: props.whiteSpace,
    textOverflow: props.textOverflow,
    boxShadow: props.boxShadow,
    position: props.position,
    top: props.top,
    right: props.right,
    left: props.left,
    bottom: props.bottom,
    wordWrap: props.wordWrap,
  };
  if (!props.padding) {
    style.paddingLeft = props.paddingLeft;
    style.paddingRight = props.paddingRight;
    style.paddingTop = props.paddingTop;
    style.paddingBottom = props.paddingBottom;
  }
  if (!props.border) {
    style.borderLeft = props.borderLeft;
    style.borderRight = props.borderRight;
    style.borderTop = props.borderTop;
    style.borderBottom = props.borderBottom;
  }
  if (!props.gap) {
    style.rowGap = props.rowGap;
    style.columnGap = props.columnGap;
  }
  return (
    <div
      style={style}
      onClick={props.onClick}
      className={props.className || ""}
    >
      {props.children}
    </div>
  );
}
export default Container;
