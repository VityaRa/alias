import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../../helpers/colors";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { validateName } from "../../validations/user";
import { Input, ErrorText } from "../../components";
import { Button } from "../../components/button/button";
import { Heading } from "../../components/typography";
import { SocketContext } from "../../contexts/SocketContext";
import { IncomingMessages } from "../../helpers/events";
import { RoomContext } from "../../contexts/RoomContext";
import { GetUserResult } from "../../api/common/types";
import { LS_KEYS, LocalStorageHelper } from "../../helpers/localStorage";

const StyledForm = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20rem;
  height: auto;
  background-color: ${COLORS.MAIN};
  border-radius: 0.25rem;
  margin-bottom: 10rem;
  padding: 1rem;
`;

const FormHeading = styled(Heading)`
  margin-bottom: 1.25rem;
`;

const FormInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const FormButton = styled(Button)`
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem;
`;

const FormError = styled.p``;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, socket } = useContext(SocketContext);
  const { name, setName, updateUserState } = useContext(UserContext);
  const { updateRoomState } = useContext(RoomContext);
  const [error, setError] = useState<string | null>(null);
  const handleSuccessLogin = (data: GetUserResult) => {
    if (!data.room) {
      LocalStorageHelper.remove(LS_KEYS.USER_ID);
      LocalStorageHelper.remove(LS_KEYS.ROOM_ID);
      return;
    }
    updateRoomState(data.room);
    updateUserState(data.user);
    LocalStorageHelper.set(LS_KEYS.USER_ID, data.user.id);
    LocalStorageHelper.set(LS_KEYS.ROOM_ID, data.room.id);
    navigate(data.room.linkSlug);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorText = validateName(name);
    if (errorText) {
      return setError(errorText);
    }

    login({username: name!});
  };

  useEffect(() => {
    socket.on(IncomingMessages.LOGIN_SUCCESS, handleSuccessLogin);
    return () => {
      socket.off(IncomingMessages.LOGIN_SUCCESS, handleSuccessLogin);
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <FormHeading>Введите никнейм</FormHeading>
      <FormInput
        error={Boolean(error)}
        onChangeValue={setName}
        value={name}
        placeholder="Ваш никнейм"
      />
      {error && <ErrorText>{error}</ErrorText>}
      <FormButton text="Вперед!" />
    </StyledForm>
  );
};
