function user(app) {

	const User = app.connection.models.User;
	console.log(User);

	app.get('/api/users', getUsers);

	app.post('/api/users', createUser);
  
	app.put('/api/users', updateUser);

}

function updateUser(req, res) {

}

function getUsers(req, res) {
  console.log("Aqui");

}

function createUser(req, res) {


}


export default user;

