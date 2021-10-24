const path = require("path")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const userController = {
	signin: (req, res) => {
		try {
			res.render("signin", {
				title: "Sign In",
				error: null,
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		} catch (error) {
			console.log(error)
		}
	},

	signup: (req, res) => {
		try {
			res.render("signup", {
				title: "Sign Up",
				error: null,
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		} catch (error) {
			console.log(error)
		}
	},

	newUser: async (req, res) => {
		const { name, lastname, email, password, url } = req.body
		let passwordHash = bcryptjs.hashSync(password)
		let user = new User({
			name,
			lastname,
			email,
			password: passwordHash,
			url
		})
		try {
			let userExist = await User.findOne({ email })
			 if (!userExist) {
				let newUser = await user.save()
				req.session.loggedIn = true
				req.session.name = newUser.name
				req.session.userId = newUser._id
				req.session.url = newUser.url
				return res.redirect("/")
			} else {
				console.log(error)
				res.render("signup", {
					title: "Sign Up",
					error: "email in use",
					loggedIn: req.session.loggedIn,
					userId: req.session.userId,
					name: req.session.name,
					url: req.session.url
				})
			}
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	logUser: async (req, res) => {
		const { email, password } = req.body
		try {
			let user = await User.findOne({ email })
			if (bcryptjs.compareSync(password, user.password)) {
				req.session.loggedIn = true
				req.session.name = user.name
				req.session.userId = user._id
				req.session.url = user.url
				return res.redirect("/")
			} else {
				res.render("signin", {
					title: "Sign In",
					error: "email or password incorrect",
					loggedIn: req.session.loggedIn,
					name: req.session.name,
					userId: req.session.userId,
					url: req.session.url
				})
			}
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	signOut: (req, res) => {
		try {
			req.session.destroy(() => {
				res.redirect("/")
			})
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	}
}

module.exports = userController
