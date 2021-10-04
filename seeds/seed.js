const sequelize = require('../config/connection');
const { User, Portfolio, Investment, Tickers } = require('../models');

const userData = require('./userData.json');
const portfolioData = require('./portfolioData.json');
const investmentData = require('./investmentData.json');
const tickerData = require('./tickerData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const tickers = await Tickers.bulkCreate(tickerData, {
      individualHooks: false,
      returning: true,
    });

    const portfolios = await Portfolio.bulkCreate(portfolioData, {
        individualHooks: false,
        returning: true,
      });

    const investments = await Investment.bulkCreate(investmentData, {
        individualHooks: false,
        returning: true,
      });



      process.exit(0);
}

seedDatabase();
