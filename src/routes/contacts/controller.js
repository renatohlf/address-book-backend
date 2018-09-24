function initializer(app) {
	return new Controller(app);
}

function Controller(app) {
	this.Contact = app.connection.models.Contact;
}

Controller.prototype.getContacts = async function () {
	let contacts = [];
	let listContacts = [];

	try {
		contacts = await this.Contact.findAll();

		for (let user of contacts) {
			listContacts.push(user);
		}

	} catch (error) {
		throw error;
	}
	return listContacts;
};

Controller.prototype.updateContact = async function () {

};

Controller.prototype.createContact = async function () {

};

module.exports = initializer;




// Function to validate if fields are empty, return error if assert true
function fieldsValidation(req, callback) {
	req.assert('name', 'Name cannot be empty').notEmpty();
	req.assert('address', 'Address cannot be empty').notEmpty();

	callback(req.validationErrors());

}