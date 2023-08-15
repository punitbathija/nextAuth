"use client";

import React from "react";
import {
  StyledButton,
  FancyButton,
  SubmitButton,
  DarkButton,
} from "./StyledComponents/Button";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
button{
  font-family: 'Roboto'
}
`;

const theme = {
  dark: { primary: "#000", text: "#fff" },
  light: { primary: "#fff", text: "#000" },
};

const page = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="flex justify-center gap-12 my-12">
        <br />
        <FancyButton>Hello World!</FancyButton>
        <StyledButton variant="outline">Hello World!</StyledButton>
        <StyledButton>Hello World!</StyledButton>
        <SubmitButton>Hello World!</SubmitButton>
        <DarkButton>Hello World!</DarkButton>
      </div>
    </ThemeProvider>
  );
};

export default page;
