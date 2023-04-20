import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import themeController from '../../api/theme/controller';
import { ITheme } from '../../api/theme/model';
import { VerticalContainer } from '../../components/common/common';
import { InviteLink } from '../../components/inviteLink/inviteLink';
import { Login } from '../../components/login/login';
import { StartGame } from '../../components/startGame/startGame';
import { Teams } from '../../components/teams/teams';
import { ThemeSelector } from '../../components/themeSelector/themeSelector';
import { RoomContext } from '../../contexts/RoomContext';
import { SocketContext } from '../../contexts/SocketContext';
import { UserContext } from '../../contexts/UserContext';

export const RoomPage = () => {
  const params = useParams();
  const { updateRoomState, id: roomId } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const {id: userId, name, updateUserState} = useContext(UserContext);
  // add logic to check room
  const getThemes = async () => {
    const labels = await themeController.getLabels();
    updateRoomState({themes: labels as ITheme[]});
  }

  useEffect(() => {
    getThemes();
  }, [])

  if (!roomId || !userId) {
    return <Login withJoin />
  }

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
