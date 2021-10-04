const router = require('express').Router();
require('dotenv').config();
const fetchP = import("node-fetch").then((mod) => mod.default);
const fetch = (...args) => fetchP.then((fn) => fn(...args));

// endpoint: /api/marketdata
// router.get("/", (req, res) => {
//     const apiKey = process.env.MW_API_KEY;
//     const url = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=DJI.INDX`
//     console.log(apiKey);
//     res.status(200).json(url);
//     return;
// })


router.get("/", async (req, res) => {
    try {
        const apiKey = process.env.MW_API_KEY;
        const url = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=DJI.INDX`
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
  


module.exports = router;
