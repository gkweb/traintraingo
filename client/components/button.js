import styled from 'styled-components'

export const ButtonElem = styled.button `
  display: block;
  box-sizing: border-box;
  background-color: ${props => props.theme.secondaryBg};
  border: 1px solid ${props => props.theme.secondaryBg};
  color: ${props => props.theme.primary};

  &:focus {
    outline: 0;
    box-shadow: 0 0 ${props => props.theme.primary} 2px;
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.tertiaryBg};
  }
`
