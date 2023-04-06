import { useParams } from 'react-router-dom'
import { Container } from '../../components/common/common';
import { InviteLink } from '../../components/inviteLink/inviteLink';

export const RoomPage = () => {
  const params = useParams();
  // add logic to check room
  
  return (
    <Container>
      <InviteLink />
    </Container>
  )
}
