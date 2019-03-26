import styled from 'styled-components'
import {IconElem, savePath, unsavePath} from './save-icon'

const ButtonElem = styled.button`
  display: block;
  width: 1em;
  height: 1em;
  border: 0;
  padding: 0;
  margin: 0 .25em 0;
  background: none;
  font-size: 1em;
  color: white;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:focus {
    outline: 0;
  }

  &:hover,
  &:focus {
    overflow: visible;
    color: yellow;
  }

  &:hover > span,
  &:focus > span {
    left: 50%;
  }
`

const Text = styled.span`
  display: block;
  padding: .5em;
  position: absolute;
  bottom: -.25em;
  left: -999em;
  transform: translate(-50%, 100%);
  background-color: #222;
  color: white;
  z-index: 99;
`

const Save = ({isSaved, handler}) => {
  return (
    <ButtonElem onClick={handler}>
      <IconElem viewBox='0 0 32 32'>
        {isSaved ? savePath : unsavePath}
      </IconElem>
      <Text>{isSaved ? 'unsave' : 'save'}</Text>
    </ButtonElem>
  )
}

export default Save
