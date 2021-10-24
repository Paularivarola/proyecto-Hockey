const path = require("path")
const Form = require("../models/Form")
const pagesController = {
	home: (req, res) => {
		try {
			res.render("index", {
				title: "Home",
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		} catch (error) {
			console.log(error)
		}
	},

	about: async (req, res) => {
		try {
			const info = await Form.find()
			return res.render("about", {
				title: "About",
				info,
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		} catch (error) {
			console.log(error)
		}
	},

	game: (req, res) => {
		if (req.session.loggedIn) {
		return	res.render("game_info", {
				title: "Game",
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		}
		 res.redirect("/no-autorizado")
	},

	contact: (req, res) => {
		try {
			res.render("contact", {
				title: "Contact",
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		} catch (error) {
			console.log(error)
		}
	},

	rules: (req, res) => {
		if (req.session.loggedIn) {
		return res.render("rules", {
				title: "Rules",
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		}
		res.redirect("/no-autorizado")
	},

	page404: (req, res) => {
		try {
			res.render("page404", {
				title: "page 404"
			})
		} catch (error) {
			console.log(error)
		}
	},

	noAutorizado: (req, res) => {
		try {
			res.render("noAutorizado", {
				title: "no Autorizado",
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				url: req.session.url
			})
		} catch (error) {
			console.log(error)
		}
	},

	form: async (req, res) => {
		const { title, text } = req.body
		try {
			let formulario = new Form({
				title,
				text
			})
			let information = await formulario.save()
			const info = await Form.find()
			console.log(info)
			console.log(information)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = pagesController
