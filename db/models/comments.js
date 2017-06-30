const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./users');

const Comment = db.define('Comment', {
  message: {
    type: Sequelize.STRING,
  },
  submitter: {
    type: Sequelize.INTEGER,
  },
  target: {
    type: Sequelize.INTEGER,
  },
});

Comment.belongsTo(User, {
  as: 'sender',
  foreignKey: 'sender_id',
  constraints: false,
});

Comment.belongsTo(User, {
  as: 'receiver',
  foreignKey: 'receiver_id',
  constraints: false
});

User.hasMany(Comment, { foreignKey: 'sender_id', constraints: false });
User.hasMany(Comment, { foreignKey: 'receiver_id', constraints: false });

Comment.sync();

module.exports = Comment;
