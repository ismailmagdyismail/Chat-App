import { CSSProperties, HTMLInputTypeAttribute, useState } from "react";
interface Props {
  type: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
  placeHolder?: string;
  label?: string;
  value: string | number;
  padding?: CSSProperties["padding"];
  backgroundColor?: CSSProperties["backgroundColor"];
  borderRadius?: CSSProperties["borderRadius"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

function Input(props: Props) {
  const [value, setValue] = useState(props.value);
  const style: CSSProperties = {
    padding: props.padding,
    borderRadius: props.borderRadius,
    backgroundColor: props.backgroundColor,
    border: "none",
    width: props.width || "100%",
    height: props.height || "100%",
  };
  return (
    <input
      type={props.type}
      value={value}
      onChange={(event) => {
        props.onChange(event.target.value);
        setValue(event.target.value);
      }}
      placeholder={props.placeHolder}
      style={style}
    />
  );
}
export default Input;
