import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetOrCreateRoom, GetUserResult } from "../api/common/types";
import { RoomContext } from "../contexts/RoomContext";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { IncomingMessages } from "../helpers/events";
import { LS_KEYS, LocalStorageHelper } from "../helpers/localStorage";

interface IProps {
  Component: () => JSX.Element;
}

// Wrapper for pages to handle socket disconnect
export const Page = ({Component}: IProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const { socket, error, updateState, getOrCreateRoom } = useContext(SocketContext);
  const { updateUserState } = useContext(UserContext);
  const { updateRoomState } = useContext(RoomContext);

  useEffect(() => {
    if (error) {
      updateState({error: null});
      navigate(`/error?text=${error}`);
    }
  }, [error])

  useEffect(() => {
    socket.on(IncomingMessages.GET, handleGet);
    socket.on(IncomingMessages.LOGIN, handleGet);
    socket.on(IncomingMessages.GET_OR_CREATE_ROOM, handleGetOrCreateRoom);
    return () => {
      socket.off(IncomingMessages.GET, handleGet);
      socket.off(IncomingMessages.LOGIN, handleGet);
      socket.off(IncomingMessages.GET_OR_CREATE_ROOM, handleGetOrCreateRoom);
    }
  }, [])

  const handleGet = (data: GetUserResult) => {
    if (data?.error || !data.user) {
      LocalStorageHelper.clear();
      return;
    }
    LocalStorageHelper.set(LS_KEYS.USER_ID, data.user.id);
    updateUserState(data.user);
    getOrCreateRoom(params['roomId'] || null);
  }

  const handleGetOrCreateRoom = (data: GetOrCreateRoom) => {
    updateRoomState(data.room);
    navigate(`/${data.room.linkSlug}`);
  }
  
  
  return (
    <Component />
  )
}
