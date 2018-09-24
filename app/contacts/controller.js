


// Function to validate if fields are empty, return error if assert true
function fieldsValidation(req, callback) {
    req.assert('name', 'Name cannot be empty').notEmpty();
    req.assert('address', 'Address cannot be empty').notEmpty();

    callback(req.validationErrors());

}