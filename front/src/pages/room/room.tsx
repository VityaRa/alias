import { useContext, useEffect } from "react";
import styled from "styled-components";
import themeController from "../../api/theme/controller";
import { ITheme } from "../../api/theme/model";
import { UserStatus } from "../../api/user/model";
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
import { SocketContext } from "../../contexts/SocketContext";
import { ErrorText } from "../../components";

const Container = styled(VerticalContainer)`
  height: 100%;
  padding: 2rem 0;
`

const GameContainer = styled(VerticalContainer)`
  justify-content: flex-end;
  height: 100%;
`

const ErrorContainer = styled(ErrorText)`
  position: absolute;
  left: 2rem;
  top: 2rem;
`

export const RoomPage = () => {
  const {
    updateRoomState,
    id: roomId,
    owner,
    startGame,
    started,
  } = useContext(RoomContext);
  const { id: userId, status } = useContext(UserContext);
  const { error } = useContext(SocketContext);
  const isTalking = status === UserStatus.ACTIVE;
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
    <Container>
      {error && <ErrorContainer>{error}</ErrorContainer>}
      <InviteLink />
      <ThemeSelector />
      <Teams />
      {started && (
        <GameContainer>
          <Words />
          {isTalking && <GameButtons />}
          <Timer/>
        </GameContainer>
      )}
      {!started && (
        <StartGame isOwner={owner?.id === userId} onClick={() => startGame()} />
      )}
    </Container>
  );
};
