import { CSSProperties } from "react";

interface Props {
    text: string | number;
    fontSize?: CSSProperties["fontSize"];
    color?: CSSProperties["color"];
    width?:CSSProperties["width"];
    maxWidth?:CSSProperties["maxWidth"];
    overflow?:CSSProperties["overflow"];
    textOverflow?:CSSProperties["textOverflow"];
    whiteSpace?:CSSProperties["whiteSpace"];
}
function ParagraphElement(props: Props) {
    const style: CSSProperties = {
        fontSize: props.fontSize,
        color: props.color,
        width:props.width,
        maxWidth:props.maxWidth,
        overflow:props.overflow,
        textOverflow:props.textOverflow,
        whiteSpace:props.whiteSpace,
    };
    return <p style={style}>{props.text}</p>;
}
export default ParagraphElement;
