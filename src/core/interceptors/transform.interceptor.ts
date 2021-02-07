import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
    retcode: number;
    message: string;
};

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    return next.handle().pipe(
        map((data) => {
            const res: Response<T> = {
                data,
                retcode: 0,
                message: '请求成功'
            }
            return res;
        })
    );
  }
}
