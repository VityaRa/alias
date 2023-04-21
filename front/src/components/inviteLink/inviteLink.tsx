import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import { Container } from "../common/common";
import { CopyButton } from "../copyButton/copyButton";
import { Input } from "../input/input";

export const InviteLink = () => {
  const { linkSlug } = useContext(RoomContext);
  
  return (
    <Container>
      <CopyButton />
      <Input readOnly value={linkSlug}/>
    </Container>
  )
}
