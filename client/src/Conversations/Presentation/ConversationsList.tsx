import { useTheme } from "../../Themes/ThemeContext";
import Container from "../../_components/container/Container";

export default function ConversationsList() {
  const { theme } = useTheme();
  return (
    <Container
      display="flex"
      flexDirection="column"
      backgroundColor={theme.background.conversationsList}
      borderRight={"1px solid #bbb"}
    ></Container>
  );
}
