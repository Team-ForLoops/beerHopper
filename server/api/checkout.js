const router = require('express').Router()
const stripe = require('stripe')('sk_test_cTtKz3KQH21MomqmxRL9O7e000kCGWkLjq')
const uuid = require('uuid/v4')
const cors = require('cors')
module.exports = router

router.use(cors())

router.post('/', async (req, res, next) => {
  let error
  let status
  try {
    const {amount, token} = req.body

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: amount,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the beers`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    )
    status = 'success'
  } catch (error) {
    console.error('Error', error)
  }
  res.json({error, status})
})
