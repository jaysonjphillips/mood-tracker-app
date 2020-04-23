module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: DataTypes.STRING, 
        password: DataTypes.STRING, 
        phone: DataTypes.STRING
    });

    User.sync({force: true})
    return User;
}