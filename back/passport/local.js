const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-locals');
const bcrypt = require('bcrypt');
const db = require('../config');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
    }, async (userId, password, done) => {
        try {
            // 사용자 있는지 검색
            const user = await db.User.findOne({
                where : { userId }
            });
            if( !user ){
                return done(null, false, { reason : '존재 하지 않는 사용자 입니다.' }); // 서버쪽에러, 성공여부, 로직상에러
            }
            // 비밀번호 검색
            const result = await bcrypt.compare(password, user.password); // 비밀번호 비교
            if( result ){
                return done(null, user);
            }
            return done(null, false, { reason : '비밀번호가 틀립니다.' })
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }));
}