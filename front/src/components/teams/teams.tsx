import { FC, useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import { Card } from "./card/card";
import { VerticalContainer } from "../common/common";
import styled from "styled-components";
import { TeamType } from "../../api/team/model";
import { UserContext } from "../../contexts/UserContext";
import { useGameState } from "../../helpers/useGameState";

const StyledTeamsWrapper = styled(VerticalContainer)`
  margin-top: 2rem;
`;

const StyledTeamsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

interface IProps {
  noViewers?: boolean;
}

export const Teams: FC<IProps> = ({ }) => {
  const { teamsGroup, changeTeam, changeActiveUser } = useContext(RoomContext);
  
  const {id: userId} = useContext(UserContext);
  const playersTeams = teamsGroup.filter((t) => t.type === TeamType.PLAYABLE);
  const viewerTeam = teamsGroup.find((t) => t.type === TeamType.VIEWERS);
  const {isStarted} = useGameState();

  return (
    <StyledTeamsWrapper>
      <StyledTeamsContainer>
        {playersTeams?.map((team) => (
          <Card
            onClick={() => changeTeam(team.id)}
            key={team.title}
            title={team.title}
            elements={team.participants}
            userId={userId!}
            gameStarted={isStarted}
            onUserClick={changeActiveUser}
          />
        ))}
      </StyledTeamsContainer>
      {!isStarted && (
        <Card
          onClick={() => changeTeam(viewerTeam?.id!)}
          darkenTitle={false}
          title="Наблюдатели"
          elements={viewerTeam?.participants}
          userId={userId!}
          gameStarted={isStarted}
        />
      )}
    </StyledTeamsWrapper>
  );
};
