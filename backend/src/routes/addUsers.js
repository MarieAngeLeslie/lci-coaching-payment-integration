const { User, Student } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/adduser", (req, res) => {
    const { email, firstname, lastname, mobileno, dob, username, password } =
      req.body;
    Student.create({ email, firstname, lastname, mobileno, dob })
      .then((data1) => {
        User.create({
          user_id: data1.id,
          username: username,
          password: password,
        }).then((data2) => {
          const message = `${req.body.email} bien inscrit en tant que user`;
          res.status(200).json({ message, data: data2 });
        });
      })
      .catch((error) => {
        const msg = "l'utilisateur n'a pas pu être ajouté";
        res.status(500).json({ msg, data: error });
      });
  });
};
