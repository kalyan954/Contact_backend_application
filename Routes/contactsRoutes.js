const express = require('express');
const router = express.Router();
const { getContacts,getContactsById, createContact, updateContactById, deleteContactById } = require('../Controllers/routeControllers');
const validateToken = require('../middleware/accessTokenHandler');

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContactsById).put(updateContactById).delete(deleteContactById);

module.exports = router;
