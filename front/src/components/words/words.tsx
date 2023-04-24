import { useContext } from 'react';
import styled from 'styled-components';
import { UserStatus } from '../../api/user/model';
import { RoomContext } from '../../contexts/RoomContext';
import { UserContext } from '../../contexts/UserContext';
import { COLORS } from '../../helpers/colors';
import { VerticalContainer } from '../common/common';

const WordsContainer = styled(VerticalContainer)`
  max-height: 20rem;
  height: auto;
  overflow-y: auto;
  justify-content: flex-end;
  margin-top: 5rem;
`

const Word = styled(VerticalContainer)`
  background-color: ${COLORS.MAIN_DIMMED};
  border-radius: 0.25rem;
  max-width: 15rem;
  width: 15rem; 
  text-align: center;
  margin-top: 0.25rem;
  height: auto;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  user-select: none;
  text-transform: capitalize;
`

const MAX_COUNT = 15;

const getOpacity = (index: number) => {
  if (index > MAX_COUNT) {
    return 0;
  }
  return (index / MAX_COUNT);
}

export const Words = () => {
  const { words } = useContext(RoomContext);
  const { status } = useContext(UserContext);
  
  const showLastWord = status === UserStatus.ACTIVE
  const showWordsCount = showLastWord ? words.length : words.length - 1;
  
  return (
    <WordsContainer>
      {words.slice(0, showWordsCount).map((w, i, a) => <Word style={{opacity: getOpacity(i - a.length + MAX_COUNT + 1)}} key={w.id}>{w.value}</Word>)}
    </WordsContainer>
  )
}
