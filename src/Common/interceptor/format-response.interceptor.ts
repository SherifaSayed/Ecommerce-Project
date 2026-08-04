import { Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

interface IResponse {
  message?: string;
  data?: any;
  meta?: any;
}

@Injectable()
export class UnifiedResponseInterceptor implements NestInterceptor {

  intercept(context: any, next: any) {
    return next.handle().pipe(
      map((data: IResponse) => ({
        success: true,
        message: data.message || 'success',
        data: data.data || data,
        meta: data.meta || {}
      }))
    );
  }

}