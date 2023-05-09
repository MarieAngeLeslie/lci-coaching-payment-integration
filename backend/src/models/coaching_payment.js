module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Coaching_Payment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    montant_paye: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_abonnement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_abonnement: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duree: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
