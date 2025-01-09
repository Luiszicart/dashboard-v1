import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "./store/store";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import Dashboard from "./components/templates/Dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Dashboard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
