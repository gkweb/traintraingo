import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {H4} from './text'
import {getItems} from './../lib/fav-local-storage'
import {BookmarkIcon} from './icon'

const FavoriteListElem = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 -.5em;
  padding: 0;
`

const FavoriteItemElem = styled.li`
  display: inline-flex;
  margin: .5em;
`

const FavoriteLinkElem = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 30em;
  padding: 1em;
  border: 1px solid ${props => props.theme.tertiaryBg};
  background: ${props => props.theme.inversePrimaryBg};
  box-shadow: -.0625em .125em .5em -.125em rgba(0,0,0,.125);
  color: ${props => props.theme.inversePrimary};
  text-decoration: none;
  transition: transform .125s ease;
  font-size: .75em;

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  span:last-child {
    margin-left: .5em;
    max-width: 1em;
    color: ${props => props.theme.highlightPrimary};
  }

  @media screen and (min-width: 50em) {
    font-size: 1em;
  }
`

const FavouritesContainerElem = styled.section`
  padding: 1em 1em 4em;
  background-color: ${props => props.theme.primaryBg};

  @media screen and (min-width: 50em) {
    padding: 1em 1em 4em;
    margin-top: 3em;
  }
`

class Favourites extends React.Component {
  constructor() {
    super()
    this.state = {
      favourites: {}
    }
  }

  componentDidMount() {
    const favourites = getItems()
    if (favourites) this.setState({favourites: favourites})
  }

  render() {
    let r

    if (this.state.favourites && Object.keys(this.state.favourites).length > 0) {
      r = <FavouritesContainerElem>
      <H4>Favourites</H4>
      <FavoriteListElem>
        {Object.keys(this.state.favourites).map((val, ind) => (
          <FavoriteItemElem key={ind}>
            <Link href={`/departures/${val}`} as={`/departures/${val}`} passHref>
              <FavoriteLinkElem>
                <span>{this.state.favourites[val]}</span>
                <span><BookmarkIcon/></span>
              </FavoriteLinkElem>
            </Link>
        </FavoriteItemElem>
        ))}
      </FavoriteListElem>
      </FavouritesContainerElem>
    } else {
      r = null
    }

    return r
  }
}

export default Favourites
