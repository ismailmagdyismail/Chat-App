import React, { CSSProperties } from "react";
import ParagraphElement from "../paragraphElement/ParagraphElement";

interface Props {
    action: () => void;
    text?: string;
    children?: React.ReactNode;
    borderRadius?: CSSProperties["borderRadius"];
    padding?: CSSProperties["padding"];
    backgroundColor?: CSSProperties["backgroundColor"];
    fontColor?: CSSProperties["color"];
    fontSize?: CSSProperties["fontSize"];
    boxShadow?:CSSProperties["boxShadow"];
}
function Button(props: Props) {
    const style: CSSProperties = {
        borderRadius: props.borderRadius,
        padding: props.padding,
        background: props.backgroundColor,
        boxShadow:props.boxShadow,
    };
    return (
        <button onClick={props.action} style={style}>
            {props.text && (
                <ParagraphElement
                    text={props.text}
                    color={props.fontColor}
                    fontSize={props.fontSize}
                />
            )}
            {!props.text && props.children}
        </button>
    );
}
export default Button;
