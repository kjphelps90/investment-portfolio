const router = require("express").Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Tickers } = require("../../models");

router.get("/", async (req, res) => {
  try {
    console.log(req.query.symbol);
    const tickers = await Tickers.findAll({
      where: {
        symbol: {
          [Op.like]: `${req.query.symbol}%`,
        },
      },
    });
    console.log(tickers);
    if (tickers) {
      res.status(200).json(tickers);
    } else {
        res.status(404).json({ message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
