import React, { useContext } from 'react'
import { RoomContext } from '../../contexts/RoomContext'
import { VerticalContainer } from '../common/common';
import styled from 'styled-components';

const WordsContainer = styled(VerticalContainer)`
  height: 15rem;
`

const Word = styled.div`

`

export const Words = () => {
  const { words } = useContext(RoomContext);
  return (
    <WordsContainer>
      {words.map((w) => <Word>{w.value}</Word>)}
    </WordsContainer>
  )
}
