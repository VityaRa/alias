import styled from 'styled-components'
import { Button } from '../button/button'
import { PlayIcon } from '../../icons/play'
import { COLORS } from '../../helpers/colors'
import { FC } from 'react'

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
    fill: ${COLORS.MAIN};
  }

  &:hover {
    background-color: ${COLORS.MAIN};
    svg {
      fill: ${COLORS.MAIN_WHITE};
    }
  }
`

interface IProps {
  isOwner: boolean;
  onClick: () => void;
}

export const StartGame: FC<IProps> = ({isOwner, onClick}) => {
  if (!isOwner) {
    return null;
  }
  return (
    <StyledButton icon={<PlayIcon />} onClick={() => onClick()} disabled={!isOwner}>startGame</StyledButton>
  )
}
