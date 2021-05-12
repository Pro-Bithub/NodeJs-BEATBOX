module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    email: {
      type: Sequelize.STRING,
      unique:true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    createdAt:{
      type:'TIMESTAMP',
      defaultValue:Sequelize.STRING,
      field:'created_at'}
      
  });

  return Users;
};

