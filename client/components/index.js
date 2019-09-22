/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleBeer} from './SingleBeerComp'
export {default as UpdateBeer} from './UpdateBeerComp'
export {default as AllOrders} from './AllOrdersComp'
export {default as AllUsers} from './AllUsersComp'
