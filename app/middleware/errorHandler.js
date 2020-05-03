
module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
        } catch (err) {
            console.log('err============', err);
            ctx.logger.error(err);
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            // ctx.app.emit('error', err, ctx);

            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = ctx.app.config.env === 'prod'
                ? 'Internal Server Error'
                : err.errors || err.message;

            // 从 error 对象上读出各个属性，设置到响应中
            // ctx.body = ctx.helper.httpError(error, 500);
            console.log('common', ctx.app);
            ctx.status = 200;
            ctx.body = {
                code: 10000,
                message: error
            };
        }
    };
};
