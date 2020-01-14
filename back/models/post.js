module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT, // 매우 긴 글
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // user 를 참조함 belongsTo
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 서로 참조하면 이름이 헷갈리기 때문에 as 를 사용함
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // 다대다 관계 belongsToMany
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    };
    return Post;
};