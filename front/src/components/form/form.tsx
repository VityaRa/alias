import React from 'react'
import { Input } from '../input/input'
import styled from 'styled-components'
import { COLORS } from '../../helpers/colors'
import { Heading } from '../typography'

const StyledForm = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20rem;
  height: 10rem;
  background-color: ${COLORS.MAIN};
  border-radius: 0.25rem;
  margin-bottom: 10rem;
  padding: 1rem;
` 

const FormHeading = styled(Heading)`
  margin-bottom: 1.25rem;
`

export const Form = () => {
  return (
    <StyledForm>
        <FormHeading>
          Введите никнейм
        </FormHeading>
        <Input placeholder='Ваш никнейм'/>
    </StyledForm>
  )
}
