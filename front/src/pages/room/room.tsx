import { useParams } from 'react-router-dom'
import { InviteLink } from '../../components/inviteLink/inviteLink';
import { VerticalContainer } from '../../components/common/common';
import { ThemeSelector } from '../../components/themeSelector/themeSelector';
import { Teams } from '../../components/teams/teams';

export const RoomPage = () => {
  const params = useParams();
  // add logic to check room
  
  return (
    <VerticalContainer>
      <InviteLink />
      <ThemeSelector />
      <Teams />
    </VerticalContainer>
  )
}
