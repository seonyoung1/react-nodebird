const passport = require('passport');
const db = require('../config');
const local = require('local');

module.exports = () => {
    passport.serializeUser((user, done) => { // 서버쪽에 [{id: 3, cookie: 'asdfg'}] 를 저장, 가벼운 객체로 저장하여 서버쪽 부담을 최소화한다.
        return done(null, user.id);
    });
    passport.deserializeUser(async(id, done) => { // 가져온 id 로 유저정보를 db로 불러온다.
        try {
            const user = await db.User.findOne({
                where: { id }
            });
            return done(null, user); //req.user
        }catch (e) {
            console.error(e);
            return done(e);
        }
    });

    local();
}

// 프론트에서 서버로는 cookie만 보내요(asdfgh)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 3 발견
// id: 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱