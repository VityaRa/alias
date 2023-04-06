import { useContext } from "react"
import { RoomContext } from "../../contexts/RoomContext";
import { Card } from "./card/card";
import { VerticalContainer } from "../common/common";
import styled from "styled-components";

const StyledTeams = styled(VerticalContainer)`
  margin-top: 1rem;
`

export const Teams = () => {
  const { teams, viewers } = useContext(RoomContext);
  return (
    <StyledTeams>
      <div>
        {teams?.map(team => <Card title={team.title} elements={team.participants}/>)}
      </div>
      <Card title="Наблюдатели" elements={viewers}/>
    </StyledTeams>
  )
}
