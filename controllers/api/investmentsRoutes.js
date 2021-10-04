const router = require('express').Router();
const {
    Investment,
    Portfolio,
    Tickers
} = require("../../models");

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const investmentData = await Investment.create({
            price: req.body.price,
            quantity: req.body.quantity,
            portfolio_id: req.body.portfolio_id,
            symbol_id: req.body.symbol_id,
            purchase_date: req.body.purchase_date
        });

        res.status(200).json({
            message: "Investment added!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

//get Ticker symbol and name
router.get("/:id", async (req, res) => {
    try {
        const investmentData = await Investment.findByPk(req.params.id, {
            include: [{
                model: Tickers,
                attributes: [
                    "symbol",
                    "name"
                ]
            }]
        });
        if (!investmentData) {
            res.status(400).json({
                message: 'No investment with this id'
            });
            return;
        }
        console.log(investmentData);
        res.status(200).json(investmentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateInvestment = await Investment.update({
            price: req.body.price,
            quantity: req.body.quantity,
            portfolio_id: req.body.portfolio_id,
            symbol_id: req.body.symbol_id,
        }, {
            where: {
                id: req.params.id,
            },
        });

        if (!updateInvestment) {
            res.status(404).json({
                message: "No investment found with that ID"
            });
            return;
        }
        res.status(200).json({
            message: "Investment has been updated"
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const removeInvestment = await Investment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!removeInvestment) {
            res.status(404).json({
                message: "No investment found with that ID"
            });
            return;
        }
        res.status(200).json({
            message: "Investment has been removed"
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;