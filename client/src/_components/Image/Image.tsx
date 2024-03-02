import { CSSProperties } from "react";

interface Props {
    src: string;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    borderRadius?: CSSProperties["borderRadius"];
}
function Image(props: Props) {
    const style: CSSProperties = {
        width: props.width || "100%",
        height: props.height || "auto",
        borderRadius: props.borderRadius,
    };
    return <img style={style} src={props.src} />;
}
export default Image;
