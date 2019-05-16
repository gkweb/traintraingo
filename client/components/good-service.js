import styled from 'styled-components'
import { TickIcon } from './icon'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0.5em;
`

const Icon = styled(TickIcon)`
  width: 1.25em;
  height: 1.25em;
  margin-right: 0.25em;
  fill: ${props => props.theme.highlightTertiary};
  color: ${props => props.theme.highlightTertiary};
`

const TextBlock = styled.span``

const GoodService = () => (
  <Container>
    <Icon />
    <TextBlock>Good Service</TextBlock>
  </Container>
)

export default GoodService
