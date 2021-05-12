module.exports = (sequelize, Sequelize) => {
  const Reqevents = sequelize.define("reqevents", {
  
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    eventname: {
      type: Sequelize.STRING
    },
    date : {
      type: Sequelize.DATE
    },
     
    city: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
     
   
  });

  return Reqevents;
};

