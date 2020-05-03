const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

// 로그인 되어 있을 경우 정보 가져오기
router.get('/', (req, res) => { // /api/user/
    if (!req.user) {
        return res.status(401).send('로그인이 필요합니다.');
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(req.user);
});
// 회원가입
router.post("/", async (req, res, next) => {
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

// 로그아웃
router.post("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    req.send('logout 성공');
});

// 로그인
router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // 서버 에러, 성공 여부, 로직상 에러
        // console.log(err, user, info)
        if( err ){
            console.error(e);
            next(err);
        }
        if( info ){
            // console.log(info.reason)
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if( loginErr ){
                return next(loginErr);
            }
            const fullUser = await db.User.findOne({
                where: { id: user.id },
                include: [{
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id'], // id 정보만 보낸다
                }, {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
                attributes: ['id', 'nickname', 'userId'],
            });
            console.log(fullUser);
            return res.json(fullUser);
            // console.log('login', user);
            // const filteredUser = Object.assign({}, user.toJSON());
            // delete filteredUser.password;
            // return res.json(user); // 성공하면 프론트로 사용자 정보를 보내줌, pw 는 위험하니까 빼고 보낸다
        });
    })(req, res, next);
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