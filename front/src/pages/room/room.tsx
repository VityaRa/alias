import { useParams } from 'react-router-dom'
import { InviteLink } from '../../components/inviteLink/inviteLink';
import { VerticalContainer } from '../../components/common/common';
import { ThemeSelector } from '../../components/themeSelector/themeSelector';
import { Teams } from '../../components/teams/teams';
import { StartGame } from '../../components/startGame/startGame';
import { useContext, useEffect } from 'react';
import themeController from '../../api/theme/controller';
import { RoomContext } from '../../contexts/RoomContext';
import { ITheme } from '../../api/theme/model';

export const RoomPage = () => {
  const params = useParams();
  const { updateRoomState } = useContext(RoomContext);
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
      <InviteLink />
      <ThemeSelector />
      <Teams />
      <StartGame />
    </VerticalContainer>
  )
}
