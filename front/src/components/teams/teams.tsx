import { useContext } from "react"
import { RoomContext } from "../../contexts/RoomContext";
import { Card } from "./card/card";
import { VerticalContainer } from "../common/common";
import styled from "styled-components";

const CardContainer = styled(Card)`
  background-color: red !important;
`

const StyledTeams = styled(VerticalContainer)`
  margin-top: 2rem;
`

export const Teams = () => {
  const { teams, viewers } = useContext(RoomContext);
  return (
    <StyledTeams>
      <div>
        {teams?.map(team => <CardContainer key={team.title} title={team.title} elements={team.participants}/>)}
      </div>
      <CardContainer darkenTitle={false} title="Наблюдатели" elements={viewers}/>
    </StyledTeams>
  )
}
