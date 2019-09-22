//with orderId, finds all beer order w/ orderId
//result is array of beer orders
//loop through beer orders to get quantity and get beerId put on object
//find beer with beerId
//loop through through beer to find price put on object
//for each beerId calculate item subTotal
//for earch beerId.subTotal add to order subtotal , and send back subTotal

const subTotalCalculator = (beerArr, beerOrderArr) => {
  let results = {}
  beerOrderArr.forEach(order => {
    results.beerId = order.beerId
  })
  beerOrderArr.forEach(order => {})
  let subTotal = 0
  return subTotal
}
