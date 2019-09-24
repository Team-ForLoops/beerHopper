const stripe = require('stripe')('sk_test_xcttrI6xDA232ILmsmISyivh00d9uEvCgL')

const response = (async () => {
  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com'
  })
})()

console.log(response)
