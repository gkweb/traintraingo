import styled from 'styled-components'
import {Search as SearchIcon} from './../components/icon'

const SearchInput = styled.input`
box-sizing: border-box;
width: 100%;
padding: 1em;
background-color: ${props => props.theme.tertiaryBg};
border: 1px solid #111;
color: ${props => props.theme.primary};
border-radius: .25em;
font-size: 1.1em;

&:focus {
  outline: 0;
}
`

const FormElem = styled.form`
display: block;
position: relative;
`

const SearchIconElem = styled(SearchIcon)`
position: absolute;
right: 1em;
top: 50%;
transform: translateY(-50%);
max-width: 1.75em;
fill: rgba(255, 255, 255, .25);
stroke: rgba(255, 255, 255, 0);
`

class Search extends React.Component {
constructor() {
  super()
  this.state = {
    hasFocus: false
  }

  this.handleFocus = this.handleFocus.bind(this)
  this.handleBlur = this.handleBlur.bind(this)
}

handleFocus () {
  this.setState({
    hasFocus: true
  })
}

handleBlur () {
  this.setState({
    hasFocus: false
  })
}

render() {
  return (
<FormElem onSubmit={this.props.onSubmit}>
  <SearchInput name="search_field" type="text" onChange={this.props.onChange} autoComplete={'off'} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
  {this.state.hasFocus ? null : <SearchIconElem />}
</FormElem>
)}
}

export default Search
