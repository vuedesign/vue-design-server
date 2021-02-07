import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const message = exception.message;
    Logger.log(message, '错误提示');
    const errorResponse = {
        data: {
            ...exception,
            url: req.originalUrl
        },
        message: '请求失败',
        retcode: 1
    };
    const status = exception instanceof HttpException
        ? 200
        : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(status);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(errorResponse);
  }
};
