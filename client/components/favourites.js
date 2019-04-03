import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {H3} from './text'
import {getItems} from './../lib/local-storage'
import {Bookmark} from './icon'

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
  border: 1px solid black;
  background: ${props => props.theme.primary};
  box-shadow: -.0625em .125em .5em -.125em rgba(0,0,0,.7);
  color: ${props => props.theme.tertiary};
  text-decoration: none;
  transition: transform .125s ease;

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  span:last-child {
    margin-left: .5em;
    color: ${props => props.theme.highlightPrimary};
  }
`

const FavouritesContainerElem = styled.section`
  padding: 1em 1em 4em;
  background-color: #fff;

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
      <H3>Favourites</H3>
      <FavoriteListElem>
        {Object.keys(this.state.favourites).map((val, ind) => (
          <FavoriteItemElem key={ind}>
            <Link href={`/departures/${val}`} as={`/departures/${val}`} passHref>
              <FavoriteLinkElem>
                <span>{this.state.favourites[val]}</span>
                <span><Bookmark/></span>
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
