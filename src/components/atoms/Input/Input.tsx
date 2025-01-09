import { StyledInput } from "./Input.styled";
import { InputProps } from "./Input.types";

const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};

export default Input;
