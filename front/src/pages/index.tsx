import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../contexts/SocketContext";
import { IncomingMessages } from "../helpers/events";
import { API_ERRORS, GetUserResult } from "../api/common/types";
import { UserContext } from "../contexts/UserContext";
import { RoomContext } from "../contexts/RoomContext";
import { LocalStorageHelper } from "../helpers/localStorage";

interface IProps {
  Component: () => JSX.Element;
}

// Wrapper for pages to handle socket disconnect
export const Page = ({Component}: IProps) => {
  const navigate = useNavigate();
  const { socket, error, updateState } = useContext(SocketContext);
  const { updateUserState } = useContext(UserContext);
  const { updateRoomState } = useContext(RoomContext);

  useEffect(() => {
    if (error) {
      updateState({error: null});
      navigate(`/error?text=${error}`);
    }
  }, [error])

  useEffect(() => {
    socket.on(IncomingMessages.DATA, handleSuccessGet);
    return () => {
      socket.off(IncomingMessages.DATA, handleSuccessGet);
    }
  }, [])

  const handleSuccessGet = (data: GetUserResult) => {
    if (data?.error === API_ERRORS.DEFAULT || data?.room === null) {
      LocalStorageHelper.clear();
      navigate('/');
      return;
    }
    updateRoomState(data.room);
    updateUserState(data.user);
    navigate(`/${data.room.linkSlug}`);
  }
  
  
  return (
    <Component />
  )
}
