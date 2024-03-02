import React from "react";

interface Props {
    children?: React.ReactNode;
    onSubmit: () => void;
}
function Form(props: Props) {
    return <form onSubmit={props.onSubmit}>{props.children}</form>;
}
export default Form;
