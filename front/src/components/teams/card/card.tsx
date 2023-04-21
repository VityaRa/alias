import styled from "styled-components";
import { VerticalContainer } from "../../common/common";
import { FC } from "react";
import { COLORS } from "../../../helpers/colors";
import { IUser, UserStatus } from "../../../api/user/model";
import { Button } from "../../button/button";
import { AddIcon } from "../../../icons/plus";

interface IProps {
  title: string;
  elements?: IUser[];
  darkenTitle?: boolean;
  onClick: () => void;
  userId: string;
  gameStarted: boolean;
}

const StyledCard = styled(VerticalContainer)`
  width: 11rem;
  height: 14rem;
  background-color: ${COLORS.MAIN};
  border-radius: 0.25rem;
  margin-top: 1.5rem;
`;

const StyledTitle = styled.h2<Partial<IProps>>`
  background-color: ${(props) =>
    props.darkenTitle ? COLORS.MAIN_DIMMED : COLORS.TRANSPARENT};
  width: 100%;
  text-align: center;
  padding: 0.25rem 0;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
`;

const StyledList = styled.ul`
  margin-top: 0.5rem;
  padding: 0.75rem;
  padding-bottom: 0;
`;


const StyledButton = styled(Button)`
  width: 2.5rem !important;
  height: 2.5rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const StyledWrapper = styled(VerticalContainer)`
  width: 100%;
  height: 100%;
  justify-content: center;
`;

interface IElementProps {
  isSelf: boolean;
  text: string;
  isActive: boolean;
}

const ListElement: FC<IElementProps> = ({isSelf, text, isActive}) => {
  const renderedText = isSelf ? text + ' (you)' : '';
  const styles = {
    paddingBottom: '0,6rem',
    fontWeight: isSelf ? 800 : 400,
    color: isActive ? 'red' : 'inherit',
  }
  return (
    <p style={styles}>
      {renderedText}
    </p>
  )
}


export const Card: FC<IProps> = ({
  title,
  elements,
  onClick,
  userId,
  gameStarted,
  darkenTitle = true
}) => {
  const renderContent = () => {
    if (elements?.length) {
      return (
        <StyledList>
          {elements?.map((el) => (
            <ListElement isActive={el.status === UserStatus.ACTIVE} isSelf={el.id === userId} text={el.name!} key={el.name} />
          ))}
        </StyledList>
      );
    }

    return (
      <StyledWrapper>
        <StyledButton icon={<AddIcon />} />
      </StyledWrapper>
    );
  };
  return (
    <StyledCard onClick={!gameStarted ? () => onClick() : () => {}}>
      <StyledTitle darkenTitle={darkenTitle}>{title}</StyledTitle>
      {renderContent()}
    </StyledCard>
  );
};
