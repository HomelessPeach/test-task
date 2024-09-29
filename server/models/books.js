const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    book_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    book_release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    book_mark: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    book_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fk_author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'authors',
        key: 'author_id'
      }
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'test_task_1',
    timestamps: false,
    indexes: [
      {
        name: "books_pkey",
        unique: true,
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
};
