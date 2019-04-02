import styled from 'styled-components'

const IconElem = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  fill: currentColor;
  stroke: currentColor;
  max-width: 1em;
`

const ChevronIcon = (props) => (
  <IconElem viewBox="0 0 24 24" className={props.className}>
    <path d="M15.422 7.406l-4.594 4.594 4.594 4.594-1.406 1.406-6-6 6-6z"></path>
  </IconElem>
)

export {
  IconElem,
  ChevronIcon
}
