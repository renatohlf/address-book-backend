'use strict';

function verifyToken(req, res, next) {
	var bearerHeader = req.headers.authorization;

	if (typeof bearerHeader !== 'undefined') {

		var bearer = bearerHeader.split(' ');

		var bearerToken = bearer[1];

		req.token = bearerToken;

		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

exports.verifyToken = verifyToken;
//# sourceMappingURL=auth-manager.js.map