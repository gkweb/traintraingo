import styled from 'styled-components'

const IconElem = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  fill: currentColor;
  stroke: currentColor;
`

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

const Save = ({isSaved}) => {
  const unsavedPath = <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
  const savedPath = <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>

  return (
    <ButtonElem>
      <IconElem viewBox='0 0 32 32'>
        {isSaved ? savedPath : unsavedPath}
      </IconElem>
      <Text>{isSaved ? 'unsave' : 'save'}</Text>
    </ButtonElem>
  )
}

export default Save
