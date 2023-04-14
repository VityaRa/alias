import styled from 'styled-components'
import { Button } from '../button/button'
import { PlayIcon } from '../../icons/play'
import { COLORS } from '../../helpers/colors'

const StyledButton = styled(Button)`
  position: absolute;
  right: 2.5rem;
  bottom: 2.5rem;
  width: 3.5rem;
  height: 3.5rem;
  transition: .3s;

  svg {
    width: 2.5rem;
    width: 2.5rem;
  }

  &:hover {
    background-color: ${COLORS.MAIN};
  }
`

export const StartGame = () => {
  return (
    <StyledButton icon={<PlayIcon />} disabled>startGame</StyledButton>
  )
}
