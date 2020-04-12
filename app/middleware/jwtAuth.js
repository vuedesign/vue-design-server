
const jwt = require('jsonwebtoken');

module.exports = (options = {}) => {
    return async function jwtAuth(ctx, next) {
        console.log('options', options, ctx.request.url);
        const isIgnore = options.ignores.some(item => ctx.request.url.indexOf(item) > -1);
        if (isIgnore) {
            await next();
        } else {
            console.log('ctx.header', ctx.header);
            const token = ctx.header.authorization; // 获取header里的authorization
            if (token) {
                const authToken = token.substring(7);
                console.log('authToken', authToken);
                try {
                    const decoded = jwt.verify(authToken, options.secret);
                    console.log('decoded', decoded);
                    if (decoded.userId && decoded.username) {
                        const sessionToken = ctx.session.token;
                        console.log('sessionToken', sessionToken);
                        if (authToken === sessionToken) {
                            await next();
                        } else {
                            ctx.body = { code: 10003, msg: '您的账号已在其他地方登录' }
                        }
                    } else {
                        ctx.body = { code: 10002, msg: '登录状态已过期' }
                    }
                } catch (error) {
                    console.log('wujian', error);
                    ctx.body = {
                        code: 10000,
                        message: error
                    };
                }
            } else {
                ctx.body = {
                    code: 10001,
                    message: '请登陆后再进行操作'
                };
            }
        }
    };
};
