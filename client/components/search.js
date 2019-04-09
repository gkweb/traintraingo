import styled from 'styled-components'
import { SearchIcon } from './../components/icon'
import PropTypes from 'prop-types'

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5em 1em;
  background-color: ${props => props.theme.inputBg};
  border: 1px solid ${props => props.theme.inputBorder};
  color: ${props => props.theme.input};
  border-radius: 0.25em;
  font-size: 1em;

  @media screen and (min-width: 50em) {
    padding: 0.75em 1em;
    font-size: 1.1em;
  }

  &:focus {
    outline: 0;
  }
`

const FormElem = styled.form`
  display: block;
  position: relative;
`

const SearchIconElem = styled(props => <SearchIcon {...props} />)`
  position: absolute;
  right: 0.5em;
  top: 50%;
  transform: translateY(-50%);
  max-width: 1.25em;
  fill: ${props => props.theme.inputIcon};
  stroke: rgba(255, 255, 255, 0);

  @media screen and (min-width: 50em) {
    max-width: 1.75em;
    right: 1em;
  }
`

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      hasFocus: false,
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleFocus() {
    this.setState({
      hasFocus: true,
    })
  }

  handleBlur() {
    this.setState({
      hasFocus: false,
    })
  }

  render() {
    return (
      <FormElem onSubmit={this.props.onSubmit}>
        <SearchInput
          name="search_field"
          type="text"
          onChange={this.props.onChange}
          autoComplete={'off'}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {this.state.hasFocus ? null : <SearchIconElem />}
      </FormElem>
    )
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Search
