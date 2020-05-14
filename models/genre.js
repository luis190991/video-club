
module.exports = (sequelize, type) => {
  const Genre = sequelize.define('genres', {
    id:{type: type.INTEGER, primaryKey:true, autoIncrement:true},
    description:{type: type.STRING, notNull:true},
    status: type.BOOLEAN
  });

  return Genre;
};
