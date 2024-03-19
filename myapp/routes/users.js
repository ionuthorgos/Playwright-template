var express = require('express');
var router = express.Router();
var Ajv = require('ajv');


const jsonData = require('../schema/data.json');
const userSchema = require('../schema/userSchema.json')

const ajv = new Ajv();
const addFormats = require('ajv-formats');
// apply the standard formats to the ajv instance
addFormats(ajv);
const validate = ajv.compile(userSchema);

// Function to generate the next ID based on the current list
function getNextId(users) {
  const highestId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
  return highestId + 1;
}

/* POST users listing. */
router.post('/', function (req, res, next) {
  const userData = req.body;
  const newUser = {
    id: getNextId(jsonData),
    ...userData
  }

  // Validate the new User against schema
  const valid = validate(newUser);
  if (!valid) {
    // If the data is invalid, send a 400 error with validation information
    return res.status(400).json(validate.errors);
  }
  newUser.id = getNextId(jsonData) // assign a new id
  jsonData.push(newUser);
  res.status(201).send(newUser)
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(jsonData);
});

module.exports = router;
