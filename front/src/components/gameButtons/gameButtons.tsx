import React, { useContext } from 'react'
import { Container } from '../common/common'
import { Button } from '../button/button'
import styled from 'styled-components'
import { COLORS } from '../../helpers/colors'
import { RoomContext } from '../../contexts/RoomContext'
import { WordStatus } from '../../api/word/model'

const ButtonsContainer = styled(Container)`
  gap: 2rem;  
`

const GameButton = styled(Button)`
  background-color: ${COLORS.MAIN_DIMMED};
  color: ${COLORS.MAIN_WHITE};
`

export const GameButtons = () => {
  const { nextWord } = useContext(RoomContext);
  return (
    <ButtonsContainer>
      <GameButton onClick={() => nextWord(WordStatus.CORRECT)} text={'+'}>+</GameButton>
      <GameButton onClick={() => nextWord(WordStatus.WRONG)} text={'-'}>-</GameButton>
    </ButtonsContainer>
  )
}
