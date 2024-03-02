import { useEffect, useState } from "react";
import useWindowDimensions from "./UseWindowDimenstions";

export default function useLayoutDimensions() {
  const [headersHeight] = useState(40);
  const [controlBarWidth] = useState(70);
  const [conversationsListWidth, setConversationsListWidth] = useState(300);
  const [chatControlsHeight] = useState(65);
  const { windowHeight, windowWidth } = useWindowDimensions();

  const [chatHeight, setChatHeight] = useState(
    windowHeight - headersHeight - chatControlsHeight,
  );
  const [chatWidth, setChatWidth] = useState(
    windowWidth - controlBarWidth - conversationsListWidth,
  );

  useEffect(() => {
    setChatHeight(windowHeight - headersHeight - chatControlsHeight);
    setChatWidth(windowWidth - controlBarWidth - conversationsListWidth);
  }, [
    windowWidth,
    windowHeight,
    controlBarWidth,
    conversationsListWidth,
    chatControlsHeight,
    headersHeight,
  ]);
  function closeConversationsList() {
    setConversationsListWidth(0);
  }
  function openConversationsList() {
    setConversationsListWidth(70);
  }

  return {
    headersHeight,
    controlBarWidth,
    chatHeight,
    chatWidth,
    chatControlsHeight,
    conversationsListWidth,
    closeConversationsList,
    openConversationsList,
  };
}
