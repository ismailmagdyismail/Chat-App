import Layout from "./Layout/Layout";
import { LayoutProvider } from "./Layout/LayoutContext";
import { ThemeProvider } from "./Themes/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <Layout />
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
