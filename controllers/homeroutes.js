const router = require('expresss').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

module.exports = router;
