import { FC, SelectHTMLAttributes } from "react";
import styled from "styled-components"

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  values?: any[],
  activeValueId?: string,
}

const StyledSelect = styled.select`
  width: 15rem;
  height: 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
`

const StyledOptions = styled.option`
  cursor: pointer;
`

export const Select: FC<IProps> = ({values, activeValueId, ...rest}) => {
  return (
    <StyledSelect {...rest}>
      {values?.map((value) => <StyledOptions key={value.id} selected={activeValueId === value.id} value={value.id}>{value.name}</StyledOptions>)}
    </StyledSelect>
  )
}
