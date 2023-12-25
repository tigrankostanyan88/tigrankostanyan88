const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = (con, DataTypes) => {
    const User = con.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Email is incorrect!'
                }
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        passwordChangedAt: DataTypes.DATE,
        passwordResetToken: DataTypes.STRING,
        passwordResetExpires: DataTypes.DATE,
        date: {
            type: DataTypes.DATE,
            defaultValue: con.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user'
        }
    }, {
        indexes: [{ unique: true, fields: ['email'] }],
        hooks: {
            beforeCreate: async (user, options) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            },
            beforeUpdate: async (user, options) => {
                if (user.changed('password')) {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                    user.passwordChangedAt = Date.now() - 1000;

                    // Reset token
                    if (user.passwordResetToken) {
                        user.passwordResetToken = null;
                        user.passwordResetExpires = null;
                    }
                }
            },
            beforeFind: async (query) => {
                if (query) {
                    if (query.where === undefined) {
                        query.where = {}
                    }
                    // if not defined
                    if (query.where.deleted === undefined) {
                        // only not deleted users
                        query.where.deleted = false;
                    }
                }
            },
        }
    });
    return User;
}