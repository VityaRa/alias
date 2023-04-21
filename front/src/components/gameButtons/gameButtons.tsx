import React from 'react'
import { Container } from '../common/common'
import { Button } from '../button/button'
import styled from 'styled-components'
import { COLORS } from '../../helpers/colors'

const ButtonsContainer = styled(Container)`
  gap: 2rem;  
`

const GameButton = styled(Button)`
  background-color: ${COLORS.MAIN_DIMMED};
  color: ${COLORS.MAIN_WHITE};
`

export const GameButtons = () => {
  return (
    <ButtonsContainer>
      <GameButton text={'+'}>+</GameButton>
      <GameButton text={'-'}>-</GameButton>
    </ButtonsContainer>
  )
}
