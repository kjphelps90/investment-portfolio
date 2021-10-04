const router = require("express").Router();
const { Portfolio, User } = require("../models");
const withAuth = require("../utils/auth");
const session = require("express-session");

//Fix the landing page
router.get("/", withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const portfolios = portfolioData.map((portfolio) =>
      portfolio.get({ plain: true })
    );

    res.render("homepage", {
      portfolios,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/portfolio", withAuth, async (req, res) => {
  try {
    res.render("createPortfolio", {
      logged_in: req.session.logged_in
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/portfolio/:id", withAuth, async (req, res) => {
  try {
      const userPortfolio = await Portfolio.findOne({
        where: {
          id: req.params.id,
        },
      });

      //fetch investment for the given portfolio id

      if (!userPortfolio) {
        res.status(404).json({ message: "User Portfolio not found!" });
      }

      const portfolio = userPortfolio.get({ plain: true });
      console.log(portfolio);
      res.render("portfolio", {
        portfolio,
        logged_in: req.session.logged_in,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

//Get user profile and render
router.get("/profile", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id, req.session.logged_in);
    const userProfile = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    if (!userProfile) {
      res.status(404).json({ message: "User Profile not found!" });
    }

    const profile = userProfile.get({ plain: true });
    console.log(profile);
    res.render("profile", {
      profile,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
