import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
