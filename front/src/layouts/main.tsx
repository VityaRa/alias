import { COLORS } from '../helpers/colors';
import { WithChildrens } from '../helpers/types';
import styled from 'styled-components';

const StyledMain = styled.main`
	background-color: ${COLORS.BACKROUND};
	min-height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

type MainLayoutProps = {
	view?: boolean;
}

export const Main: WithChildrens<MainLayoutProps> = ({children}) => {
  return (
    <StyledMain>
			{children}
		</StyledMain>
  )
}
