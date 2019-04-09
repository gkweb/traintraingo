import styled from 'styled-components'
import PropTypes from 'prop-types'
import { SaveIcon, UnsaveIcon } from './icon'

const ButtonElem = styled.button`
  display: block;
  width: 1em;
  height: 1em;
  border: 0;
  padding: 0;
  margin: 0 0.25em 0;
  background: none;
  font-size: 1em;
  color: ${props => props.theme.primary};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.125s transform ease;

  &:focus {
    outline: 0;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover,
  &:focus {
    overflow: visible;
    color: ${props => props.theme.highlightPrimary};
  }

  &:hover > span,
  &:focus > span {
    left: 50%;
  }
`

const Text = styled.span`
  display: block;
  padding: 0.5em;
  position: absolute;
  bottom: -0.25em;
  left: -999em;
  transform: translate(-50%, 100%);
  background-color: ${props => props.theme.tertiaryBg};
  color: ${props => props.theme.primary};
  z-index: 99;
`

const IconContainerSavedElem = styled.span`
  fill: ${props => props.theme.highlightPrimary};
`

const IconContainerUnsaveElem = styled.span`
  fill: ${props => props.theme.highlightPrimary};
`

const Save = ({ isSaved, handler }) => {
  return (
    <ButtonElem onClick={handler}>
      {isSaved ? (
        <SaveIcon style={{ fill: '#EEDB57', stroke: '#EEDB57' }} />
      ) : (
        <UnsaveIcon />
      )}
      <Text>{isSaved ? 'unsave' : 'save'}</Text>
    </ButtonElem>
  )
}

Save.propTypes = {
  handler: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
}

export default Save
