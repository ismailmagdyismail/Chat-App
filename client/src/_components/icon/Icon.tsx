import React, { CSSProperties } from "react";
import Container from "../container/Container";
import ParagraphElement from "../paragraphElement/ParagraphElement";

interface Props {
    icon: React.ReactNode;
    iconColor: CSSProperties["color"];
    iconSize: CSSProperties["fontSize"];
    labelText?: string;
    labelSize?: CSSProperties["fontSize"];
    gap?: CSSProperties["gap"];
}
function Icon(props: Props) {
    return (
        <Container
            display="flex"
            gap={props.gap}
            color={props.iconColor}
            fontSize={props.iconSize}
        >
            {props.icon}
            {props.labelText && (
                <ParagraphElement
                    text={props.labelText}
                    fontSize={props.labelSize}
                    color={props.iconColor}
                />
            )}
        </Container>
    );
}
export default Icon;
