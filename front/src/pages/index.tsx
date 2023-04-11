import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../contexts/SocketContext";

interface IProps {
  Component: () => JSX.Element;
}

// Wrapper for pages to handle socket disconnect
export const Page = ({Component}: IProps) => {
  const navigate = useNavigate();
  const { error, updateState } = useContext(SocketContext);

  useEffect(() => {
    if (error) {
      updateState({error: null});
      navigate(`/error?text=${error}`);
    }
  }, [error])
  
  return (
    <Component />
  )
}
