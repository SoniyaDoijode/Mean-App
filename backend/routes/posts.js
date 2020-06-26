const express = require('express')
const router = express.Router();
const PostController = require('../controllers/posts')
const chechAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

router.post('',chechAuth,extractFile, PostController.createPost)

router.put('/:id',chechAuth, extractFile, PostController.updatePost)

router.get('',PostController.getPosts)

router.get('/:id', PostController.getPost)

router.delete('/:id',chechAuth, PostController.deletePost)

module.exports = router;
