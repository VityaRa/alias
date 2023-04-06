import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../../helpers/colors";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { validateName } from "../../validations/user";
import { Input, ErrorText } from "../../components";
import { Button } from "../../components/button/button";
import { Heading } from "../../components/typography";

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

const fetchData = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { name, setName } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorText = validateName(name);
    if (errorText) {
      return setError(errorText);
    }

    // request to server;
    const roomId = fetchData();
    navigate(`/${roomId}`)
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
