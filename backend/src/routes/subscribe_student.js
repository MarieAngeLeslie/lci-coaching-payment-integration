const { CoachingPayment } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/subscribe_student", (req, res) => {
    if (req.query.email && req.query.email != "") {
      const mail = req.query.email;
      CoachingPayment.findOne({
        attributes: ["email", "montant_paye", "type_abonnement", "duree"],
        where: { email: mail },
      })
        .then((student) => {
          if (student === null) {
            const msg = `Etudiant non trouvé`;
            return res.status(404).json({ msg, data: student });
          }
          const msg = `${student} est un étudiant de lci coaching ayant déjà pris un abonnement`;
          return res.json({ msg, data: student });
        })
        .catch((error) => {
          const msg = `Erreur serveur `;
          return res.status(500).json({ msg, data: error });
        });
    }
  });
};
