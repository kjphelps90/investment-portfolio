const User = require('./User');
const Portfolio = require('./Portfolio');
const Investment = require('./Investment');
const Tickers = require('./Tickers');

User.hasOne(Portfolio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Portfolio.belongsTo(User, {
  foreignKey: 'user_id'
}); 

Portfolio.hasMany(Investment, {
  foreignKey: 'portfolio_id',
  onDelete: 'CASCADE'
});

Tickers.hasMany(Investment, {
  foreignKey: 'symbol_id',
  onDelete: 'CASCADE'
})

Investment.belongsTo(Tickers, {
  foreignKey: 'symbol_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Portfolio, Investment, Tickers };