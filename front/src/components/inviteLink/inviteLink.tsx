import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import { Container } from "../common/common";
import { CopyButton } from "../copyButton/copyButton";
import { Input } from "../input/input";
import { useGameState } from "../../helpers/useGameState";

export const InviteLink = () => {
  const { linkSlug } = useContext(RoomContext);
  const { isStarted } = useGameState();
  if (isStarted) {
    return null;
  }

  return (
    <Container>
      <CopyButton />
      <Input readOnly value={linkSlug}/>
    </Container>
  )
}
