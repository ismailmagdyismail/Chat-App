export interface Theme {
  type: string;
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    chat: string;
    conversationsList: string;
    controls: string;
  };
  message: string;
  icon: string;
}
