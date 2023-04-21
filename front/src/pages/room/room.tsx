import { useContext, useEffect } from "react";
import themeController from "../../api/theme/controller";
import { ITheme } from "../../api/theme/model";
import { VerticalContainer } from "../../components/common/common";
import { GameButtons } from "../../components/gameButtons/gameButtons";
import { InviteLink } from "../../components/inviteLink/inviteLink";
import { Login } from "../../components/login/login";
import { StartGame } from "../../components/startGame/startGame";
import { Teams } from "../../components/teams/teams";
import { ThemeSelector } from "../../components/themeSelector/themeSelector";
import { Timer } from "../../components/timer/timer";
import { Words } from "../../components/words/words";
import { RoomContext } from "../../contexts/RoomContext";
import { UserContext } from "../../contexts/UserContext";

export const RoomPage = () => {
  const {
    updateRoomState,
    id: roomId,
    owner,
    startGame,
    started
  } = useContext(RoomContext);
  const { id: userId } = useContext(UserContext);
  // add logic to check room
  const getThemes = async () => {
    const labels = await themeController.getLabels();
    updateRoomState({ themes: labels as ITheme[] });
  };

  useEffect(() => {
    getThemes();
  }, []);

  if (!roomId || !userId) {
    return <Login withJoin />;
  }

  return (
    <VerticalContainer>
      <InviteLink />
      <ThemeSelector />
      <Teams />
      {started && (
        <>
          <Words />
          <GameButtons />
          <Timer />
        </>
      )}
      {!started && (
        <StartGame isOwner={owner?.id === userId} onClick={() => startGame()} />
      )}
    </VerticalContainer>
  );
};
