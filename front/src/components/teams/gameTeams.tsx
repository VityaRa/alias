import { FC, useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import { Card } from "./card/card";
import { VerticalContainer } from "../common/common";
import styled from "styled-components";
import { TeamType } from "../../api/team/model";

const StyledTeamsWrapper = styled(VerticalContainer)`
  margin-top: 2rem;
  justify-content: flex-start !important;
`;

const StyledTeamsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

interface IProps {
  noViewers?: boolean;
}

export const GameTeams: FC<IProps> = ({  }) => {
  const { teamsGroup, changeTeam } = useContext(RoomContext);
  const playersTeams = teamsGroup.filter((t) => t.type === TeamType.PLAYABLE);

  return <></>
};
