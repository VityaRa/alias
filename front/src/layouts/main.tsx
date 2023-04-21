import { useContext, useEffect, useState } from 'react';
import { COLORS } from '../helpers/colors';
import { WithChildrens } from '../helpers/types';
import styled from 'styled-components';
import { useGameState } from '../helpers/useGameState';

const StyledMain = styled.main`
	background-color: ${COLORS.BACKROUND};
	min-height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
`

type MainLayoutProps = {}

export const Main: WithChildrens<MainLayoutProps> = ({children}) => {
	const { isStarted } = useGameState();

  return (
    <StyledMain style={{alignItems: !isStarted ? 'center' : 'flex-start'}}>
			{children}
		</StyledMain>
  )
}
