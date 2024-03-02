import { RiMoonClearFill } from "react-icons/ri";
import { useTheme } from "../Themes/ThemeContext";
import Container from "../_components/container/Container";
import ControlIcon from "../_components/controlIcon/ControlIcon";
import { FaSun } from "react-icons/fa6";
import { PiChatsCircleFill } from "react-icons/pi";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { useAppLayout } from "../Layout/LayoutContext";

export default function ControlBar() {
  const { theme, toggleTheme } = useTheme();
  const { toggleChatLayout, isVisibleChat } = useAppLayout();
  return (
    <Container
      display="flex"
      flexDirection="column"
      padding="2rem"
      gap="2rem"
      backgroundColor={theme.background.controls}
      borderRight={"1px solid #bbb"}
    >
      <Container borderBottom={"2px solid #bbb"} paddingBottom={"1rem"}>
        <ControlIcon
          action={() => {}}
          icon={<PiChatsCircleFill />}
          iconSize={"2rem"}
          iconColor={theme.icon}
        />
      </Container>

      <Container borderBottom={"2px solid #bbb"} paddingBottom={"1rem"}>
        {theme.type === "darkTheme" && (
          <ControlIcon
            action={toggleTheme}
            icon={<RiMoonClearFill />}
            iconSize={"2rem"}
            iconColor={theme.icon}
          />
        )}
        {theme.type === "lightTheme" && (
          <ControlIcon
            action={toggleTheme}
            icon={<FaSun />}
            iconSize={"2rem"}
            iconColor={theme.icon}
          />
        )}
      </Container>

      <Container borderBottom={"2px solid #bbb"} paddingBottom={"1rem"}>
        {isVisibleChat && (
          <ControlIcon
            action={toggleChatLayout}
            icon={<BsLayoutSidebarInset />}
            iconSize={"2rem"}
            iconColor={theme.icon}
          />
        )}
        {!isVisibleChat && (
          <ControlIcon
            action={toggleChatLayout}
            icon={<BsLayoutSidebarInsetReverse />}
            iconSize={"2rem"}
            iconColor={theme.icon}
          />
        )}
      </Container>
    </Container>
  );
}
