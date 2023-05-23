const router = require('express').Router();
const Profile = require('../model/Profile');

router.post('/profile', async (req, res) => {
    const profile = new Profile({
        userId: req.body.userId,
        companyName: req.body.companyName,
        workExperience: req.body.workExperience,
        phone: req.body.phone,
        facebookLink: req.body.facebookLink,
        linkedinLink: req.body.linkedinLink,
        githubLink: req.body.githubLink,
        googleLink: req.body.googleLink
    });
    try {
        const savedProfile = await profile.save();
        res.send(savedProfile);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/profile', async function (req, res, next) {
    const { userId } = req.params;

    if (!userId) {
        res.json({
            status: false,
            error: 'invalid_request',
            message: '\'userId\' field is required.'
        });
    }

    const profile = await Profile.find({ userId });

    if (!profile) {
        res.json({
            status: false,
            error: 'not_found',
            message: 'Profile for user with given ID does not exist.'
        });
    }

    res.json({
        status: true,
        profile
    });
});


module.exports = router;
