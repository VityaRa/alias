import styled from "styled-components";
import { VerticalContainer } from "../../common/common";
import { FC } from "react";
import { COLORS } from "../../../helpers/colors";

interface IProps {
  title: string;
  elements?: Array<any>;
  darkenTitle?: boolean;
}

const StyledCard = styled(VerticalContainer)`
  width: 12rem;
  height: 15rem;
  background-color: ${COLORS.MAIN};
  border-radius: 0.25rem;
`

const StyledTitle = styled.h2<Partial<IProps>>`
  background-color: ${props => props.darkenTitle ? COLORS.BACKROUND : COLORS.MAIN_DIMMED};
  width: 100%;
  text-align: center;
  padding: 0.25rem 0;
`

const StyledList = styled.ul`
  margin-top: 0.5rem;
`

const StyledElement = styled.li`

`


export const Card: FC<IProps> = ({title, elements, darkenTitle = true}) => {
  return (
    <StyledCard>
      <StyledTitle darkenTitle={darkenTitle}>
        {title}
      </StyledTitle>
      <StyledList>
        {elements?.map(el => <StyledElement />)}
      </StyledList>
    </StyledCard>
  )
}
