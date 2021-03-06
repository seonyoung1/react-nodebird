module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      nickname: {
          type: DataTypes.STRING(20), // 20글자 이하
          allowNull: false, // 필수
      },
      userId: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique:true, // 고유한 값
      },
      password: {
          type: DataTypes.STRING(100),
          allowNull: false,
      }
  }, {
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });
  User.associate = (db) => {
      db.User.hasMany(db.Post, {as: 'Posts'});
      db.User.hasMany(db.Comment);
      db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' }); // 테이블 이름이 같아서 서로 구별 하기 위해 이름을 지어줌
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
  };
  return User;
};