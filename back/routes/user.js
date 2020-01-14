const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get("/", (req, res) => {
});
router.post("/", async (req, res, next) => { // 회원가입
    try {
        const exUser = await db.User.findOne({
            // 기존에 가입되어 있는지 확인
            where: {
                userId: req.body.userId,
            }
        });
        if( exUser ){
            return res.status(403).send('이미 사용중인 아이디 입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword// req.body.password, //hashedPassword,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    }catch (e) {
        console.error(e);
        // return res.status(403).send(e);
        return next(e);
    }
});
router.get("/:id", (req, res) => {
});
router.post("/logout", (req, res) => {
});
router.post("/login", (req, res) => {
});
router.get("/:id/follow", (req, res) => {
});
router.post("/:id/follow", (req, res) => {
});
router.delete("/:id/follower", (req, res) => {
});
router.get("/:id/posts", (req, res) => {
});

module.exports = router;