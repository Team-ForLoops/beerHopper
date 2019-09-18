const {User, Beer, Order, Review, BeerOrder} = require('./server/db/models')

const db = require('./server/db/db')

//random Index function
let randomIndex = array => {
  return Math.floor(Math.random() * array.length)
}

const seedUsers = [
  {
    username: 'theo_truong',
    role: 'guest',
    email: 'theo@gmail.com',
    password: '123theo'
  },
  {
    username: 'andrea_soloko',
    role: 'user',
    email: 'andrea@gmail.com',
    password: '123andrea'
  },
  {
    username: 'natalie_estrada',
    role: 'admin',
    email: 'natalie@gmail.com',
    password: '123natalie'
  },
  {
    username: 'pinzhi_zhang',
    role: 'guest',
    email: 'pinzhi@gmail.com',
    password: '123pinzhi'
  },
  {
    username: 'lea_seydoux',
    role: 'user',
    email: 'lea@gmail.com',
    password: '123lea'
  },
  {
    username: 'jim_harbough',
    role: 'admin',
    email: 'jim@gmail.com',
    password: '123jim'
  },
  {
    username: 'ariana_grande',
    role: 'user',
    email: 'ariana@gmail.com',
    password: '123ariana'
  },
  {
    username: 'steve_green',
    role: 'guest',
    email: 'steve@gmail.com',
    password: '123steve'
  }
]

const seedBeers = [
  {
    name: 'Bad Mama Yama',
    type: 'ale',
    ibu: 25,
    color: 'red',
    description: 'Sweet potato ale. Comparable to pumpkin spice ales.',
    imageUrl: '/images/bad-mama-yama.jpg',
    quantityInv: 20,
    price: 1299
  },
  {
    name: 'Dark Paradise',
    type: 'stout',
    ibu: 8,
    color: 'dark',
    description:
      'Stout with coconut added in secondary. Chocolatey, roasty, coconutty, delicious.',
    imageUrl: '/images/dark-paradise.jpg',
    quantityInv: 10,
    price: 1500
  },
  {
    name: 'Hibiscus Saison',
    type: 'saison',
    ibu: 40,
    color: 'light',
    description:
      'Slightly tart, sessionable saison with a beautiful light pink color',
    imageUrl: '/images/hibiscus-saison.jpg',
    quantityInv: 100,
    price: 4999
  },
  {
    name: 'Hi Honey',
    type: 'ale',
    ibu: 25,
    color: 'light',
    description: 'American honey ale, brewed and fermented with honey',
    imageUrl: '/images/hi-honey.jpg',
    quantityInv: 10,
    price: 899
  },
  {
    name: 'Wedding Saison',
    type: 'saison',
    ibu: 13,
    color: 'light',
    description: 'Become married with the saison at the firts sip',
    imageUrl: '/images/wedding-saison.jpg',
    quantityInv: 2,
    price: 599
  },
  {
    name: 'J',
    type: 'ale',
    color: 'light',
    price: 500
  }
]

const seedReviews = [
  {
    description: 'Love this beer. Great on a hot day!',
    rating: 5
  },
  {
    description: 'I do not even like beer, but I still enjoyed this drink',
    rating: 4
  },
  {
    description: 'I did not even receive my order. Terrible.',
    rating: 1
  },
  {
    description:
      'I bought this beer as a gift for a friend. The bottle cracked and I did not want to waste it. so I licked the bottle. Cut my tongue but the beer tasted great.',
    rating: 5
  },
  {
    description: 'I think it is all right',
    rating: 3
  },
  {
    description: 'The bottle design looks pretty',
    rating: 2
  },
  {
    description:
      'I am definitely 21 years old and can drink. This is a good drink.',
    rating: 4
  },
  {
    description: 'I have no idea',
    rating: 1
  }
]
//order seed data
const seedOrders = [
  {
    status: 'open'
  },
  {
    status: 'processing'
  },
  {
    status: 'cancelled'
  }
]

// seed function
const seed = async () => {
  try {
    await db.sync({force: true})
    const beers = await Beer.bulkCreate(seedBeers, {returning: true})
    const users = await User.bulkCreate(seedUsers, {returning: true})
    const reviews = await Review.bulkCreate(seedReviews, {returning: true})
    //seeding orders
    const orders = await Promise.all(
      seedOrders.map(order => Order.create(order))
    )

    //associations
    for (let i = 0; i < 7; i++) {
      await beers[randomIndex(beers)].addReview(reviews[randomIndex(reviews)])
      await reviews[randomIndex(reviews)].setUser(users[randomIndex(users)])
      await orders[randomIndex(orders)].setUser(users[randomIndex(users)])
      await orders[randomIndex(orders)].addBeer(beers[randomIndex(beers)])

      await BeerOrder.findOrCreate({
        where: {
          orderId: orders[randomIndex(orders)].id,
          beerId: beers[randomIndex(beers)].id
        },
        defaults: {
          quantity: 1,
          itemPrice: beers[randomIndex(beers)].price
        }
      })
    }

    console.log('done seeding!')
    db.close()
  } catch (err) {
    console.log(err)
  }
}

seed()
module.exports = seed
