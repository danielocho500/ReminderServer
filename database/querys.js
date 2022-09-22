const loginQuery = (email, pass) => {
    return `select * from user where email='${email}' AND pass='${pass}'`
}


module.exports = {
    loginQuery
}