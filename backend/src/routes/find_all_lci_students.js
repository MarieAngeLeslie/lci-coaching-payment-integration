const { Student } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/find-all-lci-students", (req, res) => {
    if (req.query.email && req.query.email != "") {
      const mail = req.query.email;
      Student.findOne({
        attributes: ["lastname", "firstname", "mobileno", "email", "dob"],
        where: { email: mail },
      })
        .then((student) => {
          if (student === null) {
            const msg = `Etudiant non trouvé`;
            return res.status(404).json({ msg, data: student });
          }
          const msg = `${student} est un étudiant de lci coaching`;
          return res.json({ msg, data: student });
        })
        .catch((error) => {
          const msg = `Erreur serveur `;
          return res.status(500).json({ msg, data: error });
        });
    } else {
      Student.findAll({
        attributes: ["lastname", "firstname", "mobileno", "email", "dob"],
      })
        .then((pokemons) => {
          const msg = "la liste des étudiants de lci a bien été retrouvé";
          return res.json({ msg, data: pokemons });
        })
        .catch((error) => {
          const msg = `La liste des étudiants n'a pas pu être récupérée `;
          return res.status(500).json({ msg, data: error });
        });
    }
  });
};
