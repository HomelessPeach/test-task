const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authors', {
    author_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    author_surname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    author_patronymic: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    author_date_of_birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    author_points: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    author_rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'authors',
    schema: 'test_task_1',
    timestamps: false,
    indexes: [
      {
        name: "authors_pkey",
        unique: true,
        fields: [
          { name: "author_id" },
        ]
      },
    ]
  });
};
