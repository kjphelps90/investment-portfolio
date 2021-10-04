const router = require("express").Router();
const fetchP = import("node-fetch").then((mod) => mod.default);
const fetch = (...args) => fetchP.then((fn) => fn(...args));

// Gets Last Closed Price
router.get("/:ticker", async (req, res) => {
  try {
    const url = `https://api.polygon.io/v2/aggs/ticker/${req.params.ticker}/prev?adjusted=true&apiKey=${process.env.API_KEY}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});


//get Closing market values as per Purchase date of stock
router.get("/:ticker/:purchasedate", async (req, res) => {
  try {
    const url = `https://api.polygon.io/v1/open-close/${req.params.ticker}/${req.params.purchasedate}?adjusted=true&apiKey=${process.env.API_KEY}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// TODO: add routes for range search

module.exports = router;
