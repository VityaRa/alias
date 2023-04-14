import { useContext } from "react"
import { VerticalContainer } from "../../components/common/common"
import { SocketContext } from "../../contexts/SocketContext"
import { Heading } from "../../components/typography";

export const ErrorPage = () => {
  const { error } = useContext(SocketContext);
  return (
    <VerticalContainer>
      <Heading>
        {error}
      </Heading>
    </VerticalContainer>
  )
}
