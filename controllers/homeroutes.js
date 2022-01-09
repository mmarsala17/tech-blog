const router = require('expresss').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
        where: {user_id: req.session.user_id}
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
    });
});

router.get('/add-post', withAuth, async (req, res) => {
    res.render('add-post', {
        logged_in: req.session.logged_in
    });
});

router.get('/update-post', async (req, res) {
    res.render('update-post', {
        page_title: 'Tech Blog',
        logged_in: req.session.logged_in
    });
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id']
                },
            ],
        }),

        const posts = postData.map((post) => post.get({ plain: true}));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post/id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'date', 'user_id)'],
                    include:
                    {
                        model: User,
                        attributes: ['name']
                    }
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post, 
        logged_in: req.session.logged_in,
        currentUserId: req.session.user_id,
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;
