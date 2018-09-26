function initializer(app) {
	return new Controller(app);
}

class Controller {
	constructor(app) {
		this.Contact = app.connection.models.Contact;
	}
	async getContacts() {
		let contacts = [];
		let listContacts = [];
		try {
			contacts = await this.Contact.findAll();
			for (let user of contacts) {
				listContacts.push(user);
			}
		}
		catch (error) {
			throw error;
		}
		return listContacts;
	}
	async updateContact(id, first_name, last_name, email, phone) {
		try {
			return this.Contact.update({
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone: phone
			}, {
				where: {
					id: id
				}
			}).then(function (result) {
				if (result[0] > 0) {
					return true;
				}
				else {
					return false;
				}
			});
		}
		catch (err) {
			throw err;
		}
	}
	async createContact(first_name, last_name, email, phone) {
		try {
			//TODO: Change 'where' condition
			return this.Contact.findOrCreate({ where: { phone: phone }, defaults: { first_name: first_name, last_name: last_name, email: email, phone: phone } });
		}
		catch (err) {
			throw err;
		}
	}
	async deleteContact(id) {
		try {
			return this.Contact.destroy({
				where: {
					id: id
				}
			}).then((result) => {
				if (result > 0) {
					return true;
				}
				else {
					return false;
				}
			});
		}
		catch (err) {
			throw err;
		}
	}
}





module.exports = initializer;
