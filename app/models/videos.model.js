module.exports = (sequelize, Sequelize) => {
  const Videos = sequelize.define("videos", {
    url: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.BOOLEAN
    },
    type: {
      type: Sequelize.BOOLEAN
    }
  });

  return Videos;
};

