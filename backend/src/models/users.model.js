const mysql = require('./db');

const Users = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || "user";
}

// find users by email 
Users.findByEmail = (email, result) => {
    mysql.query(`SELECT * FROM users WHERE email = ? `, [email], (error, response) => {
        if(error) {
            return result(error);
        }

        result(null, response);
    })
}

// add new users.
Users.addNewUser = ( user, result ) => {
    mysql.query('INSERT INTO users (name, email, role, password) VALUES (?,?,?,?)',[user.name, user.email, user.role, user.password], (error, response) => {
        if ( error ) {
            return result(error);
        }
        result(null, response);
    })
}

module.exports = Users;