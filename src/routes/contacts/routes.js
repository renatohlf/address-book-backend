function contact(app) {
	let controller = app.routes.contacts.controller;

	app.get('/api/contacts', async function (req, res) {
		try {
			let contacts = await controller.getContacts();
			res.status(200).send({ contacts: contacts });
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.post('/api/contacts', function (req, res) { 

	});

	app.put('/api/contacts', function (req, res) {

	});
	
}

module.exports = contact;

