const express = require('express');
const db = require('../models');
const router = express.Router();

// 게시글 가져오기
router.get("/", async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }],
            order: [['createdAt', 'DESC']] //DESC 는 내림차순, ASC 는 오름차순
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;