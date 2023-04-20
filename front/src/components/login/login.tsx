import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useContext, useState } from "react";
import { LoginUserResult } from "../../api/common/types";
import { ErrorText, Input } from "../../components";
import { Button } from "../../components/button/button";
import { Heading } from "../../components/typography";
import { RoomContext } from "../../contexts/RoomContext";
import { SocketContext } from "../../contexts/SocketContext";
import { UserContext } from "../../contexts/UserContext";
import { COLORS } from "../../helpers/colors";
import { IncomingMessages } from "../../helpers/events";
import { LS_KEYS, LocalStorageHelper } from "../../helpers/localStorage";
import { validateName } from "../../validations/user";

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

interface IProps {
  withJoin?: boolean; 
}

export const Login: FC<IProps> = ({withJoin}) => {
  const navigate = useNavigate();
  const { login, socket } = useContext(SocketContext);
  const { name, setName, updateUserState } = useContext(UserContext);
  const { updateRoomState } = useContext(RoomContext);
  const [error, setError] = useState<string | null>(null);
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorText = validateName(name);
    if (errorText) {
      return setError(errorText);
    }

    login({username: name!});
  };

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
