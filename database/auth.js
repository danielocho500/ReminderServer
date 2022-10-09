const mysql = require('mysql')
const {connectionData} = require('./connection')
const {loginQuery} = require('./querys')

const loginAuth = (email, pass) => {
    return new Promise((resolve, reject) => {
        
        if(email == "daniel@perrito.com" && pass== "12345"){
            resolve(true)
        }
        else{
            resolve(false);
        }


        //const connection = mysql.createConnection(connectionData)

        //connection.connect();
        
        // connection.query(loginQuery(email, pass), (err, rows) => {
    
        //     if(err)
        //         reject(err)

        //     if (rows.length > 0){
        //         connection.end()
        //         resolve(true)
        //     }
        //     else{
        //         connection.end()
        //         resolve(false)
        //     }
        // })
    })      
}

module.exports = {
    loginAuth
}