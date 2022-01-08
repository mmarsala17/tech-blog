const router = require('express').Router();
const req = require('express/lib/request');
const { Post, User, Comment } =require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', res) => {

    try {

        const newComment = await Comment.create({...req,body,
            user_id: req.session.user_id
            });

            res.status(200).json(newComment);

        } catch (err) {
            res.status(400).json(err);
        }
        });
