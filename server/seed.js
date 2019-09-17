const beers = [
  {
    name: 'Bad Mama Yama',
    type: 'ale',
    ibu: 25,
    color: 'red',
    description: 'Sweet potato ale. Comparable to pumpkin spice ales.',
    imageUrl: './bad-mama-yama',
    quantityInv: 20,
    price: 12.99
  },
  {
    name: 'Dark Paradise',
    type: 'stout',
    ibu: 8,
    color: 'dark',
    description:
      'Stout with coconut added in secondary. Chocolatey, roasty, coconutty, delicious.',
    imageUrl: './bad-mama-yama',
    quantityInv: 20,
    price: 12.99
  },
  {
    name: 'Bad Mama Yama',
    type: 'ale',
    ibu: 25,
    color: 'red',
    description: 'Sweet potato ale. Comparable to pumpkin spice ales.',
    imageUrl: './bad-mama-yama',
    quantityInv: 20,
    price: 12.99
  },
  {
    name: 'Bad Mama Yama',
    type: 'ale',
    ibu: 25,
    color: 'red',
    description: 'Sweet potato ale. Comparable to pumpkin spice ales.',
    imageUrl: './bad-mama-yama',
    quantityInv: 20,
    price: 12.99
  },
  {
    name: 'Bad Mama Yama',
    type: 'ale',
    ibu: 25,
    color: 'red',
    description: 'Sweet potato ale. Comparable to pumpkin spice ales.',
    imageUrl: './bad-mama-yama',
    quantityInv: 20,
    price: 12.99
  }
]

// from robots and projects seed
const seed = async () => {
  try {
    await db.sync({force: true})
    const [
      robotOne,
      robotTwo,
      robotThree,
      robotFour,
      robotFive,
      robotSix
    ] = await Robot.bulkCreate(seedRobots, {returning: true})
    const [
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive
    ] = await Project.bulkCreate(seedProjects, {returning: true})
    await projectFive.addRobot(robotThree)
    await projectThree.addRobot(robotThree)
    await projectTwo.addRobot(robotThree)
    await projectFour.addRobot(robotOne)
    await projectFour.addRobot(robotTwo)
    await projectThree.addRobot(robotFive)
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
