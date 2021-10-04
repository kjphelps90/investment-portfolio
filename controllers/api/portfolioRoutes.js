const router = require('express').Router();
const { Portfolio, User, Investment, Tickers } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const portfolioData = await Portfolio.create({
            portfolio_name: req.body.portfolioName,
            //look into sending user ID from sessions
            user_id: req.session.user_id
        });

        res.status(201).json(portfolioData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get("/:id", async (req, res) => {
    try {
        const portfolioData = await Portfolio.findByPk(req.params.id, {
            include: [{
                model: Investment,
                attributes: [
                    'id',
                    'price',
                    'quantity',
                    'portfolio_id',
                    'symbol_id'
                ],
                include : [{
                model: Tickers,
                attributes: [
                        'symbol',
                        'name'
                    ],
                }]
            }],
        });
        if (!portfolioData) {
            res.status(400).json({ message: 'No portfolio with this id' });
            return;
        }
        console.log(portfolioData);
        res.status(200).json(portfolioData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const portfolioData = await Portfolio.update(
      {
        portfolio_name: req.body.portfolio_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  
    return res.json(portfolioData);
  });

router.delete("/:id", async (req, res) => {
    try {
    const removePortfolio = await Portfolio.destroy({
        where: {
            id: req.params.id
        }
    });

    if (!removePortfolio) {
        res.status(404).json({ message: 'No portfolio found with this id!' });
        return;
      }
    res.status(200).json({
        message: "Portfolio deleted!"
    })

}
catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;