import { useContext } from "react"
import { RoomContext } from "../contexts/RoomContext";

export const useGameState = () => {
  const { started } = useContext(RoomContext);
  return {
    isStarted: started,
    activePlayerId: '',
  }
}