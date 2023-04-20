import { useContext } from "react";
import styled from "styled-components";
import { RoomContext } from "../../contexts/RoomContext";
import { Select } from "../select/select";

const ExtraMargin = styled.div`
  margin-top: 1.25rem;
`

const StyledThemeSelector = styled(Select)`
  margin-top: 1.25rem;
`

export const ThemeSelector = () => {
  const { themes, selectedThemeId, updateRoomState } = useContext(RoomContext);
  const setTheme = (themeId: string) => {
    updateRoomState({selectedThemeId: themeId});
  }
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
        const id = e.target.value;
        setTheme(id);
      }}
      activeValueId={selectedThemeId}
    />
  )
}
