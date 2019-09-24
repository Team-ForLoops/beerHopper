const CHANGE = 'CHANGE'

export const changeStatus = () => {
  return {
    type: CHANGE
  }
}

export default function(state = true, action) {
  switch (action.type) {
    case CHANGE:
      return !state
    default:
      return state
  }
}
