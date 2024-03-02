import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../Themes/ThemeContext";
import Container from "../../_components/container/Container";
import Icon from "../../_components/icon/Icon";
import ParagraphElement from "../../_components/paragraphElement/ParagraphElement";
import useChatInteractor from "../UseCases/Chat.usecase";
import Input from "../../_components/input/Input";
import { useState } from "react";
import ControlIcon from "../../_components/controlIcon/ControlIcon";
import { IoSend } from "react-icons/io5";
import Message from "./Message";
import useLayoutDimensions from "../../Layout/useLayoutDimensions";

export default function Chat() {
  const { theme } = useTheme();
  const { getConversationName, sendMessage, getMessages, isMessageSent } =
    useChatInteractor();
  const [message, setMessage] = useState("");
  const { chatWidth, chatHeight, headersHeight, chatControlsHeight } =
    useLayoutDimensions();
  console.log(chatWidth);
  return (
    <Container
      backgroundColor={theme.background.chat}
      overflow="hidden"
      display="grid"
      gridTemplateRows={`${headersHeight}px ${chatHeight}px ${chatControlsHeight}px`}
    >
      <Container
        backgroundColor={theme.background.conversationsList}
        display="flex"
        gap={"2rem"}
        padding={"1.5rem"}
        alignItems="center"
      >
        <Icon icon={<FaUserCircle />} iconSize={"2.5rem"} iconColor="#000" />
        <ParagraphElement
          text={getConversationName()}
          color={theme.text.secondary}
          fontSize={"2rem"}
        />
      </Container>

      <Container
        backgroundColor={theme.background.chat}
        overflow="auto"
        padding={"1rem"}
        display="flex"
        flexDirection="column"
        gap={"1rem"}
      >
        {getMessages().map((message) => (
          <Container
            display="grid"
            gridTemplateColumns={`${chatWidth / 4}px ${chatWidth / 4}px`}
          >
            <Container
              width={`${chatWidth / 2}px`}
              gridColumn={isMessageSent(message) ? "1/2" : "2/3"}
              gap={"1rem"}
            >
              <Message message={message} width={`${chatWidth / 4}px`} />
            </Container>
          </Container>
        ))}
      </Container>

      <Container
        backgroundColor={theme.background.conversationsList}
        display="flex"
        justifyContent="space-between"
        padding={"1rem"}
        gap={"2rem"}
        alignItems="center"
      >
        <Input
          padding={"2rem"}
          height={"10%"}
          backgroundColor={theme.background.controls}
          value={message}
          type="text"
          borderRadius={"9px"}
          placeHolder="Ex:message"
          onChange={(newVal: string) => setMessage(newVal)}
        />

        <ControlIcon
          icon={<IoSend />}
          iconColor={theme.icon}
          iconSize={"2rem"}
          action={() => {
            sendMessage(message);
          }}
        />
      </Container>
    </Container>
  );
}
