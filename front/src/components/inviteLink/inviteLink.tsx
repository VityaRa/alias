import { Input } from "../input/input"
import { useContext } from "react"
import { RoomContext } from "../../contexts/RoomContext";
import { Container } from "../common/common";
import { CopyButton } from "../copyButton/copyButton";

export const InviteLink = () => {
  const { link } = useContext(RoomContext);
  return (
    <Container>
      <CopyButton />
      <Input readOnly value={link}/>
    </Container>
  )
}
