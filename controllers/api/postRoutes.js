const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Post, User } = require('../../models');
 const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) =>{
    try {

        const newPost = await Post.create({
            tirle: req.body.postTitle,
            content: req.body.postContent,
            user_id: req.session.user_id});

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

try{
    const postData = await Post.update({
        title: req.body.postTitle,
        content: req.body.postTitle,
        user_id: req.session.user_id
    }, {
        where: {
            id: req.params.id
        }
    })

    if(!postData) {
        res.status(404).json({ message: "No post found using this id" });
        return;
    }

    res.status(200).json(postData);
}
)}


router.delete('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        }),

        if (!postData) {
            res.status(404).json(postData);
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;