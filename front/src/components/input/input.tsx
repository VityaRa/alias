import { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { COLORS } from "../../helpers/colors";

interface IStyledProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const StyledInput = styled.input<IStyledProps>`
  height: 2rem;
  background-color: ${COLORS.MAIN_WHITE};
  border-radius: 4px;
  padding-left: 0.25rem;
  font-size: 1rem;
  color: ${COLORS.MAIN};
  border: 2px solid ${props => !props.error ? COLORS.MAIN_WHITE : COLORS.ERROR};
`;

export const ErrorText = styled.p`
  color: ${COLORS.ERROR};
`;

interface IProps extends IStyledProps {
  onChangeValue?: (value: string) => void;
}

export const Input: FC<IProps> = ({
  onChangeValue,
  error = false,
  type = "text",
  ...rest
}) => {
  return (
    <StyledInput
      error={error}
      onChange={(e) => onChangeValue && onChangeValue(e.target.value)}
      type={type}
      {...rest}
    />
  );
};
