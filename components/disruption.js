import React, {Component} from 'react'
import styled from 'styled-components'

const ContainerElem = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const NoticeElem = styled.svg`
  display: block;
  width: 1em;
  height: 1em;
  margin-right: .25em;
  fill: #ffB86f;
`

const TitleElem = styled.button`
  display: flex;
  padding: .5em;
  width: 100%;
  border: 0;
  margin: 0;
  font-size: 1em;
  font-weight: bold;
  font-family:'Lustria', serif;
  color: black;
`

const TitleTextElem = styled.p`
  margin: 0;
`

const ContentElem = styled.div`
  padding: 1em;
  background-color: #444;
  color: white;
`

const DisruptionListElem = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const DisruptionItemElem = styled.li`
  
`

const DisruptionTitleElem = styled.span`
  display: block;  
  font-weight: bold;
`

const DisruptionDescElem = styled.span`
  display: block;
`

class Disruption extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    // Toggle
    this.setState({visible: !this.state.visible})
  }

  render() {
    return (
      <ContainerElem>
      <TitleElem onClick={this.handleClick}>
        <NoticeElem viewBox="0 0 32 32">
          <path d="M15.5 3c-7.456 0-13.5 6.044-13.5 13.5s6.044 13.5 13.5 13.5 13.5-6.044 13.5-13.5-6.044-13.5-13.5-13.5zM15.5 27c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zM15.5 10c-0.828 0-1.5 0.671-1.5 1.5v5.062c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v-5.062c0-0.829-0.672-1.5-1.5-1.5zM15.5 20c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5z"></path>
        </NoticeElem>
        <TitleTextElem>Possible disruption</TitleTextElem>
      </TitleElem>
      {this.state.visible ? <ContentElem>
        <DisruptionListElem>
          <DisruptionItemElem>
            <DisruptionTitleElem>
              PTV is out of money
            </DisruptionTitleElem>
            <DisruptionDescElem>
              Blah blah disruption
            </DisruptionDescElem>
          </DisruptionItemElem>
        </DisruptionListElem>
      </ContentElem> : null}
    </ContainerElem>
  )
  }
}

export default Disruption
