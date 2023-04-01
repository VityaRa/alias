import { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"
import { COLORS } from "../../helpers/colors"

const StyledInput = styled.input`
  height: 2rem;
  background-color: ${COLORS.MAIN_WHITE};
  border-radius: 4px;
  padding-left: 0.25rem;
`

export const ErrorText = styled.p`
  color: ${COLORS.ERROR};
`

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
};

export const Input: FC<IProps> = ({ error='qwd', type='text', ...rest }) => {
  return (
    <div>
      <StyledInput type={type} {...rest} />
      <ErrorText>{error}</ErrorText>
    </div>
  )
}
