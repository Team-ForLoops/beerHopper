const {
  User,
  Beer,
  Order,
  Review,
  BeerOrder,
  Category
} = require('./server/db/models')
const faker = require('faker')
const db = require('./server/db/db')

//random Index function
let randomIndex = array => {
  return Math.floor(Math.random() * array.length)
}

const seedUsers = [
  {
    username: 'theo_truong',
    isAdmin: false,
    email: 'theo@gmail.com',
    password: '123theo',
    imageUrl:
      'https://datascopeanalytics.com/blog/introducing-the-duodesk/image04.png'
  },
  {
    username: 'sean_opry',
    isAdmin: false,
    email: 'sean@gmail.com',
    password: '123sean',
    imageUrl: 'https://www.thefamouspeople.com/profiles/images/sean-opry-1.jpg'
  },
  {
    username: 'natalie_estrada',
    isAdmin: true,
    email: 'natalie@gmail.com',
    password: '123natalie',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMzkyMTk2NzM2Ml5BMl5BanBnXkFtZTcwNDQ4MjYzMg@@._V1_UY1200_CR109,0,630,1200_AL_.jpg'
  },
  {
    username: 'pinzhi_zhang',
    isAdmin: true,
    email: 'pinzhi@gmail.com',
    password: '123pinzhi',
    imageUrl:
      'http://www.pzinvest.com/uploadfiles/2018/05/20180514160258258.jpg'
  },
  {
    username: 'lea_seydoux',
    isAdmin: false,
    email: 'lea@gmail.com',
    password: '123lea',
    imageUrl:
      'https://pixel.nymag.com/imgs/fashion/daily/2017/10/11/11-Lea-Seydoux.w700.h700.jpg'
  },
  {
    username: 'jim_harbough',
    isAdmin: true,
    email: 'jim@gmail.com',
    password: '123jim',
    imageUrl:
      'https://www.washingtonpost.com/resizer/sXyV2KKy0s6FZpBDcIM7Verehjo=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/I6THIWVYAUI6RLSPFQKDTSLNPE.jpg'
  },
  {
    username: 'ariana_grande',
    isAdmin: false,
    email: 'ariana@gmail.com',
    password: '123ariana',
    imageUrl:
      'https://www.thenews.com.pk//assets/uploads/updates/2019-09-19/528919_2617863_ariana_updates.jpg'
  },
  {
    username: 'andrea_soloko',
    isAdmin: false,
    email: 'andrea@gmail.com',
    password: '123andrea',
    imageUrl:
      'https://a4-images.myspacecdn.com/images01/13/ad413c0e542abb26ae8c72267d28a23d/full.jpg'
  }
]

const seedBeers = [
  {
    name: 'Jingle Beer',
    price: 6549,
    ibu: 7,
    quantity: 33,
    description: 'Infused with the Christmas Sprirt!',
    imageUrl: '/images/1.jpg'
  },
  {
    name: 'Santa Clausthaler',
    price: 214,
    ibu: 0,
    quantity: 4,
    description: 'Santas favorite beer',
    imageUrl: '/images/2.jpg'
  },
  {
    name: 'Cuvée de Nol',
    price: 643,
    ibu: 9,
    quantity: 43,
    description: 'Sour and Wonderful',
    imageUrl: '/images/3.jpg'
  },
  {
    name: 'Julebrygg',
    price: 519,
    ibu: 45,
    quantity: 344,
    description: 'Nutty tsunami that flows like a pastoral poem',
    imageUrl: '/images/4.jpg'
  },
  {
    name: 'Julebryg',
    price: 574,
    ibu: 72,
    quantity: 3,
    description:
      'Satisfying goodness reminiscent of a wet old box in your grandmas basement',
    imageUrl: '/images/5.jpg'
  },
  {
    name: 'Lade Gaards Brygghus Julel',
    price: 592,
    ibu: 65,
    quantity: 354,
    description: 'Infused nelson nectar with low hops',
    imageUrl: '/images/6.jpg'
  },
  {
    name: 'Ekstra Vellagret Julebrygg',
    price: 639,
    ibu: 65,
    quantity: 654,
    description: 'Girthy booze fest with maple undertones',
    imageUrl: '/images/7.jpg'
  },
  {
    name: 'Nissefar',
    price: 607,
    ibu: 7,
    quantity: 4,
    description: 'Sour mountains of bitterness but in a good way',
    imageUrl: '/images/8.jpg'
  },
  {
    name: 'Nissegodt',
    price: 6526,
    ibu: 45,
    quantity: 66,
    description: 'Insanely refreshing sour-patch kid with a gym sock funk',
    imageUrl: '/images/9.jpg'
  },
  {
    name: 'Nissel',
    price: 606,
    ibu: 45,
    quantity: 45,
    description: 'Burnt subtle wet blanket',
    imageUrl: '/images/10.jpg'
  },
  {
    name: 'God Jul',
    price: 589,
    ibu: 85,
    quantity: 24,
    description: 'Bitter funk with brett earthiness',
    imageUrl: '/images/11.jpg'
  },
  {
    name: 'Julesnadder',
    price: 719,
    ibu: 45,
    quantity: 11,
    description: 'Blonde lager with notes of leather-bound books',
    imageUrl: '/images/12.jpg'
  },
  {
    name: 'Special Holiday Ale',
    price: 671,
    ibu: 9,
    quantity: 42,
    description: 'Belch-inducing think piece with notes of marshmallow',
    imageUrl: '/images/13.jpg'
  },
  {
    name: 'Julebrygg',
    price: 6201,
    ibu: 47,
    quantity: 65,
    description: 'Wine-like swill with an influence of wild yeast',
    imageUrl: '/images/14.jpg'
  },
  {
    name: 'BBQ Sauce',
    price: 65201,
    ibu: 7,
    quantity: 6,
    description: 'Tastes like bbq sauce but carbonated. real gross',
    imageUrl: '/images/15.jpg'
  },
  {
    name: 'Cake City',
    price: 666,
    ibu: 99,
    quantity: 213,
    description:
      'Want to drink cake? like bad things? this is the one for you. No bottles ever sold. Will you be the first? Make history by purchasing this beer!',
    imageUrl: '/images/16.jpg'
  },
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque id. Venenatis a condimentum vitae sapien pellentesque habitant. Cras adipiscing enim eu turpis. Enim facilisis gravida neque convallis a cras semper. Neque sodales ut etiam sit amet nisl purus in. Et netus et malesuada fames ac turpis egestas integer eget. Tempor orci eu lobortis elementum. Adipiscing diam donec adipiscing tristique risus nec. Imperdiet dui accumsan sit amet nulla facilisi morbi. Commodo nulla facilisi nullam vehicula ipsum. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Tellus pellentesque eu tincidunt tortor aliquam. Lacus luctus accumsan tortor posuere. Velit sed ullamcorper morbi tincidunt ornare massa. Faucibus pulvinar elementum integer enim neque volutpat. Nulla pharetra diam sit amet nisl. Facilisis gravida neque convallis a cras semper auctor. Ipsum dolor sit amet consectetur adipiscing.',
    imageUrl: '/images/wedding-saison.jpg',
    quantityInv: 2,
    price: 599
  },
  {
    name: 'Jalapeno Business',
    type: 'ale',
    color: 'light',
    description: 'Its very much in your business!',
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
    description: 'My favorite!',
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
    description: "I can't drink beer'",
    rating: 1
  }
]

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
//beer categories
const beerCats = ['ale', 'lager', 'stout', 'sour', 'saison', 'pickle', 'sfdfk']

// seed function
const seed = async () => {
  try {
    await db.sync({force: true})

    const beers = await Beer.bulkCreate(seedBeers, {returning: true})
    const users = await User.bulkCreate(seedUsers, {returning: true})
    //const reviews = await Review.bulkCreate(seedReviews, {returning: true})
    for (let i = 0; i < 100; i++) {
      await Review.create({
        description: faker.lorem.sentences(),
        rating: Math.floor(Math.random() * 5) + 1,
        userId: randomIndex(users) + 1,
        beerId: randomIndex(beers) + 1
      })
    }
    const orders = await Promise.all(
      seedOrders.map(order => Order.create(order))
    )
    const categories = await Promise.all(
      beerCats.map(cat =>
        Category.create({
          type: cat
        })
      )
    )

    //associations
    await Promise.all(
      orders.map(order => order.setUser(users[randomIndex(users)]))
    )
    await Promise.all(
      orders.map(order => order.addBeer(beers[randomIndex(beers)]))
    )

    //create beer-orders
    await Promise.all(
      orders.map(order =>
        BeerOrder.findOrCreate({
          where: {
            orderId: order.id,
            beerId: beers[randomIndex(beers)].id
          }
        })
      )
    )
    //create beer-categories join table
    //console.log(Beer.prototype); how to get magic methods
    await Promise.all(
      beers.map(beer => {
        let catIdx = randomIndex(categories)
        if (catIdx) beer.addCategory(categories[0])
        if (catIdx % 2) beer.addCategory(categories[2])
        beer.addCategory(categories[catIdx])
      })
    )

    console.log('done seeding!')
    // db.close();
  } catch (err) {
    console.log(err)
  }
}

seed()

module.exports = seed
