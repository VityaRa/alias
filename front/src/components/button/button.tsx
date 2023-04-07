import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styled from "styled-components"

const StyledButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
