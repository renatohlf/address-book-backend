function contact(app) {

	app.get('/api/contacts', getContacts )

	app.post('/api/contacts', createContact);

	app.put('/api/contacts', updateContact);
	
}

function getContacts(req, res) {

}

function createContact(req, res) {

}

function updateContact(req, res) {

}

export default contact;

