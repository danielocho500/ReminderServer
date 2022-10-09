const loginQuery = (email, pass) => `select * from Users where Email='${email}' AND Password='${pass}'`;

module.exports = {
    loginQuery,
};
