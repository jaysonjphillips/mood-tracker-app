const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: DataTypes.STRING, 
        password: DataTypes.STRING, 
        phone: DataTypes.STRING
    })

    // hooks
    User.beforeSave( user => {
        user.password = bcrypt.hashSync(user.password, 10)
    })

    User.checkPassword = (passwordEntry, hashedPassword) => {
        // compare hashed password
        return bcrypt.compareSync(passwordEntry, hashedPassword) 
    }

    return User;
}