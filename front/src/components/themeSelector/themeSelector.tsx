import { useContext, useMemo } from "react";
import styled from "styled-components";
import { RoomContext } from "../../contexts/RoomContext";
import { UserContext } from "../../contexts/UserContext";
import { Select } from "../select/select";

const ExtraMargin = styled.div`
  margin-top: 1.25rem;
`

const StyledThemeSelector = styled(Select)`
  margin-top: 1.25rem;
`

export const ThemeSelector = () => {
  const { themes, selectedThemeId, updateRoomState, changeTheme, owner } = useContext(RoomContext);
  const { id } = useContext(UserContext);
  const setTheme = (themeId: string) => {
    updateRoomState({selectedThemeId: themeId});
  }

  const isOwner = useMemo(() => id === owner?.id, [id, owner]) ;

  if (!themes.length) {
    return <ExtraMargin>Themes loading...</ExtraMargin>
  }
  if (!selectedThemeId) {
    setTheme(themes[0].id)
    return <ExtraMargin>Themes loading...</ExtraMargin>
  }
  return (
    <StyledThemeSelector 
      values={themes}
      value={themes.find(theme => theme.id === selectedThemeId)?.id}
      onChange={(e) => {
        if (!isOwner) {
          return;
        }
        const id = e.target.value;
        setTheme(id);
        changeTheme(id);
      }}
      activeValueId={selectedThemeId}
      disabled={!isOwner}
    />
  )
}
