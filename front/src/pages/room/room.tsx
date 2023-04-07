import { useParams } from 'react-router-dom'
import { InviteLink } from '../../components/inviteLink/inviteLink';
import { VerticalContainer } from '../../components/common/common';
import { ThemeSelector } from '../../components/themeSelector/themeSelector';
import { Teams } from '../../components/teams/teams';
import { StartGame } from '../../components/startGame/startGame';

export const RoomPage = () => {
  const params = useParams();
  // add logic to check room
  
  return (
    <VerticalContainer>
      <InviteLink />
      <ThemeSelector />
      <Teams />
      <StartGame />
    </VerticalContainer>
  )
}
