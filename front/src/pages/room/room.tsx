import { useNavigate, useParams } from 'react-router-dom'
import { InviteLink } from '../../components/inviteLink/inviteLink';
import { VerticalContainer } from '../../components/common/common';
import { ThemeSelector } from '../../components/themeSelector/themeSelector';
import { Teams } from '../../components/teams/teams';
import { StartGame } from '../../components/startGame/startGame';
import { useContext, useEffect } from 'react';
import themeController from '../../api/theme/controller';
import { RoomContext } from '../../contexts/RoomContext';
import { ITheme } from '../../api/theme/model';
import { UserContext } from '../../contexts/UserContext';
import { SocketContext } from '../../contexts/SocketContext';
import { IncomingMessages } from '../../helpers/events';
import { GetUserResult } from '../../api/common/types';

export const RoomPage = () => {
  const params = useParams();
  const { updateRoomState } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const {name, updateUserState} = useContext(UserContext);
  // add logic to check room
  const getThemes = async () => {
    const labels = await themeController.getLabels();
    updateRoomState({themes: labels as ITheme[]});
  }

  useEffect(() => {
    getThemes();
  }, [])

  return (
    <VerticalContainer>
      <div style={{color: '#ffffff'}}>
        USERNAME: {name}
      </div>
      <InviteLink />
      <ThemeSelector />
      <Teams />
      <StartGame />
    </VerticalContainer>
  )
}
