const express = require("express");
const models = require("../models/models");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Room Route!');
});

router.get('/rooms/', function (req, res) {
    models.Room.findAll()
        .then(rooms => res.send(rooms))
        .catch(err => console.log(err));
});

router.post("/room/", async (req, res) => {
    try {
        const moderator = req.body.moderator;
        const username_new = moderator.username;
        const pwHash_new = moderator.pwHash;
        const moderators = await models.Moderator.findAll({
            where: {username: username_new},
        });
        const existingModerator = moderators[0];
        if (!existingModerator) {
            await models.Moderator.create({
                username: username_new,
                pwHash: pwHash_new
            });
        }
        res.send(moderators);
    } catch (err) {
        //console.log(err);
        console.log(req);
        res.status(304).end();
    }
});

module.exports = router;
