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

Controller.prototype.updateContact = async function (id, first_name, last_name, email, phone) {
	try {
		return await this.Contact.update(
			{
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone: phone
			},
			{ 
				where: { 
					id: id 
				}
			}).then(function(result){
			if(result[0] > 0){
				return true;
			}else{
				return false;
			}
		});
	} catch (err) {
		throw err;
	}

};

Controller.prototype.createContact = async function (first_name, last_name, email, phone) {
	try {
		//TODO: Change 'where' condition
		return await this.Contact.findOrCreate({ where: { phone: phone }, defaults: { first_name: first_name, last_name: last_name, email: email, phone: phone } });
	} catch (err) {
		throw err;
	}
};

Controller.prototype.deleteContact = async function (id) {
	try {
		return await this.Contact.destroy({ 
			where: { 
				id: id
			}
		}).then((result) => {
			if (result > 0) {
				return true;
			} else {
				return false;
			}
		});
	} catch (err) {
		throw err;
	}
};

module.exports = initializer;




// Function to validate if fields are empty, return error if assert true
function fieldsValidation(req, callback) {
	req.assert('name', 'Name cannot be empty').notEmpty();
	req.assert('address', 'Address cannot be empty').notEmpty();

	callback(req.validationErrors());

}