import React, { useContext, useMemo } from 'react'
import { RoomContext } from '../../contexts/RoomContext'
import { VerticalContainer } from '../common/common';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import { UserStatus } from '../../api/user/model';

const WordsContainer = styled(VerticalContainer)`
  height: 15rem;
`

const Word = styled.div`

`

export const Words = () => {
  const { words } = useContext(RoomContext);
  const { status } = useContext(UserContext);
  
  const showLastWord = useMemo(() => status === UserStatus.ACTIVE, [status]);
  const showWordsCount = showLastWord ? words.length : words.length - 1;
  return (
    <WordsContainer>
      {words.slice(0, showWordsCount).map((w) => <Word>{w.value}</Word>)}
    </WordsContainer>
  )
}
