import styled from 'styled-components'

const IconElem = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  fill: currentColor;
  stroke: currentColor;
  max-width: 1em;
`

const Chevron = (props) => (
  <IconElem viewBox="0 0 24 24" className={props.className} style={props.style}>
    <path d="M15.422 7.406l-4.594 4.594 4.594 4.594-1.406 1.406-6-6 6-6z"></path>
  </IconElem>
)

const Search = (props) => (
  <IconElem viewBox="0 0 24 24" className={props.className} style={props.style}>
    <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-0.627 0.604-1.365 1.091-2.18 1.429-0.822 0.34-1.725 0.529-2.675 0.529s-1.853-0.189-2.677-0.53c-0.856-0.354-1.627-0.874-2.273-1.521s-1.166-1.417-1.521-2.273c-0.34-0.823-0.529-1.726-0.529-2.676s0.189-1.853 0.53-2.677c0.354-0.855 0.874-1.627 1.52-2.273s1.418-1.166 2.273-1.52c0.824-0.341 1.727-0.53 2.677-0.53s1.853 0.189 2.677 0.53c0.856 0.354 1.627 0.874 2.273 1.521s1.166 1.417 1.521 2.273c0.34 0.823 0.529 1.726 0.529 2.676s-0.189 1.853-0.53 2.677c-0.338 0.815-0.825 1.553-1.429 2.18zM21.707 20.293l-3.675-3.675c0.525-0.656 0.96-1.387 1.286-2.176 0.44-1.062 0.682-2.225 0.682-3.442s-0.242-2.38-0.682-3.442c-0.456-1.102-1.125-2.093-1.954-2.922s-1.82-1.498-2.922-1.954c-1.062-0.44-2.225-0.682-3.442-0.682s-2.38 0.242-3.442 0.682c-1.102 0.456-2.093 1.125-2.922 1.954s-1.498 1.82-1.954 2.922c-0.44 1.062-0.682 2.225-0.682 3.442s0.242 2.38 0.682 3.442c0.456 1.102 1.125 2.093 1.954 2.922s1.82 1.498 2.922 1.954c1.062 0.44 2.225 0.682 3.442 0.682s2.38-0.242 3.442-0.682c0.788-0.327 1.52-0.762 2.176-1.286l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
  </IconElem>
)

const Bookmark = (props) => (
  <IconElem viewBox="0 0 32 32" className={props.className} style={props.style}>
    <path d="M6 0v32l10-10 10 10v-32z"></path>
  </IconElem>
)

const Save = (props) => (
  <IconElem viewBox="0 0 32 32" className={props.className} style={props.style}>
    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
  </IconElem>
)

const Unsave = (props) => (
  <IconElem viewBox="0 0 32 32" className={props.className} style={props.style}>
    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
  </IconElem>
)

export {
  IconElem,
  Chevron,
  Search,
  Bookmark,
  Save,
  Unsave
}