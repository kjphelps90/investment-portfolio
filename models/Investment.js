const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Investment extends Model {}

Investment.init(
  {
    //updated column name
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    portfolio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "portfolio",
        key: "id",
      },
    },
    symbol_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tickers",
        key: "id"
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "investment",
  }
);

module.exports = Investment;
