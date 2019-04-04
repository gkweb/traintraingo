import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Chevron} from './icon'

const ContainerElem = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const ChevronIconElem = styled(Chevron)`
  max-width: 1em;
  margin-left: auto;
  transform: ${props => (props.isOpen ? 'rotate(-90deg)' : 'rotate(0)')}
`

const NoticeElem = styled.svg`
  display: block;
  width: 1.25em;
  height: 1.25em;
  margin-right: .25em;
  fill: ${props => props.theme.highlightSecondary};
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
  color: ${props => props.theme.inversePrimary};
  background: none;
  position: relative;
`

const TitleTextElem = styled.p`
  margin: 0;
`

const ContentElem = styled.div`
  padding: 1em;
  background-color: ${props => props.theme.primaryBg};
  color: ${props => props.theme.primary};
`

const DisruptionListElem = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const DisruptionItemElem = styled.li`
  margin-bottom: 1em;
`

const DisruptionTitleElem = styled.span`
  display: block;
  margin-bottom: .5em;
  font-weight: bold;
`

const DisruptionDescElem = styled.span`
  display: block;
  margin-bottom: .5em;
`

const DisruptionReadMoreElem = styled.a`
  display: block;
  color: ${props => props.theme.link};
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
    let d = null
    let content = null

    if (this.props.disruptionData && this.props.disruptionData.length > 0) {
      if (this.state.visible) {
        content = <ContentElem>
          <DisruptionListElem>
          {this.props.disruptionData.map((val, index) => (
            <DisruptionItemElem key={index}>
              <DisruptionTitleElem>{val.title}</DisruptionTitleElem>
              <DisruptionDescElem>{val.description}
                {val.url ? <DisruptionReadMoreElem href={val.url} colour={val.colour}>Read more</DisruptionReadMoreElem> : null}
              </DisruptionDescElem>
            </DisruptionItemElem>
            )
          )}
          </DisruptionListElem>
        </ContentElem>
      }

      d = <ContainerElem>
      <TitleElem onClick={this.handleClick}>
        <NoticeElem viewBox="0 0 32 32">
          <path d="M15.5 3c-7.456 0-13.5 6.044-13.5 13.5s6.044 13.5 13.5 13.5 13.5-6.044 13.5-13.5-6.044-13.5-13.5-13.5zM15.5 27c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zM15.5 10c-0.828 0-1.5 0.671-1.5 1.5v5.062c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v-5.062c0-0.829-0.672-1.5-1.5-1.5zM15.5 20c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5z"></path>
        </NoticeElem>
        <TitleTextElem>Possible disruption</TitleTextElem>
        <ChevronIconElem isOpen={this.state.visible}/>
      </TitleElem>
      {content}
    </ContainerElem>
    }

    return d
  }
}

Disruption.propTypes = {
  disruptionData: PropTypes.array
}

export default Disruption
