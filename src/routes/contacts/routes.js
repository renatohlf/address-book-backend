function contact(app) {
	const controller = app.routes.contacts.controller;

	app.get('/api/contacts', async function (req, res) {
		try {
			const contacts = await controller.getContacts();
			res.status(200).send({ contacts: contacts });
		} catch (err) {
			res.status(400).send(err.message);
		}
	});

	app.post('/api/contacts', async function (req, res) { 
		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const email = req.body.email;
		const phone = req.body.phone;

		try {
			const result = await controller.createContact(first_name, last_name, email, phone);
			let created = result[1];
			if (created) {
				res.status(200).send('Contact created');
			} else {
				res.status(400).send('Contact already exists');
			}
		} catch (err) {
			res.status(400).send(err.message);
		}
	});

	app.put('/api/contacts/:contactId', async function (req, res) {
		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const email = req.body.email;
		const phone = req.body.phone;
		const id = req.params.contactId;
		
		try {
			const result = await controller.updateContact(id, first_name, last_name, email, phone);
			if (result) {
				res.status(200).send('Contact updated');
			} else {
				res.status(400).send('Contact can not be updated');
			}
		} catch(err) {
			res.status(400).send(err.message);
		}

	});

	app.delete('/api/contacts/:contactId', async function (req,res) {
		const id = req.params.contactId;
		try {
			//TODO: Find contact first, after try to delete.
			const result = await controller.deleteContact(id);
			if(result) {
				res.status(200).send('Contact deleted');
			} else {
				res.status(400).send('No contact deleted');
			}
		} catch(err) {
			res.status(400).send(err.message);
		}
	});
	
}

module.exports = contact;

