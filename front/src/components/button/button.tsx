import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styled from "styled-components"

const StyledButton = styled.button`
  width: auto;
  height: auto;
  border-radius: 0.25rem;
  outline: none;
  border: none;
  cursor: pointer;
`

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: ReactNode;
  text?: string;
};

export const Button: FC<IProps> = ({loading, icon, text, ...rest}) => {
  return (
    <StyledButton {...rest}>
      {text && <p>{text}</p>}
      {icon ?? <></>}
    </StyledButton >
  )
}
