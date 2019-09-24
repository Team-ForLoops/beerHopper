/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllBeers} from './AllBeers'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('All Beers Component', () => {
  let allBeers
  let beers = [
    {id: 1, name: 'potato', price: 500, imageUrl: '/images/1.jpg'},
    {id: 2, name: 'tomato', price: 5000, imageUrl: '/images/2.jpg'}
  ]

  beforeEach(() => {
    allBeers = shallow(<AllBeers beers={beers} />)
  })

  it('renders all beer names in li tags', () => {
    expect(
      allBeers.find('li').someWhere(n => n.text().includes('potato'))
    ).to.equal(true)
    expect(
      allBeers.find('li').someWhere(n => n.text().includes('soup'))
    ).to.equal(false)
  })
})
