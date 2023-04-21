import styled from "styled-components";
import { COLORS } from "../../helpers/colors";

export const Heading = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
`

export const ErrorText = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${COLORS.ERROR};
  text-align: left;
  margin-bottom: 0.5rem;
`

export const DefaultText = styled.p`
  font-size: 1rem;
  font-weight: 400;
`