import React, { ReactNode, useState } from "react";
import useLayoutDimensions from "./useLayoutDimensions";

interface LayoutContextProps {
  children?: ReactNode;
}
interface LayoutContextTypes {
  isVisibleChat: boolean;
  toggleChatLayout: () => void;
}
const LayoutContext = React.createContext<LayoutContextTypes | null>(null);

export function LayoutProvider(props: LayoutContextProps) {
  const [isVisibleChat, setIsVisibleChat] = useState(true);
  const { closeConversationsList, openConversationsList } =
    useLayoutDimensions();
  function toggleChatLayout() {
    if (isVisibleChat) {
      closeConversationsList();
    } else {
      openConversationsList();
    }
    setIsVisibleChat(!isVisibleChat);
  }
  return (
    <LayoutContext.Provider
      value={{
        isVisibleChat,
        toggleChatLayout,
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
}

export function useAppLayout() {
  const context = React.useContext(LayoutContext);
  if (!context) {
    throw new Error("Layout Context used oustide provider");
  }
  return context;
}
