const initialSearch = []

const SET_SEARCHED_BEERS = 'SET_SEARCHED_BEERS'

export const setSearchedBeers = beers => {
  return {
    type: SET_SEARCHED_BEERS,
    beers
  }
}

export default function(state = initialSearch, action) {
  switch (action.type) {
    case SET_SEARCHED_BEERS:
      return action.beers
    default:
      return state
  }
}
