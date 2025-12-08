const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PostTag = sequelize.define('PostTag', {
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tags',
                key: 'id'
            }
        }
    }, {
        tableName: 'post_tags',
        timestamps: false,
        underscored: true
    });

    return PostTag;
};