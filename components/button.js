import styled from 'styled-components'

export const ButtonElem = styled.button`
  display: block;
  box-sizing: border-box;
  background-color: #333434;
  border: 1px solid #333434;
  color: white;

  &:focus {
    outline: 0;
    box-shadow: 0 0 #fff 2px;
  }

  &:hover,
  &:focus {
    background-color: #202121;
  }
`
