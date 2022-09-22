const {Router} = require('express')
const { authLogin } = require('../controllers/auth')

const router = Router()
router.post('/', authLogin)

module.exports = router