import { CSSProperties } from "react";
import { useTheme } from "../../Themes/ThemeContext";
import Container from "../../_components/container/Container";
import ParagraphElement from "../../_components/paragraphElement/ParagraphElement";
import MessageDto from "../Dtos/Message.dto";
import Icon from "../../_components/icon/Icon";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  message: MessageDto;
  width?: CSSProperties["width"];
}
export default function Message(props: Props) {
  const { theme } = useTheme();
  return (
    <Container display="flex" gap={"1rem"} wordWrap="break-word">
      <Icon
        icon={<FaUserCircle />}
        iconSize={"2.5rem"}
        iconColor={theme.icon}
      />
      <Container
        padding={"0.5rem"}
        borderRadius={"5px 10px"}
        backgroundColor={theme.message}
      >
        <ParagraphElement
          text={props.message.content}
          fontSize={"2rem"}
          width={props.width || "100%"}
          color={theme.text.primary}
        />
      </Container>
    </Container>
  );
}
