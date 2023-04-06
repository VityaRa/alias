import { useContext } from "react"
import { RoomContext } from "../../contexts/RoomContext";
import { Card } from "./card/card";
import { VerticalContainer } from "../common/common";
import styled from "styled-components";

const StyledTeamsWrapper = styled(VerticalContainer)`
  margin-top: 2rem;
`

const StyledTeamsContainer = styled.div`
  display: flex;
`

export const Teams = () => {
  const { teams, viewers } = useContext(RoomContext);
  return (
    <StyledTeamsWrapper>
      <StyledTeamsContainer>
        {teams?.map(team => <Card key={team.title} title={team.title} elements={team.participants}/>)}
      </StyledTeamsContainer>
      <Card darkenTitle={false} title="Наблюдатели" elements={viewers}/>
    </StyledTeamsWrapper>
  )
}
