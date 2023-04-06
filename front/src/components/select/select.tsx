import { FC, SelectHTMLAttributes } from "react";
import styled from "styled-components"

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  values?: any[],
  activeValue?: any,
}


const StyledSelect = styled.select`
  width: 15rem;
  height: 2rem;
  border-radius: 0.25rem;
`

export const Select: FC<IProps> = ({values, activeValue, ...rest}) => {
  return (
    <StyledSelect {...rest} />
  )
}
