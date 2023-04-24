import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EndGameResult,
  GetOrCreateRoom,
  GetUserResult,
  NextWordResult,
  StartGameResult
} from "../api/common/types";
import { RoomContext } from "../contexts/RoomContext";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { IncomingMessages } from "../helpers/events";
import { LS_KEYS, LocalStorageHelper } from "../helpers/localStorage";

interface IProps {
  Component: () => JSX.Element;
}

// Wrapper for pages to handle socket disconnect
export const Page = ({ Component }: IProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const { socket, error, updateState, getOrCreateRoom } =
    useContext(SocketContext);
  const { updateUserState } = useContext(UserContext);
  const { updateRoomState, setNextWord } = useContext(RoomContext);

  useEffect(() => {
    if (error) {
      updateState({ error: null });
      navigate(`/error?text=${error}`);
    }
  }, [error]);

  const handleGet = (data: GetUserResult) => {
    if (data?.error || !data.user) {
      LocalStorageHelper.clear();
      if (data?.error === 'NU') {
        navigate('/')
      }
      return;
    }
    LocalStorageHelper.set(LS_KEYS.USER_ID, data.user.id);
    updateUserState(data.user);
    getOrCreateRoom(params["roomId"] || null);
  };

  const handleGetOrCreateRoom = (data: GetOrCreateRoom) => {
    updateRoomState(data.room);
    navigate(`/${data.room.linkSlug}`);
  };

  const handleStartGame = (data: StartGameResult) => {
    updateRoomState(data)
  };

  const handleEndGame = (data: EndGameResult) => {
    updateRoomState(data)
  }

  const handleNextWord = (data: NextWordResult) => {
    setNextWord(data.nextWord)
  }

  useEffect(() => {
    socket.on(IncomingMessages.GET, handleGet);
    socket.on(IncomingMessages.LOGIN, handleGet);
    socket.on(IncomingMessages.GET_OR_CREATE_ROOM, handleGetOrCreateRoom);
    socket.on(IncomingMessages.START_GAME, handleStartGame);
    socket.on(IncomingMessages.END_GAME, handleEndGame);
    socket.on(IncomingMessages.NEXT_WORD, handleNextWord);
    return () => {
      socket.off(IncomingMessages.GET, handleGet);
      socket.off(IncomingMessages.LOGIN, handleGet);
      socket.off(IncomingMessages.GET_OR_CREATE_ROOM, handleGetOrCreateRoom);
      socket.off(IncomingMessages.START_GAME, handleStartGame);
      socket.off(IncomingMessages.END_GAME, handleEndGame);
      socket.off(IncomingMessages.NEXT_WORD, handleNextWord);
    };
  }, []);

  return <Component />;
};
