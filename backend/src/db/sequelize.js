const { Sequelize, DataTypes } = require("sequelize");
const CoachingPaymentModel = require("../models/coaching_payment");
const StudentModel = require("../models/students");

const sequelize = new Sequelize("c1956362c_ssdb", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: "8889",
});

sequelize
  .authenticate()
  .then((_) => console.log("Connection has been established successfully."))
  .catch((error) =>
    console.log(`Unable to connect to the database : ${error}`)
  );

const CoachingPayment = CoachingPaymentModel(sequelize, DataTypes);
const Student = StudentModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize
    .sync()
    .then((_) => console.log("la base de données a bien été synchronisé"));
};

module.exports = {
  initDb,
  CoachingPayment,
  Student,
};
