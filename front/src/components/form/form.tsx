import { Input } from '../input/input'
import styled from 'styled-components'
import { COLORS } from '../../helpers/colors'
import { ErrorText, Heading } from '../typography'
import { Button } from '../button/button'
import { useContext, useState } from 'react'
import { UserContext, UserContextProvider } from '../../contexts/UserContext'
import { validateName } from '../../validations/user'

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
` 

const FormHeading = styled(Heading)`
  margin-bottom: 1.25rem;
`

const FormInput = styled(Input)`
  margin-bottom: 0.5rem;
`

const FormButton = styled(Button)`
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem;
`

const FormError = styled.p`

`;

export const Form = () => {
  const {name, setName} = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorText = validateName(name);
    if (errorText) {
      return setError(errorText);
    }

    // request to server;
  }

  return (
    <StyledForm onSubmit={onSubmit}>
        <FormHeading>
          Введите никнейм
        </FormHeading>
        <FormInput error={Boolean(error)} onChangeValue={setName} value={name} placeholder='Ваш никнейм'/>
        {error && <ErrorText>{error}</ErrorText>}
        <FormButton text='Вперед!'/>
    </StyledForm>
  )
}
