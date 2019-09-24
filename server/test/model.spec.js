// const db = require('../db/db');
// const { Beer, Order, BeerOrder } = require('../db/models');
// const { expect } = require('chai');
// const seed = require('../../seed');

// describe('Sequelize Model', () => {
// 	// clear database before the 'describe' block
// 	before(() => db.sync({ force: true }));
// 	// clear the database after each 'it' block
// 	afterEach(() => db.sync({ force: true }));

// 	it('calculates the subTotal for an order correctly', async () => {
// 		try {
// 			const order = await Order.findOrCreate({
// 				where: {
// 					status: 'open'
// 				}
// 			});
// 			const beer = await Beer.findOrCreate({
// 				where: {
// 					name: 'Susan',
// 					color: 'light',
// 					price: 1099
// 				}
// 			});
// 			await BeerOrder.findOrCreate({
// 				where: {
// 					orderId: order.id,
// 					beerId: beer.id
// 				},
// 				defaults: {
// 					quantity: 1,
// 					itemPrice: beer.price
// 				}
// 			});
// 			const subTotal = await order.subTotal();
// 			expect(subTotal).to.be.a('number');
// 			expect(subTotal).to.equal(1099);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	});
// });
