// Import

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/me/', multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.delete);
router.get('/me/', auth, userCtrl.getOneUser);


module.exports = router;
