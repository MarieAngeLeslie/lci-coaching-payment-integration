const { CoachingPayment } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/coachingpayment/", (req, res) => {
    CoachingPayment.create(req.body)
      .then((payment) => {
        const message = `${req.body.email} a pris un nouvel abonnement`;
        res.json({ message, data: payment });
      })
      .catch((error) => {
        const msg = "l'élément n'a pas été ajouté";
        res.status(500).json({});
      });
  });
};
