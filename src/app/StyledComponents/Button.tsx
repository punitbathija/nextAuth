import styled from "styled-components";

// Generating and exporting variants of a button

export const StyledButton = styled.button`
  border: 2px solid;
  background-color: ${(props: any) =>
    props.variant === "outline" ? "#FFF" : "#4caf50"};
  color: ${(props: any) => (props.variant === "outline" ? "#4caf50" : "#FFF")};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  &:hover {
    background-color: ${(props: any) =>
      props.variant !== "outline" ? "#FFF" : "#4caf50"};
    color: ${(props: any) =>
      props.variant !== "outline" ? "#4caf50" : "#FFF"};
  }
`;

// Generating a button by extending the styles of an exsisting styled button

export const FancyButton = styled(StyledButton)`
  background-image: linear-gradient(to right, #f6d356 0%, #fda085 100%);
  border: none;
`;

export const SubmitButton = styled(StyledButton).attrs({
  type: "submit",
})`
  box-shadow: 0 9px #999;
  &:active {
    background-color: ${(props: any) =>
      props.variant !== "outline" ? "#FFF" : "#4caf50"};
    color: ${(props: any) =>
      props.variant !== "outline" ? "#4caf50" : "#FFF"};
  }
`;

export const DarkButton = styled(StyledButton)`
  border: 2px solid ${(props) => props.theme.light.primary};
  background-color: ${(props) => props.theme.light.primary};
  color: ${(props) => props.theme.light.text};
`;
