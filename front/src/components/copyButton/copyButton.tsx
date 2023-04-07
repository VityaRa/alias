import { Button } from "../button/button"
import { CopyIcon } from "../../icons/copy"
import styled from "styled-components"
import { RoomContext } from "../../contexts/RoomContext"
import { useContext } from "react"

const StyledCopyButton = styled(Button)`
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 1rem;
  cursor: pointer;

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`

export const CopyButton = () => {
  const { link } = useContext(RoomContext);
  const onCopy = () => {
    navigator.clipboard.writeText(link!);
  }

  return (
    <StyledCopyButton onClick={onCopy} icon={<CopyIcon />}/>
  )
}
