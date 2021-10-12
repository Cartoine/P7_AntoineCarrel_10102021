// Imports

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config-files');
const postCtrl = require('../controllers/posts');

// Routes

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', postCtrl.getOnePost);


module.exports = router;
