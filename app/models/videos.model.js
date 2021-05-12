module.exports = (sequelize, Sequelize) => {
  const Videos = sequelize.define("videos", {
    url: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  });

  return Videos;
};

