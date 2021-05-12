module.exports = (sequelize, Sequelize) => {
  const Events = sequelize.define("events", {
  
    title: {
      type: Sequelize.STRING
    },
   
  });

  return Events;
};

