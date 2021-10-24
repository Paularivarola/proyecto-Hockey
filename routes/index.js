const express = require('express')
const pagesController = require('../controllers/pagesController')
const userController = require('../controllers/userController')
const validator = require("../controllers/validator")
const router = express.Router()

router.route('/')
.get(pagesController.home)

router.route('/about')
.get(pagesController.about)

router.route('/game')
.get(pagesController.game)

router.route('/contact')
.get(pagesController.contact)

router.route('/rules')
.get(pagesController.rules)

router.route('/signin')
.get(userController.signin)
.post(userController.logUser)

router.route('/signup')
.get(userController.signup)
.post(validator,userController.newUser)

router.route("/signout")
.get(userController.signOut)

router.route("/page404")
.get(pagesController.page404)

router.route("/no-autorizado")
.get(pagesController.noAutorizado)

router.route("/form")
.post(pagesController.form)

module.exports = router