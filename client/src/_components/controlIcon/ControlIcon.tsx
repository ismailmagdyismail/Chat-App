import React, { CSSProperties } from "react";
import Container from "../container/Container";
import ParagraphElement from "../paragraphElement/ParagraphElement";
interface Props {
  action: () => void;
  icon: React.ReactNode;
  iconSize: CSSProperties["fontSize"];
  iconColor: CSSProperties["color"];
  label?: string;
  labelSize?: CSSProperties["fontSize"];
  labelColor?: CSSProperties["color"];
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  gap?: CSSProperties["gap"];
  padding?: CSSProperties["padding"];
}
function ControlIcon(props: Props) {
  return (
    <Container
      display={props.display || "flex"}
      flexDirection={props.flexDirection}
      alignItems="center"
      color={props.iconColor}
      fontSize={props.iconSize}
      onClick={props.action}
      cursor="pointer"
      padding={props.padding}
      gap={props.gap}
    >
      {props.icon}
      {props.label && (
        <ParagraphElement
          text={props.label || ""}
          fontSize={props.labelSize}
          color={props.iconColor}
        />
      )}
    </Container>
  );
}
export default ControlIcon;
