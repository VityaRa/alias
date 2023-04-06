import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const VerticalContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
`