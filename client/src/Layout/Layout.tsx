import Chat from "../Chat/Presentations/Chat";
import ControlBar from "../ControlBar/ControlBar";
import ConversationsList from "../Conversations/Presentation/ConversationsList";
import Container from "../_components/container/Container";
import { useAppLayout } from "./LayoutContext";

export default function Layout() {
  const { isVisibleChat } = useAppLayout();
  const cols = isVisibleChat ? "70px 300px 1fr" : "70px 1fr";
  return (
    <Container display="grid" gridTemplateColumns={cols}>
      <ControlBar />
      {isVisibleChat && <ConversationsList />}
      <Chat />
    </Container>
  );
}
