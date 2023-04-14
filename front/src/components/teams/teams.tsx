import { useContext } from "react"
import { RoomContext } from "../../contexts/RoomContext";
import { Card } from "./card/card";
import { VerticalContainer } from "../common/common";
import styled from "styled-components";
import { TeamType } from "../../api/team/model";

const StyledTeamsWrapper = styled(VerticalContainer)`
  margin-top: 2rem;
`

const StyledTeamsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`

export const Teams = () => {
  const { teams, changeTeam } = useContext(RoomContext);
  const playersTeams = teams.filter((t) => t.type === TeamType.PLAYABLE);
  const viewerTeam = teams.find((t) => t.type === TeamType.VIEWERS);

  return (
    <StyledTeamsWrapper>
      <StyledTeamsContainer>
        {playersTeams?.map(team => <Card onClick={() => changeTeam(team.id)} key={team.title} title={team.title} elements={team.participants}/>)}
      </StyledTeamsContainer>
      <Card onClick={() => changeTeam('id')} darkenTitle={false} title="Наблюдатели" elements={viewerTeam?.participants}/>
    </StyledTeamsWrapper>
  )
}
