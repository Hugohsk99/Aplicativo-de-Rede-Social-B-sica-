const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    content: req.body.content,
    imageUrl: req.file.path
  });
  newPost.save()
    .then(post => res.status(201).json(post))
    .catch(error => res.status(400).json(error));
});

router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json(error));
});

router.patch('/:id/like', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.likes += 1;
      post.save()
        .then(updatedPost => res.json(updatedPost))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
});

module.exports = router;
